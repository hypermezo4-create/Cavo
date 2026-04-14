import { NextResponse } from "next/server";
import { createProduct, listProducts } from "@/lib/server/store-service";

export async function GET() {
  try {
    const products = await listProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load products." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create product." }, { status: 500 });
  }
}
