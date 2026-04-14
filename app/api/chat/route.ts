import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const last = Array.isArray(body?.messages) ? body.messages[body.messages.length - 1]?.content || "" : "";
  const lower = String(last).toLowerCase();
  let reply = "Welcome to Cavo ✨ Share the product name, category, or size you want, and continue to checkout or contact links to complete your inquiry.";
  if (lower.includes("size")) reply = "You can choose your size on the product page before adding the item to your inquiry cart.";
  if (lower.includes("price") || lower.includes("cost")) reply = "Prices are intentionally hidden on this storefront. Final details are confirmed directly after the inquiry is submitted.";
  if (lower.includes("whatsapp") || lower.includes("contact")) reply = "Open the Links page to find WhatsApp and the rest of the official Cavo contact channels.";
  return NextResponse.json({ reply });
}
