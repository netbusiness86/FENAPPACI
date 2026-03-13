import { Router } from "express";
import { db, commodityPricesTable, updateCommodityPriceSchema, addCommodityPriceSchema } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

const SEED_DATA = [
  { nameEn: "Cocoa", nameFr: "Cacao", symbol: "COCOA", icon: "🍫", price: 9850.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: 2.3, sortOrder: 1 },
  { nameEn: "Coffee (Robusta)", nameFr: "Café (Robusta)", symbol: "COFFEE", icon: "☕", price: 4320.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: -1.1, sortOrder: 2 },
  { nameEn: "Cashew Nuts", nameFr: "Noix de Cajou", symbol: "CASHEW", icon: "🌰", price: 1780.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: 0.5, sortOrder: 3 },
  { nameEn: "Palm Oil", nameFr: "Huile de Palme", symbol: "PALMOIL", icon: "🌴", price: 890.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: -0.8, sortOrder: 4 },
  { nameEn: "Natural Rubber", nameFr: "Caoutchouc Naturel", symbol: "RUBBER", icon: "🌿", price: 1550.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: 1.2, sortOrder: 5 },
  { nameEn: "Cotton", nameFr: "Coton", symbol: "COTTON", icon: "🌸", price: 1.88, unit: "USD/lb", unitFr: "USD/lb", changePercent: -0.4, sortOrder: 6 },
  { nameEn: "Soybean", nameFr: "Soja", symbol: "SOYBEAN", icon: "🫘", price: 370.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: 0.9, sortOrder: 7 },
  { nameEn: "Corn (Maize)", nameFr: "Maïs", symbol: "CORN", icon: "🌽", price: 162.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: -1.8, sortOrder: 8 },
  { nameEn: "Rice", nameFr: "Riz", symbol: "RICE", icon: "🌾", price: 510.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: 0.2, sortOrder: 9 },
  { nameEn: "Ginger", nameFr: "Gingembre", symbol: "GINGER", icon: "🫚", price: 1150.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: 3.1, sortOrder: 10 },
  { nameEn: "Cassava", nameFr: "Manioc", symbol: "CASSAVA", icon: "🥔", price: 185.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: 0.6, sortOrder: 11 },
  { nameEn: "Yam", nameFr: "Igname", symbol: "YAM", icon: "🍠", price: 390.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: -0.3, sortOrder: 12 },
  { nameEn: "Plantain", nameFr: "Banane Plantain", symbol: "PLANTAIN", icon: "🍌", price: 240.0, unit: "USD/ton", unitFr: "USD/tonne", changePercent: 1.5, sortOrder: 13 },
];

function applySimulatedDrift(price: number, changePercent: number): { price: number; changePercent: number } {
  const drift = (Math.random() - 0.48) * 0.3;
  const newChangePercent = parseFloat((changePercent + drift).toFixed(2));
  const multiplier = 1 + (drift / 100);
  const newPrice = parseFloat((price * multiplier).toFixed(4));
  return { price: newPrice, changePercent: newChangePercent };
}

function generateSparklineHistory(currentPrice: number, days: number = 30): number[] {
  const history: number[] = [];
  let price = currentPrice * (1 - (Math.random() * 0.12 + 0.03));
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.47) * 0.015;
    price = price * (1 + change);
    history.push(parseFloat(price.toFixed(4)));
  }
  history.push(currentPrice);
  return history;
}

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
