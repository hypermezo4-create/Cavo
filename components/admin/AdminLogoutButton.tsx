"use client";

import { useRouter } from "next/navigation";
import { logoutAuthUser } from "@/lib/use-auth-user";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAuthUser();
    router.replace("/store");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      Sign out
    </button>
  );
}
