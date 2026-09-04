import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/karigar/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKarigar } from "@/lib/karigar/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — KarigarSetu" },
      {
        name: "description",
        content:
          "Your name, craft, village or city, scheme registration number and the language you prefer.",
      },
      { property: "og:title", content: "Your profile — KarigarSetu" },
      {
        property: "og:description",
        content: "Your name, craft, location, scheme number and language.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { artisanName, setArtisan, language, setLanguage } = useKarigar();
  const [craft, setCraft] = useState("Jaipur Blue Pottery");
  const [location, setLocation] = useState("Sanganer, Jaipur, Rajasthan");
  const [scheme, setScheme] = useState("PMV-2024-RJ-084312");

  return (
    <AppShell title="Your profile" subtitle="Buyers see this when they look you up.">
      <div className="mx-auto max-w-xl space-y-4">
        <div className="card-craft flex items-center gap-4 p-5">
          <span className="indigo-panel flex h-16 w-16 items-center justify-center rounded-full font-display text-2xl">
            {artisanName.charAt(0)}
          </span>
          <div>
            <p className="font-display text-xl font-semibold">{artisanName}</p>
            <p className="text-sm text-muted-foreground">
              {craft} · {location}
            </p>
          </div>
        </div>

        <div className="card-craft space-y-4 p-5">
          <div>
            <Label htmlFor="aname">Your name</Label>
            <Input
              id="aname"
              className="mt-1.5"
              value={artisanName}
              onChange={(e) => setArtisan(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="acraft">Craft you specialise in</Label>
            <Input
              id="acraft"
              className="mt-1.5"
              value={craft}
              onChange={(e) => setCraft(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="aloc">Village or city</Label>
            <Input
              id="aloc"
              className="mt-1.5"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ascheme">Government scheme registration number</Label>
            <Input
              id="ascheme"
              className="mt-1.5"
              value={scheme}
              onChange={(e) => setScheme(e.target.value)}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Optional. Buyers who need scheme-registered artisans can find you with this.
            </p>
          </div>
          <div>
            <Label>Language</Label>
            <div className="mt-2 flex w-fit rounded-full border bg-card p-0.5 text-sm">
              {(["en", "hi"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={cn(
                    "rounded-full px-4 py-1.5 font-medium transition-colors",
                    language === l ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  {l === "en" ? "English" : "हिंदी"}
                </button>
              ))}
            </div>
          </div>
          <Button className="w-full" onClick={() => toast.success("Profile saved")}>
            Save Profile
          </Button>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            toast.success("You are logged out");
            navigate({ to: "/" });
          }}
        >
          <LogOut className="mr-1 h-4 w-4" /> Log out
        </Button>
      </div>
    </AppShell>
  );
}
