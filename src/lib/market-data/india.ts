/** Defaults and helpers for NSE/BSE–focused market data. */

export const INDIAN_INDEX_SYMBOLS = "^NSEI,^NSEBANK";
export const INDIAN_DEFAULT_WATCHLIST =
  "RELIANCE.NS,INFY.NS,TCS.NS,HDFCBANK.NS,ITC.NS,SBIN.NS,BHARTIARTL.NS";
/** Yahoo Finance index tickers for Nifty sector proxies */
export const INDIAN_SECTOR_SYMBOLS = "^CNXIT,^CNXPHARMA,^CNXAUTO,^CNXFMCG,^CNXMETAL,^CNXREALTY";
export const INDIAN_DEFAULT_CHART_SYMBOL = "RELIANCE.NS";
export const INDIAN_MARKET_DATA_PRIORITY = "yahoo";

const INDEX_LABELS: Record<string, string> = {
  "^NSEI": "Nifty 50",
  "^NSEBANK": "Nifty Bank",
  "^BSESN": "Sensex",
  "^CNXIT": "Nifty IT",
  "^CNXPHARMA": "Nifty Pharma",
  "^CNXAUTO": "Nifty Auto",
  "^CNXFMCG": "Nifty FMCG",
  "^CNXMETAL": "Nifty Metal",
  "^CNXREALTY": "Nifty Realty",
};

/** Map internal / Finnhub-style symbols to Yahoo Finance tickers. */
const YAHOO_SYMBOL_MAP: Record<string, string> = {
  NIFTYIT: "^CNXIT",
  NIFTYPHARMA: "^CNXPHARMA",
  NIFTYAUTO: "^CNXAUTO",
  NIFTYFMCG: "^CNXFMCG",
  NIFTYMETAL: "^CNXMETAL",
  NIFTYREALTY: "^CNXREALTY",
};

export function symbolForYahoo(symbol: string): string {
  const s = symbol.trim().toUpperCase();
  if (YAHOO_SYMBOL_MAP[s]) return YAHOO_SYMBOL_MAP[s];
  if (s.startsWith("^") || s.endsWith(".NS") || s.endsWith(".BO")) return s;
  if (s.includes(":NSE")) return `${s.replace(/:NSE$/, "")}.NS`;
  if (s.includes(":BSE")) return `${s.replace(/:BSE$/, "")}.BO`;
  return `${s}.NS`;
}

export function isIndianSymbol(symbol: string): boolean {
  const s = symbol.trim().toUpperCase();
  return (
    s.endsWith(".NS") ||
    s.endsWith(".BO") ||
    s.startsWith("^") ||
    /:(NSE|BSE)$/.test(s) ||
    s.startsWith("NIFTY") ||
    s.startsWith("SENSEX")
  );
}

/** Symbol formats to try against market data APIs (Finnhub vs Twelve Data differ). */
export function indianQuoteVariants(symbol: string): string[] {
  const s = symbol.trim().toUpperCase();
  const out: string[] = [];
  const add = (v: string) => {
    const x = v.trim().toUpperCase();
    if (x && !out.includes(x)) out.push(x);
  };

  add(s);

  if (s.endsWith(".NS")) {
    const base = s.slice(0, -3);
    add(`${base}:NSE`);
    add(base);
  } else if (s.endsWith(".BO")) {
    const base = s.slice(0, -3);
    add(`${base}:BSE`);
    add(base);
  } else if (s.includes(":NSE")) {
    const base = s.replace(/:NSE$/, "");
    add(`${base}.NS`);
  } else if (s.includes(":BSE")) {
    const base = s.replace(/:BSE$/, "");
    add(`${base}.BO`);
  } else if (!s.startsWith("^") && !s.includes(".")) {
    add(`${s}.NS`);
    add(`${s}:NSE`);
  }

  return out;
}

/** Normalize user/admin input to Finnhub-style NSE tickers when no exchange suffix is given. */
export function normalizeIndianSymbol(symbol: string): string {
  const raw = symbol.trim().toUpperCase();
  if (!raw) return raw;
  if (raw.startsWith("^") || /\.(NS|BO)$/.test(raw) || /:(NSE|BSE)$/.test(raw)) return raw;
  return `${raw}.NS`;
}

export function symbolForTwelveData(symbol: string): string {
  const s = symbol.trim().toUpperCase();
  if (s.includes(":")) return s;
  if (s.endsWith(".NS")) return `${s.slice(0, -3)}:NSE`;
  if (s.endsWith(".BO")) return `${s.slice(0, -3)}:BSE`;
  if (s.startsWith("^")) return s;
  if (!s.includes(".")) return `${s}:NSE`;
  return s;
}

export function displaySymbol(symbol: string): string {
  const label = INDEX_LABELS[symbol.toUpperCase()];
  if (label) return label;
  return symbol.replace(/\.(NS|BO)$/i, "").replace(/:NSE$|:BSE$/i, "");
}

/** Resolve a usable last price from a quote DTO. */
export function quoteLastPrice(q: { price: number; prevClose?: number } | null | undefined): number | null {
  if (!q) return null;
  if (q.price > 0) return q.price;
  if (q.prevClose != null && q.prevClose > 0) return q.prevClose;
  return null;
}

export function rankIndianMovers(
  symbols: string[],
  quotes: Record<string, { changePercent: number } | null | undefined>,
  limit = 8,
): { gainers: { symbol: string; changePercent: number }[]; losers: { symbol: string; changePercent: number }[] } {
  const rows = symbols
    .map((symbol) => ({
      symbol,
      changePercent: quotes[symbol]?.changePercent ?? 0,
    }))
    .filter((r) => quotes[r.symbol] != null);

  const gainers = [...rows]
    .filter((r) => r.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, limit);

  const losers = [...rows]
    .filter((r) => r.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, limit);

  return { gainers, losers };
}
