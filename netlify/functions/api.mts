import type { Config, Context } from "@netlify/functions";
import { z } from "zod";
import { eq, desc, count } from "drizzle-orm";
import { db } from "../../db/index.js";
import { purchaseRequestsTable, commodityPricesTable } from "../../db/schema.js";
import {
  detectLanguage,
  createTransporter,
  buildAdminEmail,
  buildClientEmail,
} from "../../artifacts/api-server/src/lib/emails.js";
import {
  SEED_DATA,
  applySimulatedDrift,
  generateSparklineHistory,
} from "../../artifacts/api-server/src/lib/commodities.js";

/* ── Validation schemas (mirror the OpenAPI spec / original Express server) ── */
const CreatePurchaseRequestBody = z.object({
  fullName: z.string().min(2),
  companyName: z.string().optional(),
  country: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  product: z.string().min(1),
  quantity: z.string().min(1),
  deliveryDestination: z.string().min(2),
  message: z.string().optional(),
});

const PurchaseStatus = z.enum(["pending", "reviewed", "responded"]);

const UpdateCommodityPriceBody = z.object({
  price: z.number().positive(),
  changePercent: z.number().optional(),
  nameFr: z.string().min(1).optional(),
  nameEn: z.string().min(1).optional(),
  unit: z.string().min(1).optional(),
  unitFr: z.string().min(1).optional(),
  icon: z.string().optional(),
});

const AddCommodityPriceBody = z.object({
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

function toResponse(r: typeof purchaseRequestsTable.$inferSelect) {
  return {
    id: r.id,
    fullName: r.fullName,
    companyName: r.companyName ?? null,
    country: r.country,
    email: r.email,
    phone: r.phone,
    product: r.product,
    quantity: r.quantity,
    deliveryDestination: r.deliveryDestination,
    message: r.message ?? null,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return undefined;
  }
}

const json = (data: unknown, status = 200) => Response.json(data, { status });

async function sendOrderEmails(request: typeof purchaseRequestsTable.$inferSelect) {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("[email] SMTP not configured — skipping email notifications");
    return;
  }
  const lang = detectLanguage(request.country);
  try {
    await Promise.all([
      transporter.sendMail(buildAdminEmail(request, lang)),
      transporter.sendMail(buildClientEmail(request, lang)),
    ]);
    console.log(`[email] Sent order #${request.id} notifications (${lang})`);
  } catch (err) {
    console.error("[email] Failed to send:", err);
  }
}

/* ── Purchase requests ── */
async function createPurchaseRequest(req: Request, context: Context) {
  const parsed = CreatePurchaseRequestBody.safeParse(await readJson(req));
  if (!parsed.success) {
    return json({ error: "validation_error", message: parsed.error.message }, 400);
  }
  const [request] = await db.insert(purchaseRequestsTable).values(parsed.data).returning();
  // Keep the function alive until emails are sent, without delaying the response
  context.waitUntil(sendOrderEmails(request));
  return json(toResponse(request), 201);
}

async function listPurchaseRequests(url: URL) {
  const statusParam = url.searchParams.get("status");
  const status = statusParam ? PurchaseStatus.safeParse(statusParam).data : undefined;
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(url.searchParams.get("limit")) || 20);
  const offset = (page - 1) * limit;
  const conditions = status ? eq(purchaseRequestsTable.status, status) : undefined;

  const [requests, totalResult] = await Promise.all([
    db.select().from(purchaseRequestsTable).where(conditions).orderBy(desc(purchaseRequestsTable.createdAt)).limit(limit).offset(offset),
    db.select({ count: count() }).from(purchaseRequestsTable).where(conditions),
  ]);

  return json({ requests: requests.map(toResponse), total: totalResult[0]?.count ?? 0, page, limit });
}

async function getPurchaseRequest(id: number) {
  const [request] = await db.select().from(purchaseRequestsTable).where(eq(purchaseRequestsTable.id, id));
  if (!request) return json({ error: "not_found", message: "Purchase request not found" }, 404);
  return json(toResponse(request));
}

async function updatePurchaseRequest(req: Request, id: number) {
  const parsed = z.object({ status: PurchaseStatus }).safeParse(await readJson(req));
  if (!parsed.success) {
    return json({ error: "validation_error", message: parsed.error.message }, 400);
  }
  const [updated] = await db
    .update(purchaseRequestsTable)
    .set({ status: parsed.data.status, updatedAt: new Date() })
    .where(eq(purchaseRequestsTable.id, id))
    .returning();
  if (!updated) return json({ error: "not_found", message: "Purchase request not found" }, 404);
  return json(toResponse(updated));
}

/* ── Commodity prices ── */
async function listCommodityPrices() {
  const prices = await db.select().from(commodityPricesTable).orderBy(commodityPricesTable.sortOrder);
  if (prices.length === 0) return json({ prices: [], seeded: false });

  const enriched = prices.map((p) => {
    const basePrice = parseFloat(p.price);
    const baseChange = parseFloat(p.changePercent);
    const { price, changePercent } = applySimulatedDrift(basePrice, baseChange);
    return {
      ...p,
      price: basePrice,
      changePercent: baseChange,
      simulatedPrice: price,
      simulatedChange: changePercent,
      sparkline: generateSparklineHistory(price),
    };
  });

  return json({ prices: enriched, lastUpdated: new Date().toISOString() });
}

async function seedCommodityPrices() {
  await db.delete(commodityPricesTable);
  await db.insert(commodityPricesTable).values(
    SEED_DATA.map((d) => ({ ...d, price: d.price.toString(), changePercent: d.changePercent.toString() })),
  );
  return json({ success: true, count: SEED_DATA.length });
}

async function addCommodityPrice(req: Request) {
  const parsed = AddCommodityPriceBody.safeParse(await readJson(req));
  if (!parsed.success) return json({ error: "Failed to add commodity" }, 400);
  const data = parsed.data;
  const [inserted] = await db
    .insert(commodityPricesTable)
    .values({ ...data, price: data.price.toString(), changePercent: data.changePercent.toString() })
    .returning();
  return json(inserted, 201);
}

async function updateCommodityPrice(req: Request, id: number) {
  const parsed = UpdateCommodityPriceBody.safeParse(await readJson(req));
  if (!parsed.success) return json({ error: "Invalid data" }, 400);
  const data = parsed.data;
  const [updated] = await db
    .update(commodityPricesTable)
    .set({
      price: data.price.toString(),
      ...(data.changePercent !== undefined && { changePercent: data.changePercent.toString() }),
      ...(data.nameFr && { nameFr: data.nameFr }),
      ...(data.nameEn && { nameEn: data.nameEn }),
      ...(data.unit && { unit: data.unit }),
      ...(data.unitFr && { unitFr: data.unitFr }),
      ...(data.icon && { icon: data.icon }),
      isManual: true,
      updatedAt: new Date(),
    })
    .where(eq(commodityPricesTable.id, id))
    .returning();
  if (!updated) return json({ error: "Not found" }, 404);
  return json(updated);
}

async function deleteCommodityPrice(id: number) {
  await db.delete(commodityPricesTable).where(eq(commodityPricesTable.id, id));
  return json({ success: true });
}

/* ── Router ── */
export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api/, "").replace(/\/$/, "") || "/";
  const method = req.method.toUpperCase();

  const purchaseMatch = path.match(/^\/admin\/purchase-requests\/([^/]+)$/);
  const commodityMatch = path.match(/^\/admin\/commodity-prices\/([^/]+)$/);

  try {
    if (path === "/healthz" && method === "GET") return json({ status: "ok" });

    if (path === "/purchase-requests" && method === "POST") return await createPurchaseRequest(req, context);
    if (path === "/admin/purchase-requests" && method === "GET") return await listPurchaseRequests(url);
    if (purchaseMatch) {
      const id = Number(purchaseMatch[1]);
      if (!Number.isInteger(id)) return json({ error: "invalid_id", message: "Invalid ID" }, 400);
      if (method === "GET") return await getPurchaseRequest(id);
      if (method === "PATCH") return await updatePurchaseRequest(req, id);
    }

    if (path === "/commodity-prices" && method === "GET") return await listCommodityPrices();
    if (path === "/admin/commodity-prices/seed" && method === "POST") return await seedCommodityPrices();
    if (path === "/admin/commodity-prices" && method === "POST") return await addCommodityPrice(req);
    if (commodityMatch) {
      const id = Number(commodityMatch[1]);
      if (!Number.isInteger(id)) return json({ error: "Invalid ID" }, 400);
      if (method === "PUT") return await updateCommodityPrice(req, id);
      if (method === "DELETE") return await deleteCommodityPrice(id);
    }

    return json({ error: "not_found", message: "Route not found" }, 404);
  } catch (err) {
    console.error(err);
    return json({ error: "internal_error", message: "Something went wrong" }, 500);
  }
};

export const config: Config = {
  path: "/api/*",
};
