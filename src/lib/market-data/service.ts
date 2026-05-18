import type { CandleDTO, ChartRange, MarketProviderId, QuoteDTO } from "./types";
import { isIndianSymbol } from "./india";
import { getCachedQuote, setCachedQuotes } from "./quote-cache";
import { yahooChartCandles, yahooQuote, yahooQuotesBatch } from "./providers/yahoo";

export type { ChartRange };

function useYahooForIndia(): boolean {
  const mode = (process.env.INDIAN_MARKET_PROVIDER ?? "yahoo").toLowerCase();
  return mode === "yahoo";
}

export async function getBestQuote(symbol: string): Promise<QuoteDTO | null> {
  const sym = symbol.trim();
  if (!sym) return null;

  if (isIndianSymbol(sym) && useYahooForIndia()) {
    const cached = getCachedQuote(sym);
    if (cached !== undefined) return cached;
    const q = await yahooQuote(sym);
    setCachedQuotes({ [sym]: q });
    return q;
  }

  return null;
}

export async function getCandles(
  symbol: string,
  range: ChartRange,
): Promise<{ candles: CandleDTO[]; source: MarketProviderId }> {
  const sym = symbol.trim();
  if (!sym) return { candles: [], source: "yahoo" };

  if (isIndianSymbol(sym) && useYahooForIndia()) {
    const candles = await yahooChartCandles(sym, range);
    return { candles, source: "yahoo" };
  }

  return { candles: [], source: "yahoo" };
}

/** Batch fetch with in-memory cache — one Yahoo request for all symbols. */
export async function getQuotesForSymbols(symbols: string[]): Promise<Record<string, QuoteDTO | null>> {
  const unique = [...new Set(symbols.map((s) => s.trim()).filter(Boolean))];
  const out: Record<string, QuoteDTO | null> = {};
  if (unique.length === 0) return out;

  const uncached: string[] = [];
  for (const sym of unique) {
    const cached = getCachedQuote(sym);
    if (cached !== undefined) {
      out[sym] = cached;
    } else {
      uncached.push(sym);
    }
  }

  if (uncached.length === 0) return out;

  const indian = uncached.filter(isIndianSymbol);
  const other = uncached.filter((s) => !isIndianSymbol(s));

  if (indian.length > 0 && useYahooForIndia()) {
    const batch = await yahooQuotesBatch(indian);
    setCachedQuotes(batch);
    Object.assign(out, batch);
  } else {
    for (const sym of indian) out[sym] = null;
  }

  for (const sym of other) out[sym] = null;

  return out;
}
