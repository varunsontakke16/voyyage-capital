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

function realizedFromTx(portfolio: PortfolioEntity): number {
  const txs = portfolio.transactions ?? [];
  let realized = 0;
  for (const t of txs) {
    if (t.side === "dividend" && typeof t.amount === "number") realized += t.amount;
    if (t.side === "sell" && typeof t.amount === "number") realized += t.amount;
    if (t.side === "buy" && typeof t.amount === "number") realized -= t.amount;
  }
  return realized;
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
  const realized = realizedFromTx(portfolio);

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

  return { ...portfolio, rows, realizedPnlFromLedger: realized };
}
