import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MapPin, TrendingUp, ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/karigar/AppShell";
import { Button } from "@/components/ui/button";
import { matchBuyers } from "@/lib/karigar/data";
import { useKarigar } from "@/lib/karigar/store";

export const Route = createFileRoute("/buyers/")({
  head: () => ({
    meta: [
      { title: "Buyers who want your craft — KarigarSetu" },
      {
        name: "description",
        content:
          "Hotels, retailers, gift shops and gifting companies matched to your product, sorted by how well they fit.",
      },
      { property: "og:title", content: "Buyers who want your craft — KarigarSetu" },
      {
        property: "og:description",
        content: "See matched hotels, retailers and gifting companies for your product.",
      },
    ],
  }),
  component: BuyersPage,
});

function BuyersPage() {
  const navigate = useNavigate();
  const { draft, products } = useKarigar();
  const category = draft?.category ?? products[0]?.category ?? "Home Decor";
  const productName = draft?.name ?? products[0]?.name ?? "your craft";
  const matches = matchBuyers(category);

  return (
    <AppShell
      title="Buyers for your product"
      subtitle={`${matches.length} buyers matched to ${productName} (${category}).`}
      action={
        draft ? (
          <Button className="hidden md:inline-flex" onClick={() => navigate({ to: "/publish" })}>
            Continue to Publish <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : undefined
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {matches.map(({ buyer, score, reason }) => (
          <div key={buyer.id} className="card-craft flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-clay">{buyer.type}</p>
                <h2 className="mt-0.5 font-display text-lg leading-snug font-semibold">
                  {buyer.name}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {buyer.location}
                </p>
              </div>
              <div className="shrink-0 rounded-xl bg-primary-soft px-3 py-2 text-center">
                <p className="font-display text-xl leading-none font-semibold text-primary">
                  {score}%
                </p>
                <p className="mt-1 text-[10px] font-semibold text-primary/80">match</p>
              </div>
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-sm">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">Estimated demand:</span>
              <span className="font-semibold">{buyer.demand}</span>
            </p>

            <p className="mt-2 rounded-lg bg-secondary/70 p-3 text-sm text-muted-foreground">
              Why this matches: {reason}
            </p>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/buyers/$id" params={{ id: buyer.id }}>
                  View Buyer
                </Link>
              </Button>
              <Button
                className="flex-1"
                onClick={() => toast.success(`Your details were sent to ${buyer.name}.`)}
              >
                <Send className="mr-1 h-4 w-4" /> Contact Buyer
              </Button>
            </div>
          </div>
        ))}
      </div>

      {draft && (
        <Button
          size="lg"
          className="mt-6 w-full md:hidden"
          onClick={() => navigate({ to: "/publish" })}
        >
          Continue to Publish <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      )}
    </AppShell>
  );
}
