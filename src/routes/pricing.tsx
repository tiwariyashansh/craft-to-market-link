import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Info, Users } from "lucide-react";
import { AppShell } from "@/components/karigar/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculatePrice, formatRupees } from "@/lib/karigar/data";
import { useKarigar } from "@/lib/karigar/store";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "A fair price for your work — KarigarSetu" },
      {
        name: "description",
        content:
          "Enter your material and labour cost and see a suggested retail price, wholesale price and a fair price range.",
      },
      { property: "og:title", content: "A fair price for your work — KarigarSetu" },
      {
        property: "og:description",
        content: "See a suggested retail price, wholesale price and fair range for your craft.",
      },
    ],
  }),
  component: PricingStep,
});

function PricingStep() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useKarigar();

  if (!draft) {
    return (
      <AppShell title="Nothing to price yet">
        <div className="card-craft mx-auto max-w-md p-6 text-center">
          <p className="text-muted-foreground">Add a product first, then come back to price it.</p>
          <Button className="mt-4" asChild>
            <Link to="/add">Add a product</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const material = draft.materialCost ?? 0;
  const labour = draft.labourCost ?? 0;
  const price = calculatePrice(material, labour);

  const rows = [
    { label: "Production Cost", value: price.production, note: "Material + labour" },
    { label: "Suggested Retail Price", value: price.retail, note: "What a shopper pays", big: true },
    { label: "Suggested Wholesale Price", value: price.wholesale, note: "What a bulk buyer pays" },
  ];

  return (
    <AppShell title="Price your product" subtitle="Tell us your costs and we'll suggest a fair price.">
      <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
        <div className="card-craft space-y-4 p-5">
          <div>
            <Label htmlFor="mcost">Material Cost (₹)</Label>
            <Input
              id="mcost"
              inputMode="numeric"
              className="mt-1.5"
              value={material || ""}
              placeholder="0"
              onChange={(e) => updateDraft({ materialCost: Number(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="lcost">Labour Cost (₹)</Label>
            <Input
              id="lcost"
              inputMode="numeric"
              className="mt-1.5"
              value={labour || ""}
              placeholder="0"
              onChange={(e) => updateDraft({ labourCost: Number(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="mtime">Making Time</Label>
            <Input
              id="mtime"
              className="mt-1.5"
              placeholder="3 days"
              value={draft.makingTime ?? ""}
              onChange={(e) => updateDraft({ makingTime: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="psize">Size</Label>
            <Input
              id="psize"
              className="mt-1.5"
              placeholder="9 in height"
              value={draft.size ?? ""}
              onChange={(e) => updateDraft({ size: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-craft divide-y p-0">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className={r.big ? "font-semibold" : "text-sm font-medium"}>{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.note}</p>
                </div>
                <p
                  className={
                    r.big
                      ? "font-display text-2xl font-semibold text-primary"
                      : "font-display text-lg font-semibold"
                  }
                >
                  {formatRupees(r.value)}
                </p>
              </div>
            ))}
          </div>

          <div className="card-craft bg-gold-soft p-5">
            <p className="text-sm font-semibold text-gold-foreground">Recommended Range</p>
            <p className="mt-1 font-display text-2xl font-semibold">
              {formatRupees(price.rangeLow)} – {formatRupees(price.rangeHigh)}
            </p>
            <p className="mt-1 text-xs text-gold-foreground">
              Sell inside this range and you still cover your costs.
            </p>
          </div>

          <p className="flex gap-2 rounded-lg border bg-card p-3 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0" />
            This is an AI-assisted estimate based on your costs. It is not a guaranteed price — the
            final price is always yours to decide.
          </p>

          <Button
            size="lg"
            className="w-full"
            disabled={price.production <= 0}
            onClick={() => {
              updateDraft({ retail: price.retail, wholesale: price.wholesale });
              navigate({ to: "/buyers" });
            }}
          >
            <Users className="mr-1 h-4 w-4" /> Find Buyers
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
