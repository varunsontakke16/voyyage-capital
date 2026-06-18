import { relations } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const transactionSideEnum = pgEnum("transaction_side", ["buy", "sell", "dividend"]);
export const planTierEnum = pgEnum("plan_tier", ["beginner", "voyyager"]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "active",
  "expired",
  "cancelled",
]);

// ---------------------------------------------------------------------------
// Model portfolios (managed via /admin)
// ---------------------------------------------------------------------------

export const modelPortfolios = pgTable("model_portfolios", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  initialCapital: doublePrecision("initial_capital"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const modelPositions = pgTable(
  "model_positions",
  {
    portfolioId: text("portfolio_id")
      .notNull()
      .references(() => modelPortfolios.id, { onDelete: "cascade" }),
    symbol: text("symbol").notNull(),
    qty: doublePrecision("qty").notNull(),
    avgCost: doublePrecision("avg_cost").notNull(),
    targetWeightPct: doublePrecision("target_weight_pct"),
    openedAt: text("opened_at"),
  },
  (t) => [uniqueIndex("model_positions_portfolio_symbol_idx").on(t.portfolioId, t.symbol)],
);

export const modelTransactions = pgTable("model_transactions", {
  id: text("id").primaryKey(),
  portfolioId: text("portfolio_id")
    .notNull()
    .references(() => modelPortfolios.id, { onDelete: "cascade" }),
  symbol: text("symbol").notNull(),
  side: transactionSideEnum("side").notNull(),
  qty: doublePrecision("qty"),
  price: doublePrecision("price"),
  amount: doublePrecision("amount"),
  at: text("at").notNull(),
  note: text("note"),
});

// ---------------------------------------------------------------------------
// Subscribers
// ---------------------------------------------------------------------------

export const subscribers = pgTable("subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  planTier: planTierEnum("plan_tier").notNull().default("beginner"),
  subscriptionStart: timestamp("subscription_start", { withTimezone: true }),
  subscriptionEnd: timestamp("subscription_end", { withTimezone: true }),
  paymentStatus: paymentStatusEnum("payment_status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// Terminal login credentials (gate access to /analytics terminal)
// ---------------------------------------------------------------------------

export const terminalCredentials = pgTable("terminal_credentials", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  // scrypt hash stored as `salt:hash` (both hex)
  passwordHash: text("password_hash").notNull(),
  tier: text("tier").notNull().default("voyyager"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// Research reports (3 free for Beginner; all for Voyyager)
// ---------------------------------------------------------------------------

export const researchReports = pgTable("research_reports", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary"),
  contentUrl: text("content_url"),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
  isFree: boolean("is_free").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// Rebalancing updates (published by admin, visible to Voyyager subscribers)
// ---------------------------------------------------------------------------

export const rebalancingUpdates = pgTable("rebalancing_updates", {
  id: text("id").primaryKey(),
  portfolioId: text("portfolio_id").references(() => modelPortfolios.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  content: text("content"),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const modelPortfoliosRelations = relations(modelPortfolios, ({ many }) => ({
  positions: many(modelPositions),
  transactions: many(modelTransactions),
  rebalancingUpdates: many(rebalancingUpdates),
}));

export const modelPositionsRelations = relations(modelPositions, ({ one }) => ({
  portfolio: one(modelPortfolios, {
    fields: [modelPositions.portfolioId],
    references: [modelPortfolios.id],
  }),
}));

export const modelTransactionsRelations = relations(modelTransactions, ({ one }) => ({
  portfolio: one(modelPortfolios, {
    fields: [modelTransactions.portfolioId],
    references: [modelPortfolios.id],
  }),
}));

export const rebalancingUpdatesRelations = relations(rebalancingUpdates, ({ one }) => ({
  portfolio: one(modelPortfolios, {
    fields: [rebalancingUpdates.portfolioId],
    references: [modelPortfolios.id],
  }),
}));
