import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, Mail, MapPin, Package, Send, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/karigar/AppShell";
import { Button } from "@/components/ui/button";
import { BUYERS } from "@/lib/karigar/data";
import { useKarigar } from "@/lib/karigar/store";

export const Route = createFileRoute("/buyers/$id")({
  head: () => ({
    meta: [
      { title: "Buyer profile — KarigarSetu" },
      {
        name: "description",
        content:
          "See what this buyer orders, how much they need each year, and reach out with one tap.",
      },
      { property: "og:title", content: "Buyer profile — KarigarSetu" },
      {
        property: "og:description",
        content: "See what this buyer orders and reach out with one tap.",
      },
    ],
  }),
  component: BuyerDetail,
});

function BuyerDetail() {
  const { id } = Route.useParams();
  const { draft, products } = useKarigar();
  const buyer = BUYERS.find((b) => b.id === id);
  const category = draft?.category ?? products[0]?.category ?? "Home Decor";

  if (!buyer) {
    return (
      <AppShell title="Buyer not found">
        <div className="card-craft mx-auto max-w-md p-6 text-center">
          <p className="text-muted-foreground">We couldn't find this buyer.</p>
          <Button className="mt-4" asChild>
            <Link to="/buyers">Back to buyers</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const score = buyer.interest[category] ?? 55;
  const reason = buyer.reason[category] ?? "Open to new suppliers this year.";

  const facts = [
    { icon: Building2, label: "Buyer type", value: buyer.type },
    { icon: MapPin, label: "Location", value: buyer.location },
    { icon: TrendingUp, label: "Estimated demand", value: buyer.demand },
    { icon: Package, label: "Typical order size", value: buyer.orderSize },
    { icon: Mail, label: "Contact", value: buyer.contact },
  ];

  return (
    <AppShell title={buyer.name} subtitle={buyer.type}>
      <Link
        to="/buyers"
        className="mb-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> All buyers
      </Link>

      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="card-craft p-6">
          <p className="text-base leading-relaxed">{buyer.about}</p>
          <div className="mt-5 divide-y border-t">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center gap-3 py-3">
                <f.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{f.label}</span>
                <span className="ml-auto text-right text-sm font-semibold">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="indigo-panel card-craft p-6">
            <p className="text-sm opacity-85">Match with your {category.toLowerCase()}</p>
            <p className="mt-1 font-display text-5xl font-semibold">{score}%</p>
            <p className="mt-3 text-sm opacity-90">{reason}</p>
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={() =>
              toast.success(`Your product details were sent to ${buyer.name}. They will call you.`)
            }
          >
            <Send className="mr-1 h-4 w-4" /> Contact Buyer
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Demo only — nothing is actually sent.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
