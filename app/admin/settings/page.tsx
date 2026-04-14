"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function SettingsPage() {
  return (
    <AdminPageShell title="Settings" subtitle="Core store settings will move into structured admin controls in a later phase.">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/60">Settings management is not active in the current stage.</div>
    </AdminPageShell>
  );
}
