import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

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

export const insertPurchaseRequestSchema = createInsertSchema(purchaseRequestsTable)
  .omit({ id: true, createdAt: true, updatedAt: true, status: true })
  .extend({
    fullName: z.string().min(2),
    country: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    product: z.string().min(1),
    quantity: z.string().min(1),
    deliveryDestination: z.string().min(2),
  });

export const updatePurchaseRequestStatusSchema = z.object({
  status: z.enum(["pending", "reviewed", "responded"]),
});

export type InsertPurchaseRequest = z.infer<typeof insertPurchaseRequestSchema>;
export type PurchaseRequest = typeof purchaseRequestsTable.$inferSelect;
