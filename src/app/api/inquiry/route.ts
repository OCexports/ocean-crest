import { NextResponse, type NextRequest } from "next/server";
import { getTransporter, INQUIRY_TO, INQUIRY_FROM } from "@/lib/email/smtp";

// Never prerender / cache — this only ever runs at request time.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  product?: string;
  quantity?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  let body: InquiryPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const country = body.country?.trim() ?? "";
  const product = body.product?.trim() ?? "";
  const quantity = body.quantity?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // Required fields mirror the client form (name, email, phone, country, message).
  if (!name || !email || !phone || !country || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Company", company || "—"],
    ["Country", country],
    ["Product", product || "—"],
    ["Quantity", quantity || "—"],
  ];

  // Plain-text only. GoDaddy's secureserver inbound filter rejects the
  // HTML/auto-generated version as spam (error IB212), so we keep the body
  // simple text to slip past it.
  const text =
    rows.map(([label, value]) => `${label}: ${value}`).join("\n") +
    `\n\nMessage:\n${message}`;

  try {
    await getTransporter().sendMail({
      from: { name: "OC Exports Website", address: INQUIRY_FROM },
      to: INQUIRY_TO,
      // Hitting "Reply" answers the customer directly at the address they typed.
      replyTo: `${name} <${email}>`,
      subject: `Website inquiry from ${name}${company ? ` (${company})` : ""}`,
      text,
    });
  } catch (err) {
    // Log server-side for debugging; keep the client message generic.
    console.error("[inquiry] failed to send email:", err);
    return NextResponse.json(
      { error: "Could not send your inquiry. Please try again or contact us on WhatsApp." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
