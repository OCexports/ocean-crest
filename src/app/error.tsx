"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  // Surface the real error to the console / error monitoring; never render it
  // to the user (digest/message can leak internals in production).
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-stone">
      <div className="text-center px-6">
        <div className="text-6xl font-bold text-gold/15 font-[family-name:var(--font-display)]">
          Error
        </div>
        <h1 className="mt-4 text-2xl font-bold text-primary font-[family-name:var(--font-display)]">
          {t.errorPages.errorTitle}
        </h1>
        <p className="mt-3 text-ink-muted max-w-md mx-auto">
          {t.errorPages.errorBody}
        </p>
        <div className="mt-8">
          <Button onClick={() => reset()}>{t.errorPages.tryAgain}</Button>
        </div>
      </div>
    </section>
  );
}
