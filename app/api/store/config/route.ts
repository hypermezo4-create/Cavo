import { NextResponse } from "next/server";
import { getStoreConfig } from "@/lib/server/store-service";

export async function GET() {
  try {
    const config = await getStoreConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load store config." }, { status: 500 });
  }
}
