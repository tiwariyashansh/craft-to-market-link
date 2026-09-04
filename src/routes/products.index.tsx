import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/karigar/AppShell";
import { ProductThumb } from "@/components/karigar/CraftIcon";
import { StatusBadge } from "@/components/karigar/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatRupees, type ProductStatus } from "@/lib/karigar/data";
import { useKarigar } from "@/lib/karigar/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "My products — KarigarSetu" },
      {
        name: "description",
        content: "All your craft listings in one place — drafts, AI-ready listings and published products.",
      },
      { property: "og:title", content: "My products — KarigarSetu" },
      {
        property: "og:description",
        content: "All your craft listings — drafts, AI-ready and published.",
      },
    ],
  }),
  component: MyProducts,
});

const TABS: { key: "all" | ProductStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "draft", label: "Drafts" },
  { key: "catalog", label: "AI Catalog Ready" },
  { key: "published", label: "Published" },
];

function MyProducts() {
  const navigate = useNavigate();
  const { products, setStatus, startDraft } = useKarigar();
  const [tab, setTab] = useState<"all" | ProductStatus>("all");
  const list = tab === "all" ? products : products.filter((p) => p.status === tab);

  return (
    <AppShell
      title="My products"
      subtitle={`${products.length} products in your account.`}
      action={
        <Button asChild className="hidden md:inline-flex">
          <Link to="/add">
            <Plus className="mr-1 h-4 w-4" /> Add New Product
          </Link>
        </Button>
      }
    >
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              tab === t.key
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="card-craft mt-6 p-10 text-center">
          <p className="text-muted-foreground">Nothing here yet.</p>
          <Button className="mt-4" asChild>
            <Link to="/add">Add a product</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <div key={p.id} className="card-craft flex flex-col overflow-hidden">
              <ProductThumb
                icon={p.icon}
                photo={p.photo}
                alt={p.name}
                className="h-40 w-full rounded-none border-0 border-b"
              />
              <div className="flex flex-1 flex-col p-4">
                <StatusBadge status={p.status} className="w-fit" />
                <h2 className="mt-2 font-display text-base leading-snug font-semibold">{p.name}</h2>
                <p className="text-sm text-muted-foreground">{p.category}</p>
                <p className="mt-2 font-display text-lg font-semibold">{formatRupees(p.retail)}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to="/products/$id" params={{ id: p.id }}>
                      View
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      startDraft({ ...p });
                      navigate({ to: "/catalog" });
                    }}
                  >
                    Edit
                  </Button>
                  {p.status !== "published" && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setStatus(p.id, "published");
                        toast.success(`${p.name} is now published.`);
                      }}
                    >
                      Publish
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button asChild size="lg" className="mt-6 w-full md:hidden">
        <Link to="/add">
          <Plus className="mr-1 h-4 w-4" /> Add New Product
        </Link>
      </Button>
    </AppShell>
  );
}
