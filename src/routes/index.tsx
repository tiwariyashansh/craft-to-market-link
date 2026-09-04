import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Mic, Sparkles, Store, ArrowRight, IndianRupee, Languages } from "lucide-react";
import { Logo } from "@/components/karigar/AppShell";
import { CraftIcon } from "@/components/karigar/CraftIcon";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KarigarSetu — From Traditional Craft to Digital Market" },
      {
        name: "description",
        content:
          "Take a photo or speak about your craft. KarigarSetu writes the listing, suggests a fair price, and finds buyers who want it.",
      },
      { property: "og:title", content: "KarigarSetu — From Traditional Craft to Digital Market" },
      {
        property: "og:description",
        content:
          "Take a photo or speak about your craft. KarigarSetu writes the listing, suggests a fair price, and finds buyers who want it.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  {
    icon: Camera,
    title: "Show your work",
    body: "Take one photo, or just speak about the piece in your own words.",
    tint: "bg-primary-soft text-primary",
  },
  {
    icon: Sparkles,
    title: "AI writes it up",
    body: "A clear title, a full description, tags and a fair price come back in seconds.",
    tint: "bg-gold-soft text-gold-foreground",
  },
  {
    icon: Store,
    title: "Buyers reach you",
    body: "Hotels, shops and gifting companies who want your craft are matched to you.",
    tint: "bg-clay-soft text-clay",
  },
];

function Landing() {
  return (
    <div className="paper-surface min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/login">Try Demo</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-8 pb-16 md:grid-cols-[1.1fr_0.9fr] md:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-foreground">
            <Languages className="h-3.5 w-3.5" /> Works in English and हिंदी
          </span>
          <h1 className="text-balance-tight mt-5 font-display text-4xl leading-[1.08] font-semibold md:text-6xl">
            From traditional craft to <span className="text-primary">digital market</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Give KarigarSetu one photo or a voice note about your work. It writes the listing,
            suggests a fair price, and shows you the buyers who want it — no typing, no English
            needed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/login">
                Try Demo <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Built for Smart India Hackathon · SIH26090 · Ministry of Social Justice &amp;
            Empowerment
          </p>
        </div>

        <div className="relative">
          <div className="card-craft relative overflow-hidden p-6">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 shrink-0 rounded-xl bg-primary-soft p-3 text-primary">
                <CraftIcon icon="pot" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-clay">AI wrote this in 4 seconds</p>
                <p className="mt-1 font-display text-lg leading-snug font-semibold">
                  Hand-Painted Jaipur Blue Pottery Vase — Cobalt Floral, 9 inch
                </p>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  A hand-thrown vase made in the Jaipur blue pottery tradition, where the cobalt
                  floral vines are painted freehand, so no two vases carry the same line.
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Suggested retail price</p>
                <p className="mt-1 flex items-center font-display text-xl font-semibold">
                  <IndianRupee className="h-4 w-4" />
                  1,279
                </p>
              </div>
              <div className="rounded-lg border bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Buyers matched</p>
                <p className="mt-1 font-display text-xl font-semibold">6 of 8</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Blue Pottery", "Jaipur", "Handmade", "Gifting"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute -top-4 -right-3 hidden h-16 w-16 rotate-12 rounded-xl bg-gold-soft p-3 text-gold-foreground shadow-sm md:block">
            <Mic className="h-full w-full" strokeWidth={1.4} />
          </div>
        </div>
      </section>

      <section className="border-y bg-card/60 py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center font-display text-3xl font-semibold">Three steps. That's it.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="card-craft p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.tint}`}>
                  <s.icon className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <p className="mt-4 font-display text-sm font-semibold text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 text-center">
        <h2 className="font-display text-3xl font-semibold">
          Your craft already sells. It just needs to be seen.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Open the demo and add a product the way an artisan would — one photo, a few taps, and a
          list of buyers at the end.
        </p>
        <Button size="lg" className="mt-7" asChild>
          <Link to="/login">
            Try Demo <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        KarigarSetu — a hackathon prototype. Prices and buyers shown are demo data.
      </footer>
    </div>
  );
}
