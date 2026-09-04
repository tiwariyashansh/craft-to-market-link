import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, Package, PlusCircle, Users, User } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/products", label: "My Products", icon: Package },
  { to: "/add", label: "Add Product", icon: PlusCircle },
  { to: "/buyers", label: "Find Buyers", icon: Users },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="indigo-panel flex h-9 w-9 items-center justify-center rounded-lg font-display text-lg leading-none">
        क
      </span>
      {!compact && (
        <span className="font-display text-lg font-semibold tracking-tight">KarigarSetu</span>
      )}
    </span>
  );
}

export function AppShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="paper-surface flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r bg-sidebar px-4 py-6 md:flex">
        <Link to="/dashboard" className="px-2">
          <Logo />
        </Link>
        <p className="mt-1 px-2 text-xs text-muted-foreground">
          From traditional craft to digital market
        </p>
        <nav className="mt-8 flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-lg border border-dashed border-gold/60 bg-gold-soft/70 p-3 text-xs text-foreground/80">
          Demo account. Nothing you enter here is sent anywhere.
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-8">
            <div className="min-w-0">
              <div className="md:hidden">
                <Logo />
              </div>
              <h1 className="mt-1 truncate font-display text-xl font-semibold md:mt-0 md:text-2xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-0.5 truncate text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {action}
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-sidebar md:hidden">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="leading-none">{label.replace("My ", "").replace(" Product", "")}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
