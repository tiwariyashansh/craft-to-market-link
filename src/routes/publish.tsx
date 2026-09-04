import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Users } from "lucide-react";
import { AppShell } from "@/components/karigar/AppShell";
import { ProductThumb } from "@/components/karigar/CraftIcon";
import { Button } from "@/components/ui/button";
import { formatRupees, matchBuyers } from "@/lib/karigar/data";
import { useKarigar } from "@/lib/karigar/store";

export const Route = createFileRoute("/publish")({
  head: () => ({
    meta: [
      { title: "Publish your product — KarigarSetu" },
      {
        name: "description",
        content:
          "Check the photo, title, price and matched buyers one last time, then publish your product.",
      },
      { property: "og:title", content: "Publish your product — KarigarSetu" },
      {
        property: "og:description",
        content: "Check your listing one last time, then publish it.",
      },
    ],
  }),
  component: PublishStep,
});

function PublishStep() {
  const navigate = useNavigate();
  const { draft, saveDraft, clearDraft } = useKarigar();
  const [done, setDone] = useState(false);

  if (!draft) {
    return (
      <AppShell title="Nothing to publish yet">
        <div className="card-craft mx-auto max-w-md p-6 text-center">
          <p className="text-muted-foreground">Add a product first, then publish it from here.</p>
          <Button className="mt-4" asChild>
            <Link to="/add">Add a product</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const matched = matchBuyers(draft.category ?? "Home Decor").filter((m) => m.score >= 70).length;

  if (done) {
    return (
      <AppShell title="Published" subtitle="Your product is live for buyers to see.">
        <div className="card-craft mx-auto max-w-md p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/12 text-success">
            <CheckCircle2 className="h-9 w-9" strokeWidth={1.6} />
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold">Your product is published</h2>
          <p className="mt-2 text-muted-foreground">
            {matched} buyers can now see {draft.name}. We will tell you when one of them replies.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button
              size="lg"
              onClick={() => {
                clearDraft();
                navigate({ to: "/products" });
              }}
            >
              See My Products
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/buyers">
                <Users className="mr-1 h-4 w-4" /> Contact the buyers
              </Link>
            </Button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Ready to publish" subtitle="One last look before buyers see it.">
      <div className="mx-auto max-w-lg">
        <div className="card-craft overflow-hidden">
          <ProductThumb
            icon={draft.icon}
            photo={draft.photo}
            alt={draft.name ?? "Product"}
            className="h-56 w-full rounded-none border-0 border-b"
          />
          <div className="p-5">
            <p className="text-xs font-semibold text-clay">{draft.craft}</p>
            <h2 className="mt-1 font-display text-xl leading-snug font-semibold">{draft.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{draft.description}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Retail price</p>
                <p className="mt-0.5 font-display text-xl font-semibold">
                  {formatRupees(draft.retail ?? 0)}
                </p>
              </div>
              <div className="rounded-lg border bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Buyers matched</p>
                <p className="mt-0.5 font-display text-xl font-semibold">{matched}</p>
              </div>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          className="mt-4 w-full"
          onClick={() => {
            saveDraft("published");
            setDone(true);
          }}
        >
          Publish Product
        </Button>
        <Button
          variant="ghost"
          className="mt-2 w-full"
          onClick={() => {
            saveDraft("catalog");
            navigate({ to: "/products" });
          }}
        >
          Not now — keep it saved
        </Button>
      </div>
    </AppShell>
  );
}
