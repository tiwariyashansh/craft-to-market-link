export type ProductStatus = "draft" | "catalog" | "published";

export type Product = {
  id: string;
  name: string;
  craft: string;
  category: string;
  material: string;
  title: string;
  description: string;
  tags: string[];
  confidence: number;
  status: ProductStatus;
  photo?: string | undefined;
  icon: IconKey;
  materialCost: number;
  labourCost: number;
  makingTime: string;
  size: string;
  retail: number;
  wholesale: number;
  createdAt: string;
};

export type IconKey = "pot" | "shawl" | "wood" | "silver";

export type AiTemplate = {
  name: string;
  craft: string;
  category: string;
  material: string;
  title: string;
  description: string;
  tags: string[];
  confidence: number;
  icon: IconKey;
  materialCost: number;
  labourCost: number;
  makingTime: string;
  size: string;
};

export const AI_TEMPLATES: AiTemplate[] = [
  {
    name: "Blue Pottery Flower Vase",
    craft: "Jaipur Blue Pottery",
    category: "Home Decor",
    material: "Quartz powder, glaze, cobalt oxide",
    title: "Hand-Painted Jaipur Blue Pottery Vase — Cobalt Floral, 9 inch",
    description:
      "A hand-thrown vase made in the Jaipur blue pottery tradition, where quartz powder replaces clay and the glaze is fired only once. The cobalt floral vines are painted freehand, so no two vases carry the same line. Food-safe glaze, lead-free, and light enough for a shelf or a hotel bedside table. Made to order in small batches.",
    tags: ["Blue Pottery", "Jaipur", "Handmade", "Home Decor", "Vase", "Gifting"],
    confidence: 94,
    icon: "pot",
    materialCost: 320,
    labourCost: 480,
    makingTime: "3 days",
    size: "9 in height, 4 in width",
  },
  {
    name: "Kashmiri Pashmina Shawl",
    craft: "Kashmiri Pashmina Weaving",
    category: "Textiles",
    material: "Hand-spun pashmina wool, silk thread",
    title: "Hand-Woven Kashmiri Pashmina Shawl with Sozni Border",
    description:
      "Woven on a handloom in Srinagar from hand-spun pashmina, with a fine sozni needle border stitched over three weeks. The weave is light enough to pass through a ring but warm through a north Indian winter. Natural dye, soft off-white body with an indigo border.",
    tags: ["Pashmina", "Kashmir", "Handloom", "Sozni", "Winter", "Luxury Gifting"],
    confidence: 91,
    icon: "shawl",
    materialCost: 2400,
    labourCost: 3600,
    makingTime: "21 days",
    size: "80 in x 40 in",
  },
  {
    name: "Saharanpur Carved Wooden Tray",
    craft: "Saharanpur Wood Carving",
    category: "Home Decor",
    material: "Seasoned sheesham wood, natural wax polish",
    title: "Saharanpur Hand-Carved Sheesham Serving Tray — Jaali Work",
    description:
      "Carved by hand from seasoned sheesham in Saharanpur, with the fine jaali lattice the region is known for. Finished with natural wax, not chemical lacquer, so the grain stays visible. Sturdy enough for daily serving and steady on a table. Suits cafes, boutique hotels and festive gifting.",
    tags: ["Wood Carving", "Saharanpur", "Sheesham", "Serving Tray", "Jaali", "Handmade"],
    confidence: 89,
    icon: "wood",
    materialCost: 650,
    labourCost: 900,
    makingTime: "5 days",
    size: "16 in x 11 in",
  },
  {
    name: "Odisha Silver Filigree Earrings",
    craft: "Cuttack Silver Filigree (Tarakasi)",
    category: "Jewellery",
    material: "92.5 sterling silver wire",
    title: "Cuttack Tarakasi Silver Filigree Earrings — Feather Drop",
    description:
      "Made in Cuttack using tarakasi filigree, where silver is drawn into hair-fine wire and coiled by hand into the feather pattern. Sterling 92.5 silver, hallmarked, and very light on the ear despite the size. Comes in a cloth pouch, ready for retail display.",
    tags: ["Silver Filigree", "Tarakasi", "Cuttack", "Jewellery", "Sterling Silver", "Handmade"],
    confidence: 92,
    icon: "silver",
    materialCost: 900,
    labourCost: 1100,
    makingTime: "4 days",
    size: "2.2 in drop",
  },
];

export type Buyer = {
  id: string;
  name: string;
  type: string;
  location: string;
  demand: string;
  orderSize: string;
  contact: string;
  about: string;
  interest: Record<string, number>;
  reason: Record<string, string>;
};

export const BUYERS: Buyer[] = [
  {
    id: "amer-haveli",
    name: "Amer Haveli Boutique Hotel",
    type: "Boutique Hotel",
    location: "Jaipur, Rajasthan",
    demand: "120–200 pieces / year",
    orderSize: "40–60 pieces per order",
    contact: "sourcing@amerhaveli.example",
    about:
      "A 24-room heritage hotel that restocks room decor twice a year and prefers pieces made within Rajasthan.",
    interest: { "Home Decor": 96, Textiles: 74, Jewellery: 38, "Kitchen & Dining": 82 },
    reason: {
      "Home Decor": "Buys local pottery and decor for guest rooms every season.",
      Textiles: "Uses handloom throws and cushions in suites.",
      Jewellery: "Only stocks jewellery in its small lobby shop.",
      "Kitchen & Dining": "Restocks serving ware for its in-house restaurant.",
    },
  },
  {
    id: "dastkar-retail",
    name: "Dastkar Handicraft Retail",
    type: "Handicraft Retailer",
    location: "New Delhi",
    demand: "500+ pieces / year",
    orderSize: "100–150 pieces per order",
    contact: "buying@dastkarretail.example",
    about:
      "A multi-city handicraft chain with 9 stores. Places large repeat orders and pays a fixed wholesale rate.",
    interest: { "Home Decor": 92, Textiles: 90, Jewellery: 86, "Kitchen & Dining": 70 },
    reason: {
      "Home Decor": "Decor is its highest-selling shelf across all 9 stores.",
      Textiles: "Runs a dedicated handloom section every winter.",
      Jewellery: "Silver craft jewellery sells fast at its Delhi stores.",
      "Kitchen & Dining": "Stocks serving ware around festival season.",
    },
  },
  {
    id: "studio-neelam",
    name: "Studio Neelam Interiors",
    type: "Interior Designer",
    location: "Mumbai, Maharashtra",
    demand: "60–90 pieces / year",
    orderSize: "10–25 pieces per project",
    contact: "neelam@studioneelam.example",
    about:
      "Designs homes and cafes with an India-craft brief. Orders small, specific batches and pays a premium for one-of-a-kind work.",
    interest: { "Home Decor": 94, Textiles: 80, Jewellery: 22, "Kitchen & Dining": 76 },
    reason: {
      "Home Decor": "Every project brief asks for handmade decor accents.",
      Textiles: "Uses handwoven fabric for soft furnishing.",
      Jewellery: "Rarely sources jewellery for interior projects.",
      "Kitchen & Dining": "Specifies craft tableware for cafe projects.",
    },
  },
  {
    id: "rangoli-gifts",
    name: "Rangoli Gift Shop",
    type: "Gift Shop",
    location: "Bengaluru, Karnataka",
    demand: "300 pieces / year",
    orderSize: "30–50 pieces per order",
    contact: "hello@rangoligifts.example",
    about: "A walk-in gift store near a tourist strip. Wants low-price, ready-to-pack items.",
    interest: { "Home Decor": 84, Textiles: 62, Jewellery: 90, "Kitchen & Dining": 66 },
    reason: {
      "Home Decor": "Small decor pieces are its top tourist buy.",
      Textiles: "Stocks scarves and stoles in limited numbers.",
      Jewellery: "Silver jewellery is the fastest-moving gift here.",
      "Kitchen & Dining": "Sells small serving items as wedding gifts.",
    },
  },
  {
    id: "prayaan-gifting",
    name: "Prayaan Corporate Gifting",
    type: "Corporate Gifting Company",
    location: "Gurugram, Haryana",
    demand: "1,000+ pieces / year",
    orderSize: "200–500 pieces per order",
    contact: "orders@prayaangifting.example",
    about:
      "Builds Diwali and joining-kit gift sets for IT companies. Needs volume and a fixed delivery date.",
    interest: { "Home Decor": 88, Textiles: 78, Jewellery: 58, "Kitchen & Dining": 92 },
    reason: {
      "Home Decor": "Puts craft decor in its premium Diwali gift boxes.",
      Textiles: "Uses shawls in senior-employee gift sets.",
      Jewellery: "Jewellery is hard to size for bulk corporate gifts.",
      "Kitchen & Dining": "Serving sets are its most repeated gift item.",
    },
  },
  {
    id: "bharat-wholesale",
    name: "Bharat Craft Wholesale",
    type: "Wholesale Distributor",
    location: "Ahmedabad, Gujarat",
    demand: "2,000+ pieces / year",
    orderSize: "300–800 pieces per order",
    contact: "purchase@bharatcraftwholesale.example",
    about:
      "Supplies craft shops across west India. Buys at wholesale rate only, but the orders are the largest on this list.",
    interest: { "Home Decor": 86, Textiles: 84, Jewellery: 72, "Kitchen & Dining": 80 },
    reason: {
      "Home Decor": "Moves decor stock to 60+ shops across west India.",
      Textiles: "Handloom is a steady year-round line for them.",
      Jewellery: "Takes silver stock in bulk when the price is right.",
      "Kitchen & Dining": "Supplies serving ware to shops and hotels.",
    },
  },
  {
    id: "kalaghar-export",
    name: "Kalaghar Export House",
    type: "Export House",
    location: "Kochi, Kerala",
    demand: "800 pieces / year",
    orderSize: "150–300 pieces per order",
    contact: "sourcing@kalagharexport.example",
    about:
      "Exports Indian craft to Europe. Asks for GI proof and consistent finish, and pays above local rates.",
    interest: { "Home Decor": 82, Textiles: 94, Jewellery: 80, "Kitchen & Dining": 64 },
    reason: {
      "Home Decor": "European buyers ask for handmade Indian decor.",
      Textiles: "Pashmina and handloom sell strongest in its EU market.",
      Jewellery: "Silver craft has a steady export demand.",
      "Kitchen & Dining": "Ships limited tableware due to breakage risk.",
    },
  },
  {
    id: "chai-kissa",
    name: "Chai Kissa Cafe Group",
    type: "Cafe Chain",
    location: "Pune, Maharashtra",
    demand: "250 pieces / year",
    orderSize: "50–80 pieces per order",
    contact: "supply@chaikissa.example",
    about: "Eleven cafes styled around regional Indian craft. Replaces serving ware every 8 months.",
    interest: { "Home Decor": 78, Textiles: 48, Jewellery: 16, "Kitchen & Dining": 94 },
    reason: {
      "Home Decor": "Uses craft pieces on wall shelves in every cafe.",
      Textiles: "Only needs fabric for a few seating covers.",
      Jewellery: "Does not retail jewellery.",
      "Kitchen & Dining": "Serving trays and cups are replaced twice a year.",
    },
  },
];

export const CATEGORIES = ["Home Decor", "Textiles", "Jewellery", "Kitchen & Dining"];

export type BuyerMatch = { buyer: Buyer; score: number; reason: string };

export function matchBuyers(category: string): BuyerMatch[] {
  return BUYERS.map((buyer) => ({
    buyer,
    score: buyer.interest[category] ?? 55,
    reason:
      buyer.reason[category] ?? `Open to new ${category.toLowerCase()} suppliers this year.`,
  })).sort((a, b) => b.score - a.score);
}

function charmPrice(value: number) {
  const rounded = Math.round(value / 10) * 10;
  return Math.max(49, rounded - 1);
}

export function calculatePrice(materialCost: number, labourCost: number) {
  const production = Math.max(0, materialCost) + Math.max(0, labourCost);
  const retail = charmPrice(production * 1.6);
  const wholesale = Math.round(production * 1.3);
  return {
    production,
    retail,
    wholesale,
    rangeLow: Math.round(retail * 0.77),
    rangeHigh: Math.round(retail * 1.08),
  };
}

export function formatRupees(value: number) {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

export const SEED_PRODUCTS: Product[] = [
  {
    id: "seed-1",
    name: "Blue Pottery Tea Set",
    craft: "Jaipur Blue Pottery",
    category: "Kitchen & Dining",
    material: "Quartz powder, glaze, cobalt oxide",
    title: "Jaipur Blue Pottery Tea Set — 6 Cups with Tray",
    description:
      "A six-cup tea set hand-painted in the Jaipur blue pottery style, with a matching glazed tray. Fired once at low heat, lead-free and safe for hot tea.",
    tags: ["Blue Pottery", "Jaipur", "Tea Set", "Handmade", "Kitchen"],
    confidence: 93,
    status: "published",
    icon: "pot",
    materialCost: 780,
    labourCost: 1120,
    makingTime: "6 days",
    size: "Tray 14 in, cups 3 in",
    retail: 3039,
    wholesale: 2470,
    createdAt: "2026-08-14",
  },
  {
    id: "seed-2",
    name: "Carved Wooden Wall Panel",
    craft: "Saharanpur Wood Carving",
    category: "Home Decor",
    material: "Seasoned sheesham wood, natural wax polish",
    title: "Hand-Carved Sheesham Wall Panel — Floral Jaali, 24 inch",
    description:
      "A hand-carved sheesham wall panel with deep floral jaali work, finished in natural wax. Comes ready to mount.",
    tags: ["Wood Carving", "Saharanpur", "Wall Decor", "Sheesham", "Handmade"],
    confidence: 88,
    status: "draft",
    icon: "wood",
    materialCost: 1450,
    labourCost: 2200,
    makingTime: "9 days",
    size: "24 in x 18 in",
    retail: 5839,
    wholesale: 4745,
    createdAt: "2026-08-29",
  },
];
