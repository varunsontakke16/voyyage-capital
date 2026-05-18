import type { QuoteDTO } from "./types";

const TTL_MS = 60_000;
const cache = new Map<string, { at: number; quote: QuoteDTO }>();

function cacheKey(symbol: string): string {
  return symbol.trim().toUpperCase();
}

export function getCachedQuote(symbol: string): QuoteDTO | null | undefined {
  const hit = cache.get(cacheKey(symbol));
  if (!hit) return undefined;
  if (Date.now() - hit.at > TTL_MS) {
    cache.delete(cacheKey(symbol));
    return undefined;
  }
  return hit.quote;
}

export function setCachedQuote(symbol: string, quote: QuoteDTO | null): void {
  const key = cacheKey(symbol);
  if (!quote) {
    cache.delete(key);
    return;
  }
  cache.set(key, { at: Date.now(), quote });
}

export function setCachedQuotes(quotes: Record<string, QuoteDTO | null>): void {
  for (const [sym, q] of Object.entries(quotes)) {
    if (q) setCachedQuote(sym, q);
  }
}
