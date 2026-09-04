import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Save, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/karigar/AppShell";
import { ProductThumb } from "@/components/karigar/CraftIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/karigar/data";
import { useKarigar } from "@/lib/karigar/store";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Check your AI listing — KarigarSetu" },
      {
        name: "description",
        content:
          "Read what the AI wrote about your craft, change anything that is wrong, then move on to pricing.",
      },
      { property: "og:title", content: "Check your AI listing — KarigarSetu" },
      {
        property: "og:description",
        content: "Read and fix the AI listing before you price your product.",
      },
    ],
  }),
  component: CatalogStep,
});

function CatalogStep() {
  const navigate = useNavigate();
  const { draft, updateDraft, saveDraft } = useKarigar();
  const [newTag, setNewTag] = useState("");

  if (!draft) {
    return (
      <AppShell title="Nothing to review yet">
        <div className="card-craft mx-auto max-w-md p-6 text-center">
          <p className="text-muted-foreground">
            Add a product first and the AI listing will show up here.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/add">Add a product</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const tags = draft.tags ?? [];
  const confidence = draft.confidence ?? 85;

  return (
    <AppShell title="Check your listing" subtitle="The AI wrote this. Change anything that is wrong.">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="card-craft flex items-center gap-4 p-4">
          <ProductThumb
            icon={draft.icon}
            photo={draft.photo}
            alt={draft.name ?? "Product"}
            className="h-20 w-20 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-clay">AI confidence</p>
              <p className="font-display text-lg font-semibold">{confidence}%</p>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${confidence}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Anything below 100% is worth a quick read before you publish.
            </p>
          </div>
        </div>

        <div className="card-craft space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="pname">Product Name</Label>
              <Input
                id="pname"
                className="mt-1.5"
                value={draft.name ?? ""}
                onChange={(e) => updateDraft({ name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="pcraft">Craft Type</Label>
              <Input
                id="pcraft"
                className="mt-1.5"
                value={draft.craft ?? ""}
                onChange={(e) => updateDraft({ craft: e.target.value })}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={draft.category ?? "Home Decor"}
                onValueChange={(v) => updateDraft({ category: v })}
              >
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="pmat">Material</Label>
              <Input
                id="pmat"
                className="mt-1.5"
                value={draft.material ?? ""}
                onChange={(e) => updateDraft({ material: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ptitle">Suggested Title</Label>
            <Input
              id="ptitle"
              className="mt-1.5"
              value={draft.title ?? ""}
              onChange={(e) => updateDraft({ title: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="pdesc">Description</Label>
            <Textarea
              id="pdesc"
              rows={7}
              className="mt-1.5 leading-relaxed"
              value={draft.description ?? ""}
              onChange={(e) => updateDraft({ description: e.target.value })}
            />
          </div>

          <div>
            <Label>Tags</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary"
                >
                  {t}
                  <button
                    aria-label={`Remove ${t}`}
                    onClick={() => updateDraft({ tags: tags.filter((x) => x !== t) })}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTag.trim()) {
                    updateDraft({ tags: [...tags, newTag.trim()] });
                    setNewTag("");
                  }
                }}
              />
              <Button
                variant="outline"
                onClick={() => {
                  if (!newTag.trim()) return;
                  updateDraft({ tags: [...tags, newTag.trim()] });
                  setNewTag("");
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => {
              saveDraft("draft");
              toast.success("Saved as a draft");
              navigate({ to: "/products" });
            }}
          >
            <Save className="mr-1 h-4 w-4" /> Save Draft
          </Button>
          <Button size="lg" className="flex-1" onClick={() => navigate({ to: "/pricing" })}>
            <Sparkles className="mr-1 h-4 w-4" /> Continue to Pricing
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
