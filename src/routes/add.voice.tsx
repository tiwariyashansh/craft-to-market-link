import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, Sparkles, Square } from "lucide-react";
import { AppShell } from "@/components/karigar/AppShell";
import { Button } from "@/components/ui/button";
import { AI_TEMPLATES } from "@/lib/karigar/data";
import { fromTemplate, useKarigar } from "@/lib/karigar/store";

export const Route = createFileRoute("/add/voice")({
  head: () => ({
    meta: [
      { title: "Speak about your craft — KarigarSetu" },
      {
        name: "description",
        content:
          "Describe your product out loud. KarigarSetu writes down what you say and pulls out the craft, place, time and size.",
      },
      { property: "og:title", content: "Speak about your craft — KarigarSetu" },
      {
        property: "og:description",
        content: "Describe your product out loud and let KarigarSetu do the writing.",
      },
    ],
  }),
  component: VoiceStep,
});

const FALLBACK =
  "Main Jaipur se hoon. Yeh blue pottery ka phool wala guldasta hai, nau inch ka. Quartz powder aur cobalt colour se banaya hai, teen din laga.";

const CHIPS = [
  { label: "Craft", value: "Jaipur Blue Pottery" },
  { label: "Location", value: "Jaipur, Rajasthan" },
  { label: "Making Time", value: "3 days" },
  { label: "Size", value: "9 in height" },
];

function VoiceStep() {
  const navigate = useNavigate();
  const { startDraft } = useKarigar();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [done, setDone] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const recRef = useRef<any>(null);
  const fallbackTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(
    () => () => {
      recRef.current?.stop?.();
      if (fallbackTimer.current) clearInterval(fallbackTimer.current);
    },
    [],
  );

  function runFallback() {
    setNotice(
      "We could not use the microphone, so here is an example of what a spoken description looks like.",
    );
    const words = FALLBACK.split(" ");
    let i = 0;
    setTranscript("");
    fallbackTimer.current = setInterval(() => {
      i += 1;
      setTranscript(words.slice(0, i).join(" "));
      if (i >= words.length) {
        if (fallbackTimer.current) clearInterval(fallbackTimer.current);
        setListening(false);
        setDone(true);
      }
    }, 120);
  }

  function start() {
    setDone(false);
    setNotice(null);
    setListening(true);
    const SR =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SR) {
      runFallback();
      return;
    }
    try {
      const rec = new SR();
      rec.lang = "hi-IN";
      rec.interimResults = true;
      rec.continuous = true;
      rec.onresult = (e: any) => {
        let text = "";
        for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
        setTranscript(text);
      };
      rec.onerror = () => {
        rec.stop();
        runFallback();
      };
      rec.onend = () => {
        setListening(false);
        setTranscript((t) => {
          if (t.trim()) setDone(true);
          return t;
        });
      };
      recRef.current = rec;
      rec.start();
    } catch {
      runFallback();
    }
  }

  function stop() {
    setListening(false);
    recRef.current?.stop?.();
    if (fallbackTimer.current) clearInterval(fallbackTimer.current);
    if (transcript.trim()) setDone(true);
    else runFallback();
  }

  return (
    <AppShell title="Speak about it" subtitle="Say what you made, in your own words.">
      <div className="mx-auto max-w-xl">
        <div className="card-craft flex flex-col items-center p-8">
          <button
            onClick={listening ? stop : start}
            aria-label={listening ? "Stop recording" : "Start recording"}
            className={
              listening
                ? "relative flex h-32 w-32 items-center justify-center rounded-full bg-clay text-clay-foreground shadow-[var(--shadow-lift)]"
                : "relative flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
            }
          >
            {listening && (
              <span className="absolute inset-0 animate-ping rounded-full bg-clay/40" aria-hidden />
            )}
            {listening ? <Square className="h-10 w-10" /> : <Mic className="h-12 w-12" strokeWidth={1.5} />}
          </button>
          <p className="mt-5 text-center font-display text-lg font-semibold">
            {listening ? "Listening… speak now" : done ? "Got it" : "Tap the mic and start talking"}
          </p>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Hindi or English both work. Tap again to stop.
          </p>
        </div>

        {(transcript || notice) && (
          <div className="card-craft mt-4 p-5">
            <p className="text-xs font-semibold text-clay">What we heard</p>
            <p className="mt-2 min-h-12 text-base leading-relaxed">
              {transcript || "…"}
              {listening && <span className="ml-0.5 animate-pulse">▍</span>}
            </p>
            {notice && <p className="mt-3 text-xs text-muted-foreground">{notice}</p>}
          </div>
        )}

        {done && (
          <div className="card-craft mt-4 p-5">
            <p className="text-xs font-semibold text-clay">Details we pulled out</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <span
                  key={c.label}
                  className="rounded-full border bg-secondary px-3 py-1.5 text-sm"
                >
                  <span className="text-muted-foreground">{c.label}: </span>
                  <span className="font-semibold">{c.value}</span>
                </span>
              ))}
            </div>
            <Button
              size="lg"
              className="mt-5 w-full"
              onClick={() => {
                startDraft(fromTemplate(AI_TEMPLATES[0]!));
                navigate({ to: "/catalog" });
              }}
            >
              <Sparkles className="mr-1 h-4 w-4" /> Make my listing
            </Button>
          </div>
        )}

        {listening && (
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Recording
          </p>
        )}
      </div>
    </AppShell>
  );
}
