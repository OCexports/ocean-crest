"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/constants/products";

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
  { value: "other", label: "Other" },
];

const productOptions = products.map((p) => ({
  value: p.slug,
  label: p.name,
}));

export function InquiryForm() {
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams.get("product") ?? "";
  const productPrefillValid = products.some((p) => p.slug === prefilledProduct);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto rounded-full bg-teal/20 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-teal" />
        </div>
        <h3 className="text-xl font-semibold text-primary font-[family-name:var(--font-display)]">
          Inquiry Sent Successfully!
        </h3>
        <p className="mt-2 text-ink-muted">
          Thank you for your interest. Our export team will respond within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 text-sm text-gold hover:text-primary transition-colors underline cursor-pointer"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Full Name" name="name" autoComplete="name" placeholder="Your full name" required />
        <Input label="Email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="your@email.com" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 92748 11041" required />
        <Input label="Company" name="company" autoComplete="organization" placeholder="Your company name" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Select
          label="Country"
          name="country"
          placeholder="Select your country"
          options={countryOptions}
          required
        />
        <Select
          label="Product Interest"
          name="product"
          placeholder="Select a product"
          options={productOptions}
          defaultValue={productPrefillValid ? prefilledProduct : ""}
        />
      </div>
      <Input label="Estimated Quantity" name="quantity" placeholder="e.g., 5 MT, 1000 kg" />
      <Textarea
        label="Message"
        name="message"
        placeholder="Tell us about your requirements, preferred packaging, quality specifications, etc."
        required
      />
      <Button type="submit" size="lg" className="w-full sm:w-auto" isLoading={isSubmitting}>
        <Send className="w-4 h-4" />
        Send Inquiry
      </Button>
      <p className="text-xs text-ink-muted">
        Your information is kept confidential and will only be used to respond to your inquiry.
      </p>
    </form>
  );
}
