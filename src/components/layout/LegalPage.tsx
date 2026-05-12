"use client";

import Link from "next/link";
import { companyInfo } from "@/lib/constants/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface LegalSection {
  heading: string;
  /** Each entry is one paragraph. Strings only — keep it plain. */
  body: string[];
}

interface LegalPageProps {
  /** Picks the localized title/breadcrumb (reuses the footer link labels). */
  kind: "privacy" | "terms";
  /** Raw effective date, e.g. "May 2026" — kept as-is, prefixed with the localized "Last updated". */
  effectiveDate: string;
  /** Intro paragraph — English (legal copy isn't translated). */
  intro: string;
  /** Numbered sections — English. */
  sections: LegalSection[];
}

/**
 * Shell for the Privacy Policy / Terms of Service pages. The page *chrome*
 * (breadcrumb, "last updated", the "available in English" notice, the contact
 * line) is localized via `useLanguage()`; the legal *body* stays English on
 * purpose — that copy should be reviewed by counsel before any translation.
 */
export function LegalPage({ kind, effectiveDate, intro, sections }: LegalPageProps) {
  const { t } = useLanguage();
  const title = kind === "privacy" ? t.footerExtra.privacy : t.footerExtra.terms;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary py-28 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <svg className="absolute bottom-0 left-0 w-full h-12 text-stone" viewBox="0 0 1440 48" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,36 1440,30 L1440,48 L0,48 Z" />
        </svg>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[12px] text-white/75 mb-4">
            <Link href="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
            <span className="text-white/60">/</span>
            <span className="text-white/80">{title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-display)]">{title}</h1>
          <p className="mt-3 text-sm text-white/60">{t.legalPage.lastUpdated}: {effectiveDate}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-24 bg-stone">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-ink-muted leading-relaxed">{intro}</p>
          {t.legalPage.englishOnly && (
            <p className="mt-3 text-xs text-ink-muted/80 italic">{t.legalPage.englishOnly}</p>
          )}
          <div className="mt-10 space-y-10">
            {sections.map((s, i) => (
              <div key={s.heading}>
                <h2 className="text-xl lg:text-2xl font-semibold text-primary font-[family-name:var(--font-display)]">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm text-ink-muted leading-relaxed">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-xs text-ink-muted/80">
            {t.legalPage.questions}{" "}
            <a href={`mailto:${companyInfo.email}`} className="text-gold hover:underline">{companyInfo.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
