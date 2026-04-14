import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth-constants";
import { verifyAdminSessionCookie } from "@/lib/server/firebase-admin";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sessionCookie = cookies().get(ADMIN_SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    redirect("/auth/login?admin=1&callbackUrl=/admin");
  }

  try {
    await verifyAdminSessionCookie(sessionCookie);
  } catch {
    redirect("/auth/login?admin=1&callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-[#06070b] text-white md:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
