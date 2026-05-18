import type { CandleDTO, QuoteDTO } from "../types";
import { fetchJson } from "../http";
import { isIndianSymbol } from "../india";

const BASE = "https://api.twelvedata.com";

type TwelveQuote = {
  symbol?: string;
  close?: string;
  price?: string;
  change?: string;
  percent_change?: string;
  high?: string;
  low?: string;
  open?: string;
  previous_close?: string;
  timestamp?: string;
  currency?: string;
  status?: string;
  code?: number;
  message?: string;
};

export async function twelveDataQuote(apiKey: string, symbol: string): Promise<QuoteDTO | null> {
  const url = `${BASE}/quote?symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(apiKey)}`;
  const q = await fetchJson<TwelveQuote>(url);
  if (q.status === "error" || (q.code != null && q.code >= 400)) return null;

  const raw = q.close ?? q.price;
  if (raw == null || raw === "") return null;
  const price = Number(raw);
  if (!Number.isFinite(price) || price <= 0) return null;

  const prevClose = q.previous_close ? Number(q.previous_close) : undefined;
  let change = Number(q.change ?? 0);
  let changePercent = Number(q.percent_change ?? 0);
  if (prevClose != null && prevClose > 0 && change === 0 && changePercent === 0) {
    change = price - prevClose;
    changePercent = (change / prevClose) * 100;
  }

  return {
    symbol: q.symbol ?? symbol,
    price,
    change,
    changePercent,
    high: q.high ? Number(q.high) : undefined,
    low: q.low ? Number(q.low) : undefined,
    open: q.open ? Number(q.open) : undefined,
    prevClose: prevClose && prevClose > 0 ? prevClose : undefined,
    currency: q.currency ?? (isIndianSymbol(symbol) ? "INR" : undefined),
    timestamp: q.timestamp ? Number(q.timestamp) * 1000 : Date.now(),
    source: "twelvedata",
  };
}

export async function twelveDataTimeSeries(
  apiKey: string,
  symbol: string,
  interval: "1day" | "1week" | "1month",
  outputsize: number,
): Promise<CandleDTO[]> {
  const url = `${BASE}/time_series?symbol=${encodeURIComponent(symbol)}&interval=${interval}&outputsize=${outputsize}&order=ASC&apikey=${encodeURIComponent(apiKey)}`;
  type V = { datetime: string; open: string; high: string; low: string; close: string; volume?: string }[];
  type T = { values?: V; status?: string; code?: number };
  const d = await fetchJson<T>(url);
  if (d.status === "error" || (d.code != null && d.code >= 400) || !d.values?.length) return [];
  return d.values.map((v) => ({
    time: Math.floor(new Date(v.datetime).getTime() / 1000),
    open: Number(v.open),
    high: Number(v.high),
    low: Number(v.low),
    close: Number(v.close),
    volume: v.volume ? Number(v.volume) : 0,
  }));
}
