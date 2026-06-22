import { quoteLastPrice } from "@/lib/market-data/india";
import { getQuotesForSymbols } from "@/lib/market-data/service";
import type { QuoteDTO } from "@/lib/market-data/types";
import type { PortfolioEntity } from "./portfolio-schema";

export type StrategySignal = "hold" | "buy_more" | "reduce" | "rebalance";

function strategyFromPnl(unrealizedPct: number): StrategySignal {
  if (unrealizedPct > 28) return "reduce";
  if (unrealizedPct < -22) return "buy_more";
  if (unrealizedPct < -10) return "rebalance";
  return "hold";
}

/** Cost basis per share for a symbol: prefer the current stored position, else
 *  derive a weighted average from this book's buy transactions. */
function avgCostForSymbol(portfolio: PortfolioEntity, symbol: string): number {
  const pos = portfolio.positions.find((p) => p.symbol === symbol);
  if (pos) return pos.avgCost;
  let qty = 0;
  let cost = 0;
  for (const t of portfolio.transactions ?? []) {
    if (t.side !== "buy" || t.symbol !== symbol) continue;
    const amount = t.amount ?? (t.qty != null && t.price != null ? t.qty * t.price : 0);
    qty += t.qty ?? 0;
    cost += amount;
  }
  return qty > 0 ? cost / qty : 0;
}

/** True realized P&L from the ledger: gains booked on sells (sell price − avg
 *  cost) plus dividends received. */
function realizedFromTx(portfolio: PortfolioEntity): number {
  let realized = 0;
  for (const t of portfolio.transactions ?? []) {
    if (t.side === "dividend") {
      realized += t.amount ?? 0;
    } else if (t.side === "sell" && t.qty != null) {
      const proceeds =
        t.price != null ? t.price * t.qty : t.amount ?? 0;
      realized += proceeds - avgCostForSymbol(portfolio, t.symbol) * t.qty;
    }
  }
  return realized;
}

/**
 * Cash and realized P&L for a book.
 *
 * Cash inventory is the capital not currently deployed into holdings:
 *   cash = initialCapital − (cost basis of current holdings) + realized gains.
 * This stays correct whether holdings were built via buy transactions or added
 * directly to the book, because current positions are the source of truth.
 */
export function computePortfolioCashRealized(portfolio: PortfolioEntity): {
  cash: number;
  realized: number;
  totalCost: number;
  initialCapital: number;
} {
  const realized = realizedFromTx(portfolio);
  const totalCost = portfolio.positions.reduce((s, p) => s + p.avgCost * p.qty, 0);
  const initialCapital = portfolio.initialCapital ?? 0;
  return { cash: initialCapital - totalCost + realized, realized, totalCost, initialCapital };
}

export type EnrichedRow = PortfolioEntity["positions"][number] & {
  last: number | null;
  marketValue: number;
  cost: number;
  unrealized: number;
  unrealizedPct: number;
  allocationPct: number;
  strategy: StrategySignal;
  quote: QuoteDTO | null;
};

export async function enrichPortfolioEntity(portfolio: PortfolioEntity) {
  const syms = portfolio.positions.map((p) => p.symbol);
  const quotes = await getQuotesForSymbols(syms);
  const { cash, realized } = computePortfolioCashRealized(portfolio);

  const base = portfolio.positions.map((pos) => {
    const q = quotes[pos.symbol] ?? null;
    const last = quoteLastPrice(q);
    const marketValue = last != null ? last * pos.qty : 0;
    const cost = pos.avgCost * pos.qty;
    const unrealized = last != null ? marketValue - cost : 0;
    const unrealizedPct = cost > 0 && last != null ? (unrealized / cost) * 100 : 0;
    return {
      ...pos,
      last,
      marketValue,
      cost,
      unrealized,
      unrealizedPct,
      allocationPct: 0,
      strategy: strategyFromPnl(unrealizedPct),
      quote: q,
    };
  });

  const totalMv = base.reduce((s, r) => s + r.marketValue, 0);
  const rows: EnrichedRow[] = base.map((r) => ({
    ...r,
    allocationPct: totalMv > 0 ? (r.marketValue / totalMv) * 100 : 0,
  }));

  return { ...portfolio, rows, realizedPnl: realized, cash };
}
