import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, Check, Loader2, Sparkles, Upload } from "lucide-react";
import { AppShell } from "@/components/karigar/AppShell";
import { CraftIcon } from "@/components/karigar/CraftIcon";
import { Button } from "@/components/ui/button";
import { AI_TEMPLATES } from "@/lib/karigar/data";
import { fromTemplate, useKarigar } from "@/lib/karigar/store";

export const Route = createFileRoute("/add/photo")({
  head: () => ({
    meta: [
      { title: "Upload a photo — KarigarSetu" },
      {
        name: "description",
        content:
          "Upload one photo of your craft and let KarigarSetu detect the product, craft and material for you.",
      },
      { property: "og:title", content: "Upload a photo — KarigarSetu" },
      {
        property: "og:description",
        content: "Upload one photo and let KarigarSetu write the listing.",
      },
    ],
  }),
  component: PhotoStep,
});

const STAGES = [
  "Detecting product…",
  "Identifying craft & material…",
  "Estimating size and making time…",
  "Writing description…",
];

let templateCursor = 0;

function PhotoStep() {
  const navigate = useNavigate();
  const { startDraft } = useKarigar();
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | undefined>();
  const [demo, setDemo] = useState(false);
  const [stage, setStage] = useState(-1);
  const running = stage >= 0;

  useEffect(() => {
    if (!running) return;
    if (stage >= STAGES.length) {
      const template = AI_TEMPLATES[templateCursor++ % AI_TEMPLATES.length];
      startDraft(fromTemplate(template, photo));
      const t = setTimeout(() => navigate({ to: "/catalog" }), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStage((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [stage, running, navigate, startDraft, photo]);

  const ready = Boolean(photo) || demo;

  return (
    <AppShell title="Upload a photo" subtitle="One clear picture is enough.">
      <div className="mx-auto max-w-xl">
        <div className="card-craft p-5">
          <div className="stitch-border flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-primary-soft/40">
            {photo ? (
              <img src={photo} alt="Your product" className="h-full w-full object-cover" />
            ) : demo ? (
              <div className="w-40 text-primary">
                <CraftIcon icon="pot" />
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <Camera className="mx-auto h-10 w-10" strokeWidth={1.4} />
                <p className="mt-2 text-sm">No photo yet</p>
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setDemo(false);
              setPhoto(URL.createObjectURL(file));
            }}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Button variant="outline" size="lg" onClick={() => fileRef.current?.click()}>
              <Upload className="mr-1 h-4 w-4" /> Choose a photo
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                setPhoto(undefined);
                setDemo(true);
              }}
            >
              Use Demo Photo
            </Button>
          </div>

          <Button
            size="lg"
            className="mt-3 w-full"
            disabled={!ready || running}
            onClick={() => setStage(0)}
          >
            {running ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-1 h-4 w-4" />
            )}
            {running ? "Analysing…" : "Analyze with AI"}
          </Button>
          {!ready && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Add a photo, or tap "Use Demo Photo" to see how it works.
            </p>
          )}
        </div>

        {running && (
          <div className="card-craft mt-4 p-5">
            <ul className="space-y-3">
              {STAGES.map((label, i) => {
                const done = stage > i;
                const active = stage === i;
                return (
                  <li key={label} className="flex items-center gap-3">
                    <span
                      className={
                        done
                          ? "flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground"
                          : active
                            ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
                            : "flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground"
                      }
                    >
                      {done ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : active ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <span className="text-[11px]">{i + 1}</span>
                      )}
                    </span>
                    <span
                      className={
                        done || active ? "text-sm font-medium" : "text-sm text-muted-foreground"
                      }
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </AppShell>
  );
}
