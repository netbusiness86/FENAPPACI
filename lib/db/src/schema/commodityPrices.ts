import { pgTable, serial, text, numeric, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const commodityPricesTable = pgTable("commodity_prices", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameFr: text("name_fr").notNull(),
  symbol: text("symbol").notNull().unique(),
  icon: text("icon").notNull().default("🌾"),
  price: numeric("price", { precision: 14, scale: 4 }).notNull(),
  unit: text("unit").notNull(),
  unitFr: text("unit_fr").notNull(),
  changePercent: numeric("change_percent", { precision: 8, scale: 4 }).notNull().default("0"),
  isManual: boolean("is_manual").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const updateCommodityPriceSchema = z.object({
  price: z.number().positive(),
  changePercent: z.number().optional(),
  nameFr: z.string().min(1).optional(),
  nameEn: z.string().min(1).optional(),
  unit: z.string().min(1).optional(),
  unitFr: z.string().min(1).optional(),
  icon: z.string().optional(),
});

export const addCommodityPriceSchema = z.object({
  nameEn: z.string().min(1),
  nameFr: z.string().min(1),
  symbol: z.string().min(1),
  icon: z.string().min(1),
  price: z.number().positive(),
  unit: z.string().min(1),
  unitFr: z.string().min(1),
  changePercent: z.number().optional().default(0),
  sortOrder: z.number().optional().default(99),
});

export type CommodityPrice = typeof commodityPricesTable.$inferSelect;
export type UpdateCommodityPrice = z.infer<typeof updateCommodityPriceSchema>;
export type AddCommodityPrice = z.infer<typeof addCommodityPriceSchema>;
