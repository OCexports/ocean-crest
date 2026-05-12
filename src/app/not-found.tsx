"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-stone">
      <div className="text-center px-6">
        <div className="text-8xl font-bold text-gold/15 font-[family-name:var(--font-display)]">
          404
        </div>
        <h1 className="mt-4 text-3xl font-bold text-primary font-[family-name:var(--font-display)]">
          {t.errorPages.notFoundTitle}
        </h1>
        <p className="mt-3 text-ink-muted max-w-md mx-auto">
          {t.errorPages.notFoundBody}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4" />
              {t.errorPages.backHome}
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">{t.errorPages.browseProducts}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
