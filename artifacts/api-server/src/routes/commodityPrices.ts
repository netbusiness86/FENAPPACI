import { Router } from "express";
import { db, commodityPricesTable, updateCommodityPriceSchema, addCommodityPriceSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SEED_DATA, applySimulatedDrift, generateSparklineHistory } from "../lib/commodities";

const router = Router();

router.get("/commodity-prices", async (_req, res) => {
  try {
    const prices = await db
      .select()
      .from(commodityPricesTable)
      .orderBy(commodityPricesTable.sortOrder);

    if (prices.length === 0) {
      return res.status(200).json({ prices: [], seeded: false });
    }

    const enriched = prices.map((p) => {
      const { price, changePercent } = applySimulatedDrift(
        parseFloat(p.price as unknown as string),
        parseFloat(p.changePercent as unknown as string)
      );
      const sparkline = generateSparklineHistory(price);
      return {
        ...p,
        price: parseFloat(p.price as unknown as string),
        changePercent: parseFloat(p.changePercent as unknown as string),
        simulatedPrice: price,
        simulatedChange: changePercent,
        sparkline,
      };
    });

    return res.json({ prices: enriched, lastUpdated: new Date().toISOString() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch prices" });
  }
});

router.post("/admin/commodity-prices/seed", async (_req, res) => {
  try {
    await db.delete(commodityPricesTable);
    await db.insert(commodityPricesTable).values(
      SEED_DATA.map((d) => ({
        ...d,
        price: d.price.toString(),
        changePercent: d.changePercent.toString(),
      }))
    );
    return res.json({ success: true, count: SEED_DATA.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to seed data" });
  }
});

router.put("/admin/commodity-prices/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const data = updateCommodityPriceSchema.parse(req.body);

    const updated = await db
      .update(commodityPricesTable)
      .set({
        ...(data.price !== undefined && { price: data.price.toString() }),
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

    if (updated.length === 0) return res.status(404).json({ error: "Not found" });
    return res.json(updated[0]);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Invalid data" });
  }
});

router.post("/admin/commodity-prices", async (req, res) => {
  try {
    const data = addCommodityPriceSchema.parse(req.body);
    const inserted = await db
      .insert(commodityPricesTable)
      .values({
        ...data,
        price: data.price.toString(),
        changePercent: (data.changePercent ?? 0).toString(),
        sortOrder: data.sortOrder ?? 99,
      })
      .returning();
    return res.status(201).json(inserted[0]);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Failed to add commodity" });
  }
});

router.delete("/admin/commodity-prices/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    await db.delete(commodityPricesTable).where(eq(commodityPricesTable.id, id));
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;
