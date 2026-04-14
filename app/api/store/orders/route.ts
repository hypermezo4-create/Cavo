import { NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/server/store-service";

export async function GET() {
  try {
    const orders = await listOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load orders." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await createOrder(body);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create order." }, { status: 500 });
  }
}
