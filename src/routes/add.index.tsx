import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Mic, Keyboard, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/karigar/AppShell";

export const Route = createFileRoute("/add/")({
  head: () => ({
    meta: [
      { title: "Add a product — KarigarSetu" },
      {
        name: "description",
        content:
          "Add your craft with a photo, by speaking about it, or by typing the details yourself.",
      },
      { property: "og:title", content: "Add a product — KarigarSetu" },
      {
        property: "og:description",
        content: "Add your craft with a photo, your voice, or typed details.",
      },
    ],
  }),
  component: AddChooser,
});

const OPTIONS = [
  {
    to: "/add/photo" as const,
    icon: Camera,
    title: "Upload a Photo",
    body: "Take one clear picture. We work out what it is and write the listing for you.",
    badge: "Fastest",
    tint: "bg-primary-soft text-primary",
  },
  {
    to: "/add/voice" as const,
    icon: Mic,
    title: "Speak About It",
    body: "Say what you made, in your own words. No typing at all.",
    badge: "No typing",
    tint: "bg-gold-soft text-gold-foreground",
  },
  {
    to: "/add/manual" as const,
    icon: Keyboard,
    title: "Type Details Manually",
    body: "Fill in the details yourself if you already know them.",
    badge: "Full control",
    tint: "bg-clay-soft text-clay",
  },
];

function AddChooser() {
  return (
    <AppShell title="Add a product" subtitle="Choose the way that is easiest for you.">
      <div className="grid gap-4 md:grid-cols-3">
        {OPTIONS.map((o) => (
          <Link
            key={o.to}
            to={o.to}
            className="card-craft group flex flex-col p-6 transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${o.tint}`}>
              <o.icon className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <span className="mt-4 w-fit rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {o.badge}
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold">{o.title}</h2>
            <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{o.body}</p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
              Start <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
