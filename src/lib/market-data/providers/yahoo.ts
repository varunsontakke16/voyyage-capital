import YahooFinance from "yahoo-finance2";
import type { CandleDTO, ChartRange, QuoteDTO } from "../types";
import { symbolForYahoo } from "../india";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

type YahooQuoteRow = {
  symbol?: string;
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketPreviousClose?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketOpen?: number;
  regularMarketTime?: Date;
  currency?: string;
};

function rowToQuote(originalSymbol: string, row: YahooQuoteRow): QuoteDTO | null {
  const price = row.regularMarketPrice;
  if (price == null || !Number.isFinite(price) || price <= 0) return null;
  const prevClose = row.regularMarketPreviousClose;
  return {
    symbol: originalSymbol,
    price,
    change: row.regularMarketChange ?? 0,
    changePercent: row.regularMarketChangePercent ?? 0,
    prevClose: prevClose != null && prevClose > 0 ? prevClose : undefined,
    high: row.regularMarketDayHigh,
    low: row.regularMarketDayLow,
    open: row.regularMarketOpen,
    currency: row.currency ?? "INR",
    timestamp: row.regularMarketTime ? row.regularMarketTime.getTime() : Date.now(),
    source: "yahoo",
  };
}

/** One HTTP round-trip for many NSE/BSE symbols (Yahoo Finance). */
export async function yahooQuotesBatch(symbols: string[]): Promise<Record<string, QuoteDTO | null>> {
  const out: Record<string, QuoteDTO | null> = {};
  const unique = [...new Set(symbols.map((s) => s.trim()).filter(Boolean))];
  for (const s of unique) out[s] = null;
  if (unique.length === 0) return out;

  const yahooToOriginal = new Map<string, string>();
  const yahooSymbols: string[] = [];
  for (const orig of unique) {
    const y = symbolForYahoo(orig);
    yahooToOriginal.set(y, orig);
    if (!yahooSymbols.includes(y)) yahooSymbols.push(y);
  }

  try {
    const raw = await yahooFinance.quote(yahooSymbols);
    const rows: YahooQuoteRow[] = Array.isArray(raw) ? raw : raw ? [raw as YahooQuoteRow] : [];
    for (const row of rows) {
      if (!row?.symbol) continue;
      const orig =
        yahooToOriginal.get(row.symbol) ??
        [...yahooToOriginal.entries()].find(([y]) => y.toUpperCase() === row.symbol!.toUpperCase())?.[1];
      if (!orig) continue;
      out[orig] = rowToQuote(orig, row);
    }
  } catch {
    /* return partial nulls */
  }

  return out;
}

export async function yahooQuote(symbol: string): Promise<QuoteDTO | null> {
  const batch = await yahooQuotesBatch([symbol]);
  return batch[symbol] ?? null;
}

function chartInterval(range: ChartRange): "1d" | "1wk" | "1mo" {
  if (range === "1W") return "1d";
  if (range === "MAX") return "1mo";
  return "1d";
}

function chartPeriod(range: ChartRange): { period1: Date; period2: Date } {
  const period2 = new Date();
  const period1 = new Date(period2);
  switch (range) {
    case "1D":
      period1.setDate(period1.getDate() - 5);
      break;
    case "1W":
      period1.setDate(period1.getDate() - 14);
      break;
    case "1M":
      period1.setMonth(period1.getMonth() - 2);
      break;
    case "1Y":
      period1.setFullYear(period1.getFullYear() - 1);
      break;
    case "MAX":
      period1.setFullYear(period1.getFullYear() - 10);
      break;
    default:
      period1.setFullYear(period1.getFullYear() - 1);
  }
  return { period1, period2 };
}

export async function yahooChartCandles(symbol: string, range: ChartRange): Promise<CandleDTO[]> {
  const ySym = symbolForYahoo(symbol);
  const { period1, period2 } = chartPeriod(range);
  const interval = chartInterval(range);

  try {
    const result = await yahooFinance.chart(ySym, {
      period1,
      period2,
      interval,
      includePrePost: false,
    });
    const quotes = result.quotes ?? [];
    return quotes
      .filter((q) => q.close != null && q.date)
      .map((q) => ({
        time: Math.floor(q.date.getTime() / 1000),
        open: q.open ?? q.close!,
        high: q.high ?? q.close!,
        low: q.low ?? q.close!,
        close: q.close!,
        volume: q.volume ?? 0,
      }));
  } catch {
    return [];
  }
}

export async function yahooSearch(query: string): Promise<{ symbol: string; description: string }[]> {
  try {
    const res = await yahooFinance.search(query, { quotesCount: 12, newsCount: 0 });
    return (res.quotes ?? [])
      .filter((q) => q.symbol && (q.quoteType === "EQUITY" || q.quoteType === "INDEX"))
      .filter(
        (q) =>
          q.symbol!.endsWith(".NS") ||
          q.symbol!.endsWith(".BO") ||
          q.symbol!.startsWith("^") ||
          /NSE|BSE|India/i.test(q.shortname ?? "") ||
          /NSE|BSE|India/i.test(q.longname ?? ""),
      )
      .slice(0, 12)
      .map((q) => ({
        symbol: q.symbol!,
        description: q.longname ?? q.shortname ?? q.symbol!,
      }));
  } catch {
    return [];
  }
}
