import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { db, purchaseRequestsTable, insertPurchaseRequestSchema, updatePurchaseRequestStatusSchema } from "@workspace/db";
import { CreatePurchaseRequestBody, ListPurchaseRequestsQueryParams, GetPurchaseRequestParams, UpdatePurchaseRequestStatusParams, UpdatePurchaseRequestStatusBody } from "@workspace/api-zod";
import { eq, desc, count } from "drizzle-orm";

const router: IRouter = Router();

/* ── Nodemailer transporter ── */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { type: 'LOGIN', user, pass },
    tls: { rejectUnauthorized: false },
  });
}

/* ── Email: notification to FENAPPACI ── */
function buildAdminEmail(r: {
  fullName: string; companyName?: string | null; email: string;
  phone: string; country: string; product: string; quantity: string;
  deliveryDestination: string; message?: string | null; id: number;
}) {
  const rows = [
    ["Nom complet", r.fullName],
    ["Société", r.companyName || "—"],
    ["Email", r.email],
    ["Téléphone", r.phone],
    ["Pays", r.country],
    ["Produit souhaité", r.product],
    ["Quantité", r.quantity],
    ["Destination de livraison", r.deliveryDestination],
    ["Message", r.message || "—"],
  ];

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;background:#f8f8f8;font-weight:600;color:#374151;border:1px solid #e5e7eb;white-space:nowrap;">${label}</td>
      <td style="padding:8px 12px;color:#1f2937;border:1px solid #e5e7eb;">${value}</td>
    </tr>`).join("");

  return {
    from: `"FENAPPACI Site Web" <${process.env.SMTP_USER}>`,
    to: "info@fenappaci.com",
    subject: `🌿 Nouvelle commande #${r.id} — ${r.product} — ${r.fullName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
        <div style="background:linear-gradient(135deg,#f97316 0%,#16a34a 100%);padding:32px 28px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">🌿 FENAPPACI — Nouvelle Demande</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,.85);font-size:14px;">Commande #${r.id} reçue via fenappaci.com</p>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">${tableRows}</table>
          <div style="margin-top:20px;padding:14px 16px;background:#fef3c7;border-left:4px solid #f97316;border-radius:4px;">
            <p style="margin:0;color:#92400e;font-size:13px;font-weight:600;">⚡ Répondez rapidement pour maximiser les chances de conclure cette vente.</p>
          </div>
        </div>
        <div style="padding:16px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">FENAPPACI — Fédération Nationale des Producteurs & Promoteurs Agricoles de Côte d'Ivoire</p>
        </div>
      </div>`,
  };
}

/* ── Email: auto-reply to client ── */
function buildClientEmail(r: {
  fullName: string; email: string; product: string;
  quantity: string; deliveryDestination: string; id: number;
}) {
  return {
    from: `"FENAPPACI" <${process.env.SMTP_USER}>`,
    to: r.email,
    subject: `✅ Votre demande a bien été reçue — FENAPPACI`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
        <div style="background:linear-gradient(135deg,#f97316 0%,#16a34a 100%);padding:32px 28px;text-align:center;">
          <div style="width:64px;height:64px;background:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
            <span style="font-size:32px;">🌿</span>
          </div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Demande bien reçue !</h1>
        </div>
        <div style="padding:32px 28px;">
          <p style="margin:0 0 16px;font-size:16px;color:#1f2937;">Cher(e) <strong>${r.fullName}</strong>,</p>
          <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
            Nous avons bien reçu votre demande concernant <strong style="color:#16a34a;">${r.product}</strong> 
            (${r.quantity}) pour livraison à <strong>${r.deliveryDestination}</strong>.
          </p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
            <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#15803d;">📋 Référence de votre commande</p>
            <p style="margin:0;font-size:24px;font-weight:800;color:#16a34a;letter-spacing:2px;">#${r.id}</p>
          </div>
          <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
            Notre équipe commerciale examinera votre demande et vous contactera dans les <strong>meilleurs délais</strong> (généralement sous 24–48h ouvrables).
          </p>
          <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:16px 20px;">
            <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#9a3412;">📞 Contact direct FENAPPACI</p>
            <p style="margin:0;font-size:14px;color:#7c2d12;">
              📧 info@fenappaci.com<br>
              📱 +225 07 49 01 27 25<br>
              📱 +225 05 45 07 97 15<br>
              💬 <a href="https://wa.me/2250749012725" style="color:#16a34a;">WhatsApp</a>
            </p>
          </div>
        </div>
        <div style="padding:20px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#374151;">FENAPPACI</p>
          <p style="margin:0;font-size:12px;color:#9ca3af;">Fédération Nationale des Producteurs & Promoteurs Agricoles de Côte d'Ivoire</p>
          <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">Abidjan Cocody Angré Château — Immeuble BATIM 2ème Étage Porte 216</p>
        </div>
      </div>`,
  };
}

/* ── POST /purchase-requests ── */
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

  /* ── Send emails asynchronously (don't block the response) ── */
  const transporter = createTransporter();
  if (transporter) {
    try {
      await Promise.all([
        transporter.sendMail(buildAdminEmail(request)),
        transporter.sendMail(buildClientEmail(request)),
      ]);
      console.log(`[email] Sent order #${request.id} notifications`);
    } catch (err) {
      console.error("[email] Failed to send:", err);
    }
  } else {
    console.warn("[email] SMTP not configured — skipping email notifications");
  }
});

/* ── GET /admin/purchase-requests ── */
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
    db.select().from(purchaseRequestsTable).where(conditions).orderBy(desc(purchaseRequestsTable.createdAt)).limit(limit).offset(offset),
    db.select({ count: count() }).from(purchaseRequestsTable).where(conditions),
  ]);

  res.json({ requests: requests.map(toResponse), total: totalResult[0]?.count ?? 0, page, limit });
});

/* ── GET /admin/purchase-requests/:id ── */
router.get("/admin/purchase-requests/:id", async (req, res) => {
  const parsed = GetPurchaseRequestParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) { res.status(400).json({ error: "invalid_id", message: "Invalid ID" }); return; }

  const [request] = await db.select().from(purchaseRequestsTable).where(eq(purchaseRequestsTable.id, parsed.data.id));
  if (!request) { res.status(404).json({ error: "not_found", message: "Purchase request not found" }); return; }

  res.json(toResponse(request));
});

/* ── PATCH /admin/purchase-requests/:id ── */
router.patch("/admin/purchase-requests/:id", async (req, res) => {
  const paramParsed = UpdatePurchaseRequestStatusParams.safeParse({ id: Number(req.params.id) });
  if (!paramParsed.success) { res.status(400).json({ error: "invalid_id", message: "Invalid ID" }); return; }

  const bodyParsed = UpdatePurchaseRequestStatusBody.safeParse(req.body);
  if (!bodyParsed.success) { res.status(400).json({ error: "validation_error", message: bodyParsed.error.message }); return; }

  const [updated] = await db.update(purchaseRequestsTable)
    .set({ status: bodyParsed.data.status, updatedAt: new Date() })
    .where(eq(purchaseRequestsTable.id, paramParsed.data.id))
    .returning();

  if (!updated) { res.status(404).json({ error: "not_found", message: "Purchase request not found" }); return; }

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
