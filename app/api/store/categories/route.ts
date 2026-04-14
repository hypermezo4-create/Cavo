import { NextResponse } from "next/server";
import { listCategories } from "@/lib/server/store-service";

export async function GET() {
  try {
    const categories = await listCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load categories." }, { status: 500 });
  }
}
