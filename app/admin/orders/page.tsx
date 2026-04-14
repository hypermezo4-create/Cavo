"use client";

import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { useOrdersState } from "@/lib/use-store-data";
import type { Order } from "@/lib/api";

const ORDER_STATUSES: Order["status"][] = ["new", "confirmed", "processing", "shipped", "delivered", "cancelled"];

function StatusPill({ status }: { status: Order["status"] }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/75">{status}</span>;
}

export default function OrdersPage() {
  const { items: orders, isLoading, refresh, updateStatus } = useOrdersState();
  const [savingId, setSavingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: Order["status"]) => {
    try {
      setSavingId(id);
      await updateStatus(id, status);
    } catch {
      alert("Failed to update order status.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <AdminPageShell
      title="Orders"
      subtitle="Review customer requests, Hurghada-only shipping details, and current order status."
      action={
        <button onClick={() => void refresh()} className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white">
          Refresh
        </button>
      }
    >
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{order.name}</h2>
                  <StatusPill status={order.status} />
                </div>
                <p className="mt-2 text-sm text-white/60">{order.phone} • {order.city} • {order.area || "Hurghada area"}</p>
                <p className="mt-1 text-sm text-white/45">{order.address || "Address not added yet."}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/35">Order ID: {order.id}</p>
              </div>

              <div className="min-w-[180px] space-y-3">
                <div className="text-right text-sm text-white/50">{new Date(order.createdAt).toLocaleString()}</div>
                <select
                  value={order.status}
                  disabled={savingId === order.id}
                  onChange={(event) => void handleStatusChange(order.id, event.target.value as Order["status"])}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {order.items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-3">
                    <img src={item.product.featuredImage || item.product.image || "/images/brand/logo.jpg"} alt={item.product.nameEn} className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-white">{item.product.nameEn}</p>
                      <p className="text-xs text-white/55">Qty: {item.quantity}</p>
                      <p className="text-xs text-white/45">{item.selectedSize || "Default size"} • {item.selectedColor || "Default color"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {order.notes ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                <span className="font-bold text-white">Notes:</span> {order.notes}
              </div>
            ) : null}
          </div>
        ))}

        {!orders.length ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/60">
            {isLoading ? "Loading orders..." : "No orders yet."}
          </div>
        ) : null}
      </div>
    </AdminPageShell>
  );
}
