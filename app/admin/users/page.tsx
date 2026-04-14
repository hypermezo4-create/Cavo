"use client";

import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function UsersPage() {
  return (
    <AdminPageShell title="Users" subtitle="User management will return after the authentication and backend phases are restored.">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/60">User management is not active in the current stage.</div>
    </AdminPageShell>
  );
}
