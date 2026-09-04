# Karigar Connect

Build a web app called KarigarSetu ("From Traditional Craft to Digital Market") — an AI-powered digital business assistant for marginalized Indian artisans and craftspeople. This is a hackathon prototype (Smart India Hackathon, problem statement SIH26090, Ministry of Social Justice & Empowerment). It needs to look like a polished, professional startup product — NOT a generic e-commerce clone, and NOT a typical SaaS-dashboard template.

Core story to design around

An artisan gives the app a product photo or a voice note. AI turns that into a professional listing (title, description, tags), recommends a fair price, and matches the product to real B2B buyers (hotels, retailers, gift shops, corporate gifting companies). The product should feel warm, human, and craft-rooted — not corporate or cold.

Visual direction

Avoid the generic "AI app" look (no warm-cream-background + terracotta-accent combo, no all-caps eyebrow labels, no generic SaaS card-with-shadow kit).

Palette: deep indigo/blue (inspired by Jaipur blue pottery) as the primary color, a burnt-sienna clay tone as a secondary accent, and a marigold/turmeric gold as a highlight color, on a warm paper-like off-white background with warm near-black text (not pure black).

Typography: pair a warm serif (like Fraunces or Lora) for headings with a clean sans-serif (like Manrope or Work Sans) for body/UI text.

Use simple line-art/icon illustrations for product placeholders instead of stock photos, so it never looks broken with no real image assets.

Mobile-friendly and responsive — artisans will use this on phones.

Screens to build

Landing page — hero headline, one-sentence value prop, "Try Demo" and "Login" buttons, a 3-step visual (Photo/Voice → AI → Buyers).

Login / Demo gate — simple phone number field (mock OTP, no real auth needed) + prominent "Try Demo" button + language toggle (English/Hindi).

Dashboard — greeting, 4 stat cards (Total Products, Published, Drafts, Potential Buyers), "+ Add New Product" CTA, recent products list, a "buyers are interested" nudge card.

Add Product — choose method — 3 large cards: Upload a Photo / Speak About It / Type Details Manually.

Photo upload + AI analysis — upload or "Use Demo Photo," an "Analyze with AI" button that shows a sequential status animation ("Detecting product… Identifying craft & material… Writing description…"), then routes into the catalog screen with realistic AI-generated results.

Voice input — big mic button, live transcript display, extracted structured fields shown as chips (Craft, Location, Making Time, Size), works with the browser's real speech recognition API with a scripted fallback transcript if unavailable/denied so it never fails live.

Smart catalog review — editable AI-generated fields: Product Name, Craft Type, Category, Material, Suggested Title, Description, Tags (chips), an AI Confidence percentage bar. Buttons: Save Draft / Continue to Pricing.

AI price recommendation — inputs for Material Cost, Labour Cost, Making Time, Size; calculates Production Cost, Suggested Retail Price, Suggested Wholesale Price, and a Recommended Range, with a disclaimer that it's an AI-assisted estimate, not guaranteed pricing.

Buyer matching — list of buyer cards (Boutique Hotel, Handicraft Retailer, Interior Designer, Gift Shop, Corporate Gifting Company, Wholesale Distributor) each showing name, location, estimated demand, a match percentage, a one-line "why this matches" explanation, and "View Buyer" / "Contact Buyer" buttons.

Buyer detail — expanded profile of a single buyer with the same info plus a contact action (mock — just show a confirmation, no real messaging).

Publish confirmation — summary card (photo, title, price, number of matched buyers), a "Publish Product" button, and a success state.

My Products — grid of product cards (image, name, category, price, status badge: Draft / AI Catalog Ready / Published) with Edit / View / Publish actions and status filter tabs.

Product detail view — read-only view of a published/draft listing as a buyer would see it, with Edit/Unpublish actions.

Profile — artisan name, craft specialty, location, a mock government scheme registration field, language toggle, logout.

Navigation: a persistent sidebar (desktop) / bottom tab bar (mobile) with Dashboard, My Products, Add Product, Find Buyers, Profile.

Data & AI simulation (important — this is a hackathon demo, not production)

No real backend or database is required — use in-memory/mock state for products and buyers.

Simulate the "AI analysis" using a small set of 4 pre-written realistic result templates (e.g. Jaipur Blue Pottery Vase, Kashmiri Pashmina Shawl, Saharanpur Wood Carving, Odisha Silver Filigree) that get returned after a short delay, so results always look convincing regardless of which photo is uploaded.

Simulate buyer matching with a static list of 6–8 mock buyers, each with a weighted interest score per product category, producing a sorted match percentage list.

Price calculation formula: production cost = material cost + labour cost; suggested retail = round(production × 1.6) rounded to a charm price; suggested wholesale = production × 1.3; recommended range = retail × 0.77 to retail × 1.08.

Seed 2 example products already in the account so the Dashboard and My Products aren't empty on first load.

Do not build payments, shipping, real authentication, or a real buyer messaging system — everything user-facing in those areas should be a lightweight confirmation/toast instead.

Tone & copy

Plain, warm, practical language throughout — this app is for users with limited digital literacy and limited English. Buttons say exactly what they do ("Publish Product," not "Submit"). No jargon. No filler phrases.

Priorities if you have to cut scope

Must-have: Landing → Demo → Dashboard → Add Product (photo path) → AI Analysis → Catalog → Price → Buyer Matching → Publish → My Products. Nice-to-have if time allows: Voice input, buyer detail screen, profile screen, language toggle.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/11103241-267f-4e38-b33e-825dfe069563).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
