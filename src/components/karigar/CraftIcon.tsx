import { cn } from "@/lib/utils";
import type { IconKey } from "@/lib/karigar/data";

const paths: Record<IconKey, ReactPaths> = {
  pot: (
    <>
      <path d="M26 14h12M28 14v5c-6 3-10 9-10 16 0 10 6 17 14 17s14-7 14-17c0-7-4-13-10-16v-5" />
      <path d="M22 33c6 3 14 3 20 0M26 42c4 2 8 2 12 0" />
      <circle cx="32" cy="36" r="3" />
    </>
  ),
  shawl: (
    <>
      <path d="M12 20c8-6 32-6 40 0-4 8-6 18-4 28-12 4-20 4-32 0 2-10 0-20-4-28Z" />
      <path d="M18 26c8-3 20-3 28 0M18 34c8-3 20-3 28 0M18 42c8-3 20-3 28 0" />
    </>
  ),
  wood: (
    <>
      <rect x="10" y="20" width="44" height="24" rx="5" />
      <path d="M18 26h28M18 38h28M24 26v12M32 26v12M40 26v12" />
    </>
  ),
  silver: (
    <>
      <path d="M32 10v8" />
      <path d="M32 18c-8 4-12 12-12 20 0 8 5 14 12 14s12-6 12-14c0-8-4-16-12-20Z" />
      <path d="M32 26c-4 3-6 8-6 12s3 7 6 7 6-3 6-7-2-9-6-12Z" />
    </>
  ),
};

type ReactPaths = React.ReactNode;

export function CraftIcon({
  icon = "pot",
  className,
}: {
  icon?: IconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      {paths[icon]}
    </svg>
  );
}

export function ProductThumb({
  icon,
  photo,
  alt,
  className,
}: {
  icon?: IconKey;
  photo?: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg border bg-primary-soft/60 text-primary",
        className,
      )}
    >
      {photo ? (
        <img src={photo} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <CraftIcon icon={icon} className="h-2/3 w-2/3 opacity-80" />
      )}
    </div>
  );
}
