import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  /** Smaller variant for thumbnails / related-product cards. */
  compact?: boolean;
}

/**
 * Brand-aligned placeholder shown where a product photo will go once the
 * client provides final photography. Intentionally distinct from a broken
 * image so a buyer reads it as "intentional" rather than "missing asset".
 */
export function ProductImagePlaceholder({ className, compact = false }: Props) {
  return (
    <div
      role="img"
      aria-label="Product photography coming soon"
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center text-center",
        "bg-gradient-to-br from-stone-100 via-stone-100 to-stone-200/60",
        className,
      )}
    >
      {/* Decorative gold corner accents — brand cue, signals intentional state */}
      <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-gold/30" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-gold/30" />

      <div
        className={cn(
          "rounded-full bg-white/70 flex items-center justify-center border border-gold/25 backdrop-blur-sm",
          compact ? "w-9 h-9 mb-2" : "w-14 h-14 mb-4",
        )}
      >
        <ImageIcon
          strokeWidth={1.4}
          className={cn("text-gold/55", compact ? "w-4 h-4" : "w-6 h-6")}
        />
      </div>
      <p
        className={cn(
          "font-medium tracking-[0.25em] uppercase text-ink-light px-3",
          compact ? "text-[12px] lg:text-[9px]" : "text-[12px] lg:text-[10px]",
        )}
      >
        Photography coming soon
      </p>
    </div>
  );
}
