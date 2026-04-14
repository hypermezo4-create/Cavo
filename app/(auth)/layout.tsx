import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-4 py-12 text-[var(--text-primary)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_bottom,rgba(245,158,11,0.08),transparent_24%)]" />
      <div className="relative z-10 w-full max-w-6xl">{children}</div>
    </main>
  );
}
