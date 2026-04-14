"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function ContactPage() {
  return (
    <AdminPageShell title="Inbox" subtitle="Contact messages will be connected to the admin panel in a later data phase.">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/60">Inbox integration is not active in the current stage.</div>
    </AdminPageShell>
  );
}
