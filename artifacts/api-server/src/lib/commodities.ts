export const SEED_DATA = [
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

export function applySimulatedDrift(price: number, changePercent: number): { price: number; changePercent: number } {
  const drift = (Math.random() - 0.48) * 0.3;
  const newChangePercent = parseFloat((changePercent + drift).toFixed(2));
  const multiplier = 1 + (drift / 100);
  const newPrice = parseFloat((price * multiplier).toFixed(4));
  return { price: newPrice, changePercent: newChangePercent };
}

export function generateSparklineHistory(currentPrice: number, days: number = 30): number[] {
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
