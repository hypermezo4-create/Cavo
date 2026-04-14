import { NextResponse } from "next/server";
import { deleteProduct, getProductById, updateProduct } from "@/lib/server/store-service";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const product = await getProductById(params.id);
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load product." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const product = await updateProduct(params.id, body);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const result = await deleteProduct(params.id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to delete product." }, { status: 500 });
  }
}
