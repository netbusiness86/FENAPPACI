import { Router, type IRouter } from "express";
import { db, purchaseRequestsTable, insertPurchaseRequestSchema, updatePurchaseRequestStatusSchema } from "@workspace/db";
import { CreatePurchaseRequestBody, ListPurchaseRequestsQueryParams, GetPurchaseRequestParams, UpdatePurchaseRequestStatusParams, UpdatePurchaseRequestStatusBody } from "@workspace/api-zod";
import { eq, desc, count, sql } from "drizzle-orm";

const router: IRouter = Router();

router.post("/purchase-requests", async (req, res) => {
  const parsed = CreatePurchaseRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "validation_error", message: parsed.error.message });
    return;
  }

  const dbParsed = insertPurchaseRequestSchema.safeParse(parsed.data);
  if (!dbParsed.success) {
    res.status(400).json({ error: "validation_error", message: dbParsed.error.message });
    return;
  }

  const [request] = await db.insert(purchaseRequestsTable).values(dbParsed.data).returning();
  res.status(201).json(toResponse(request));
});

router.get("/admin/purchase-requests", async (req, res) => {
  const parsed = ListPurchaseRequestsQueryParams.safeParse({
    status: req.query.status,
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 20,
  });

  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 20) : 20;
  const status = parsed.success ? parsed.data.status : undefined;

  const offset = (page - 1) * limit;

  const conditions = status ? eq(purchaseRequestsTable.status, status) : undefined;

  const [requests, totalResult] = await Promise.all([
    db.select()
      .from(purchaseRequestsTable)
      .where(conditions)
      .orderBy(desc(purchaseRequestsTable.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() })
      .from(purchaseRequestsTable)
      .where(conditions),
  ]);

  res.json({
    requests: requests.map(toResponse),
    total: totalResult[0]?.count ?? 0,
    page,
    limit,
  });
});

router.get("/admin/purchase-requests/:id", async (req, res) => {
  const parsed = GetPurchaseRequestParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_id", message: "Invalid ID" });
    return;
  }

  const [request] = await db.select().from(purchaseRequestsTable).where(eq(purchaseRequestsTable.id, parsed.data.id));
  if (!request) {
    res.status(404).json({ error: "not_found", message: "Purchase request not found" });
    return;
  }

  res.json(toResponse(request));
});

router.patch("/admin/purchase-requests/:id", async (req, res) => {
  const paramParsed = UpdatePurchaseRequestStatusParams.safeParse({ id: Number(req.params.id) });
  if (!paramParsed.success) {
    res.status(400).json({ error: "invalid_id", message: "Invalid ID" });
    return;
  }

  const bodyParsed = UpdatePurchaseRequestStatusBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: "validation_error", message: bodyParsed.error.message });
    return;
  }

  const [updated] = await db.update(purchaseRequestsTable)
    .set({ status: bodyParsed.data.status, updatedAt: new Date() })
    .where(eq(purchaseRequestsTable.id, paramParsed.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "not_found", message: "Purchase request not found" });
    return;
  }

  res.json(toResponse(updated));
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

export default router;
