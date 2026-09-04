import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/karigar/AppShell";
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

export const Route = createFileRoute("/add/manual")({
  head: () => ({
    meta: [
      { title: "Type your product details — KarigarSetu" },
      {
        name: "description",
        content: "Enter the name, craft, material and size of your product yourself.",
      },
      { property: "og:title", content: "Type your product details — KarigarSetu" },
      {
        property: "og:description",
        content: "Enter your product name, craft, material and size yourself.",
      },
    ],
  }),
  component: ManualStep,
});

function ManualStep() {
  const navigate = useNavigate();
  const { startDraft } = useKarigar();
  const [form, setForm] = useState({
    name: "",
    craft: "",
    category: "Home Decor",
    material: "",
    size: "",
    makingTime: "",
    description: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AppShell title="Type the details" subtitle="Fill in what you know. You can change it later.">
      <div className="card-craft mx-auto max-w-xl space-y-4 p-5">
        <div>
          <Label htmlFor="name">Product name</Label>
          <Input
            id="name"
            className="mt-1.5"
            placeholder="Blue pottery flower vase"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="craft">Craft type</Label>
            <Input
              id="craft"
              className="mt-1.5"
              placeholder="Jaipur blue pottery"
              value={form.craft}
              onChange={(e) => set("craft")(e.target.value)}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={set("category")}>
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
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              className="mt-1.5"
              placeholder="Quartz powder, glaze"
              value={form.material}
              onChange={(e) => set("material")(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              className="mt-1.5"
              placeholder="9 in height"
              value={form.size}
              onChange={(e) => set("size")(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="time">Making time</Label>
            <Input
              id="time"
              className="mt-1.5"
              placeholder="3 days"
              value={form.makingTime}
              onChange={(e) => set("makingTime")(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="desc">Tell us about it</Label>
          <Textarea
            id="desc"
            rows={4}
            className="mt-1.5"
            placeholder="How you make it, what makes it special…"
            value={form.description}
            onChange={(e) => set("description")(e.target.value)}
          />
        </div>
        <Button
          size="lg"
          className="w-full"
          disabled={!form.name.trim()}
          onClick={() => {
            startDraft({
              ...form,
              title: form.name,
              tags: [form.craft, form.category].filter(Boolean),
              confidence: 78,
              icon: "pot",
              materialCost: 0,
              labourCost: 0,
              status: "catalog",
            });
            navigate({ to: "/catalog" });
          }}
        >
          Continue <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </AppShell>
  );
}
