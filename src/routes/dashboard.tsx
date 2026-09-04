import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Package, CheckCircle2, FileEdit, Users, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/karigar/AppShell";
import { ProductThumb } from "@/components/karigar/CraftIcon";
import { StatusBadge } from "@/components/karigar/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatRupees, matchBuyers } from "@/lib/karigar/data";
import { useKarigar } from "@/lib/karigar/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your workshop dashboard — KarigarSetu" },
      {
        name: "description",
        content:
          "See your products, drafts and how many buyers are interested in your craft, all on one screen.",
      },
      { property: "og:title", content: "Your workshop dashboard — KarigarSetu" },
      {
        property: "og:description",
        content: "See your products, drafts and interested buyers on one screen.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { products, artisanName } = useKarigar();
  const published = products.filter((p) => p.status === "published").length;
  const drafts = products.filter((p) => p.status !== "published").length;
  const topCategory = products[0]?.category ?? "Home Decor";
  const matches = matchBuyers(topCategory).filter((m) => m.score >= 75);

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, tint: "bg-primary-soft text-primary" },
    { label: "Published", value: published, icon: CheckCircle2, tint: "bg-success/12 text-success" },
    { label: "Drafts", value: drafts, icon: FileEdit, tint: "bg-clay-soft text-clay" },
    { label: "Potential Buyers", value: matches.length, icon: Users, tint: "bg-gold-soft text-gold-foreground" },
  ];

  return (
    <AppShell
      title={`Namaste, ${artisanName}`}
      subtitle="Here is how your work is doing today."
      action={
        <Button asChild className="hidden md:inline-flex">
          <Link to="/add">
            <Plus className="mr-1 h-4 w-4" /> Add New Product
          </Link>
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card-craft p-4">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.tint}`}>
              <s.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
            </div>
            <p className="mt-3 font-display text-3xl font-semibold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <Button asChild size="lg" className="mt-5 w-full md:hidden">
        <Link to="/add">
          <Plus className="mr-1 h-4 w-4" /> Add New Product
        </Link>
      </Button>

      <div className="card-craft mt-6 overflow-hidden">
        <div className="indigo-panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">
              {matches.length} buyers are interested in your {topCategory.toLowerCase()}
            </p>
            <p className="mt-1 text-sm opacity-85">
              {matches[0]?.buyer.name} in {matches[0]?.buyer.location} is the closest match at{" "}
              {matches[0]?.score}%.
            </p>
          </div>
          <Button variant="secondary" asChild className="shrink-0">
            <Link to="/buyers">
              See buyers <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Recent products</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">
            See all
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {products.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to="/products/$id"
              params={{ id: p.id }}
              className="card-craft flex items-center gap-4 p-3 transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <ProductThumb icon={p.icon} photo={p.photo} alt={p.name} className="h-16 w-16 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {p.category} · {formatRupees(p.retail)}
                </p>
              </div>
              <StatusBadge status={p.status} />
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
