"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function BannersPage() {
  return (
    <AdminPageShell title="Banners" subtitle="Homepage visual management will move into structured admin tools in a later phase.">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/60">Banner management is not active in the current stage.</div>
    </AdminPageShell>
  );
}
