import { pgTable, serial, text, numeric, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const purchaseRequestsTable = pgTable("purchase_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  companyName: text("company_name"),
  country: text("country").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  product: text("product").notNull(),
  quantity: text("quantity").notNull(),
  deliveryDestination: text("delivery_destination").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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
