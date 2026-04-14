import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/server/store-service";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const order = await updateOrderStatus(params.id, body.status);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update order." }, { status: 500 });
  }
}
