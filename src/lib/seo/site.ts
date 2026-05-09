export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ocexports.com"
).replace(/\/$/, "");

export const siteName = "Ocean Crest Exports";

export const defaultOgImage = `${siteUrl}/og-image.png`;
