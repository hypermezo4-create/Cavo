import { NextResponse } from "next/server";
import { listTestimonials } from "@/lib/server/store-service";

export async function GET() {
  try {
    const items = await listTestimonials();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load testimonials." }, { status: 500 });
  }
}
