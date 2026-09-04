import type { ProductStatus } from "@/lib/karigar/data";
import { cn } from "@/lib/utils";

const LABEL: Record<ProductStatus, string> = {
  draft: "Draft",
  catalog: "AI Catalog Ready",
  published: "Published",
};

const STYLE: Record<ProductStatus, string> = {
  draft: "bg-muted text-muted-foreground border-border",
  catalog: "bg-gold-soft text-gold-foreground border-gold/50",
  published: "bg-success/12 text-success border-success/30",
};

export function StatusBadge({ status, className }: { status: ProductStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        STYLE[status],
        className,
      )}
    >
      {LABEL[status]}
    </span>
  );
}
