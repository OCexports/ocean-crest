import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-[11px] font-medium tracking-[0.3em] uppercase mb-3",
            light ? "text-gold-light" : "text-gold"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight font-[family-name:var(--font-display)]",
          light ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      {/* Gold line accent */}
      <div
        className={cn(
          "mt-4 h-px w-20",
          align === "center" && "mx-auto",
          "gold-line-left",
          align === "center" && "gold-line"
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-white/80" : "text-ink-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
