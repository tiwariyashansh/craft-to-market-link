import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/karigar/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKarigar } from "@/lib/karigar/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login or try the demo — KarigarSetu" },
      {
        name: "description",
        content:
          "Enter your phone number or open the KarigarSetu demo account to see how an artisan lists a product.",
      },
      { property: "og:title", content: "Login or try the demo — KarigarSetu" },
      {
        property: "og:description",
        content: "Enter your phone number or open the KarigarSetu demo account.",
      },
    ],
  }),
  component: LoginPage,
});

const COPY = {
  en: {
    heading: "Welcome back",
    sub: "Enter your phone number. We will send a 6-digit code.",
    phone: "Phone number",
    send: "Send code",
    otp: "Enter the code we sent",
    verify: "Verify and continue",
    demo: "Try Demo — no number needed",
    note: "This is a demo. Any number and any 6 digits will work.",
  },
  hi: {
    heading: "फिर से स्वागत है",
    sub: "अपना फ़ोन नंबर डालें। हम 6 अंकों का कोड भेजेंगे।",
    phone: "फ़ोन नंबर",
    send: "कोड भेजें",
    otp: "भेजा गया कोड डालें",
    verify: "जाँचें और आगे बढ़ें",
    demo: "डेमो देखें — नंबर की ज़रूरत नहीं",
    note: "यह एक डेमो है। कोई भी नंबर और कोई भी 6 अंक चलेंगे।",
  },
};

function LoginPage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useKarigar();
  const t = COPY[language];
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="paper-surface flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex rounded-full border bg-card p-0.5 text-sm">
          {(["en", "hi"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={cn(
                "rounded-full px-3 py-1 font-medium transition-colors",
                language === l ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {l === "en" ? "English" : "हिंदी"}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 pb-16">
        <div className="w-full max-w-sm">
          <div className="card-craft p-6">
            <h1 className="font-display text-2xl font-semibold">{t.heading}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t.sub}</p>

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="phone">{t.phone}</Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    inputMode="tel"
                    placeholder="98765 43210"
                    className="pl-9"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {sent && (
                <div>
                  <Label htmlFor="otp">{t.otp}</Label>
                  <Input
                    id="otp"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="1 2 3 4 5 6"
                    className="mt-1.5 tracking-[0.4em]"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}

              {!sent ? (
                <Button
                  className="w-full"
                  onClick={() => {
                    setSent(true);
                    toast.success("Code sent (demo): 123456");
                  }}
                >
                  {t.send}
                </Button>
              ) : (
                <Button className="w-full" onClick={() => navigate({ to: "/dashboard" })}>
                  {t.verify} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4 rounded-xl border-2 border-dashed border-gold bg-gold-soft p-4 text-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full border border-gold/50"
              onClick={() => navigate({ to: "/dashboard" })}
            >
              {t.demo}
            </Button>
            <p className="mt-2 text-xs text-gold-foreground">{t.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
