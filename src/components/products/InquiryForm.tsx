"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/constants/products";
import { companyInfo } from "@/lib/constants/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const countryOptions = [
  { value: "ae", label: "United Arab Emirates" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "nl", label: "Netherlands" },
  { value: "my", label: "Malaysia" },
  { value: "sg", label: "Singapore" },
  { value: "za", label: "South Africa" },
  { value: "ke", label: "Kenya" },
  { value: "eg", label: "Egypt" },
  { value: "br", label: "Brazil" },
  { value: "ca", label: "Canada" },
  { value: "fr", label: "France" },
  { value: "au", label: "Australia" },
];

// Minimal RFC-ish email regex — good enough for catching typos at blur time;
// real validation happens server-side.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function InquiryForm() {
  const { t } = useLanguage();
  const f = t.inquiryForm;
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams.get("product") ?? "";
  const productPrefillValid = products.some((p) => p.slug === prefilledProduct);

  const productOptions = [
    ...products.map((p) => ({ value: p.slug, label: t.productData[p.slug]?.name ?? p.name })),
    { value: "other", label: f.otherProduct },
  ];
  const countrySelectOptions = [...countryOptions, { value: "other", label: f.otherProduct }];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [submitError, setSubmitError] = useState<string | undefined>();
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the success heading once the success card mounts so screen
  // readers announce it and keyboard users land in the right place.
  useEffect(() => {
    if (isSubmitted) successHeadingRef.current?.focus();
  }, [isSubmitted]);

  const validateEmail = (value: string) => {
    if (!value) return;
    setEmailError(EMAIL_RE.test(value) ? undefined : f.invalidEmail);
  };
  const validatePhone = (value: string) => {
    if (!value) return;
    // Permissive: 7+ digits, optional +, spaces, dashes, parens.
    const digits = value.replace(/\D/g, "");
    // i18n key for phone validation not yet in the dictionary; reuse the
    // generic English string until translations are added.
    setPhoneError(digits.length >= 7 ? undefined : "Please enter a valid phone number");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(undefined);

    // Block submit if a field-level validation error is still showing.
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      company: String(data.get("company") ?? ""),
      country: String(data.get("country") ?? ""),
      product: String(data.get("product") ?? ""),
      quantity: String(data.get("quantity") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        // i18n key for the submit error not yet in the dictionary; reuse the
        // server-provided English string (or a generic fallback) for now.
        throw new Error(json?.error ?? "Something went wrong. Please try again.");
      }
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const wa = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(f.whatsappPre)}`;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSubmitted ? (
        <m.div
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          role="status"
          aria-live="polite"
          className="text-center py-10"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-teal/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-teal" />
          </div>
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="text-xl font-semibold text-primary font-[family-name:var(--font-display)] outline-none"
          >
            {f.successTitle}
          </h3>
          <p className="mt-2 text-ink-muted max-w-md mx-auto">{f.successBody}</p>
          <ul className="mt-6 max-w-md mx-auto text-start text-sm text-ink-muted space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              <span>{f.emailConfirm}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              <span>{f.fasterWhatsapp}</span>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-whatsapp text-white text-sm font-semibold hover:bg-whatsapp/90 transition-colors"
            >
              {f.continueWhatsapp}
            </a>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmailError(undefined);
                setPhoneError(undefined);
                setSubmitError(undefined);
              }}
              className="text-sm text-gold hover:text-primary transition-colors underline cursor-pointer"
            >
              {f.sendAnother}
            </button>
          </div>
        </m.div>
      ) : (
        <m.form
          key="form"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          onSubmit={handleSubmit}
          className="space-y-5"
          // Visually fade inputs while the request is in flight; pairs with
          // the per-field `disabled` so users can't double-submit.
          aria-busy={isSubmitting}
        >
          <fieldset disabled={isSubmitting} className="space-y-5 border-0 p-0 m-0 min-w-0">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label={f.name} name="name" autoComplete="name" placeholder={f.phName} required />
              <Input
                label={f.email}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={f.phEmail}
                required
                error={emailError}
                onBlur={(e) => validateEmail(e.currentTarget.value)}
                onChange={() => emailError && setEmailError(undefined)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label={f.phone}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={f.phPhone}
                required
                error={phoneError}
                onBlur={(e) => validatePhone(e.currentTarget.value)}
                onChange={() => phoneError && setPhoneError(undefined)}
              />
              <Input label={f.company} name="company" autoComplete="organization" placeholder={f.phCompany} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Select label={f.country} name="country" placeholder={f.selectCountry} options={countrySelectOptions} required />
              <Select
                label={f.product}
                name="product"
                placeholder={f.selectProduct}
                options={productOptions}
                defaultValue={productPrefillValid ? prefilledProduct : ""}
              />
            </div>
            <Input label={f.quantity} name="quantity" placeholder={f.phQuantity} />
            <Textarea label={f.message} name="message" placeholder={f.phMessage} required />
          </fieldset>
          {submitError && (
            <p role="alert" className="text-sm text-red-600">
              {submitError}
            </p>
          )}
          <Button type="submit" size="lg" className="w-full sm:w-auto" isLoading={isSubmitting} aria-busy={isSubmitting}>
            <Send className="w-4 h-4" />
            {isSubmitting ? f.sending : f.send}
          </Button>
          <p className="text-xs text-ink-muted">{f.confidential}</p>
        </m.form>
      )}
    </AnimatePresence>
  );
}
