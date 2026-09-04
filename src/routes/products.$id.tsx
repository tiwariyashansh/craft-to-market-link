import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Users, EyeOff, Upload } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/karigar/AppShell";
import { ProductThumb } from "@/components/karigar/CraftIcon";
import { StatusBadge } from "@/components/karigar/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatRupees, matchBuyers } from "@/lib/karigar/data";
import { useKarigar } from "@/lib/karigar/store";

export const Route = createFileRoute("/products/$id")({
  head: () => ({
    meta: [
      { title: "Product details — KarigarSetu" },
      {
        name: "description",
        content: "See your listing the way a buyer sees it, then edit, publish or unpublish it.",
      },
      { property: "og:title", content: "Product details — KarigarSetu" },
      {
        property: "og:description",
        content: "See your listing the way a buyer sees it.",
      },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { getProduct, setStatus, startDraft } = useKarigar();
  const product = getProduct(id);

  if (!product) {
    return (
      <AppShell title="Product not found">
        <div className="card-craft mx-auto max-w-md p-6 text-center">
          <p className="text-muted-foreground">This product is no longer in your account.</p>
          <Button className="mt-4" asChild>
            <Link to="/products">Back to my products</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const matched = matchBuyers(product.category).filter((m) => m.score >= 70).length;
  const facts = [
    ["Craft", product.craft],
    ["Category", product.category],
    ["Material", product.material],
    ["Size", product.size],
    ["Making time", product.makingTime],
    ["Wholesale price", formatRupees(product.wholesale)],
  ] as const;

  return (
    <AppShell title={product.name} subtitle="This is how a buyer sees your listing.">
      <Link
        to="/products"
        className="mb-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> My products
      </Link>

      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <ProductThumb
          icon={product.icon}
          photo={product.photo}
          alt={product.name}
          className="aspect-4/3 w-full"
        />

        <div>
          <StatusBadge status={product.status} />
          <h2 className="mt-3 font-display text-2xl leading-snug font-semibold">{product.title}</h2>
          <p className="mt-2 font-display text-3xl font-semibold text-primary">
            {formatRupees(product.retail)}
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="card-craft mt-6 divide-y">
        {facts.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-right text-sm font-semibold">{value || "—"}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => {
            startDraft({ ...product });
            navigate({ to: "/catalog" });
          }}
        >
          <Pencil className="mr-1 h-4 w-4" /> Edit
        </Button>
        {product.status === "published" ? (
          <Button
            variant="outline"
            onClick={() => {
              setStatus(product.id, "draft");
              toast.success("This product is no longer shown to buyers.");
            }}
          >
            <EyeOff className="mr-1 h-4 w-4" /> Unpublish
          </Button>
        ) : (
          <Button
            onClick={() => {
              setStatus(product.id, "published");
              toast.success(`${product.name} is now published.`);
            }}
          >
            <Upload className="mr-1 h-4 w-4" /> Publish Product
          </Button>
        )}
        <Button variant="secondary" asChild>
          <Link to="/buyers">
            <Users className="mr-1 h-4 w-4" /> {matched} matched buyers
          </Link>
        </Button>
      </div>
    </AppShell>
  );
}
