"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import SocialAuthButtons from "../_components/SocialAuthButtons";
import { ADMIN_EMAIL, auth } from "@/lib/firebase";

function getAuthErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unable to sign in right now.";
  if (message.includes("auth/invalid-credential") || message.includes("auth/wrong-password") || message.includes("auth/user-not-found")) {
    return "Wrong email or password.";
  }
  if (message.includes("auth/too-many-requests")) {
    return "Too many attempts. Please wait a little and try again.";
  }
  return message;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCallback = searchParams.get("callbackUrl") || "/store/reviews";
  const adminMode = searchParams.get("admin") === "1" || requestedCallback.startsWith("/admin");
  const callbackUrl = useMemo(() => (requestedCallback.startsWith("/") ? requestedCallback : "/store/reviews"), [requestedCallback]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const signedInEmail = credential.user.email?.toLowerCase() || "";

      if (adminMode) {
        if (signedInEmail !== ADMIN_EMAIL) {
          setError("This account cannot access the admin area.");
          setLoading(false);
          return;
        }

        const idToken = await credential.user.getIdToken(true);
        const response = await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });

        const payload = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(payload?.error || "Could not start the admin session.");
        }

        window.location.assign(callbackUrl);
        return;
      }

      window.location.assign(callbackUrl);
      return;
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError));
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-[570px] rounded-[2rem] border border-white/10 bg-[rgba(10,12,18,0.86)] p-5 shadow-2xl shadow-black/30 sm:p-8 xl:p-11">
        <div className="mb-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-400">{adminMode ? "Cavo admin" : "Cavo account"}</p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">{adminMode ? "Sign in to the admin panel" : "Sign in to leave a review"}</h1>
          <p className="mt-3 text-sm text-zinc-400">{adminMode ? "Use the owner account to manage the Cavo catalog, reviews, and future app flow." : "The site is open for browsing. Sign in only when you want to share your review."}</p>
        </div>
        <div className="mb-6"><SocialAuthButtons callbackUrl={callbackUrl} mode="login" adminMode={adminMode} /></div>
        {!adminMode ? <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-zinc-500"><span className="h-px flex-1 bg-white/10" /><span>or sign in with email</span><span className="h-px flex-1 bg-white/10" /></div> : null}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label htmlFor="email" className="mb-2.5 block text-sm font-medium text-zinc-300">Email</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={adminMode ? "Owner email" : "Enter your email"} className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-3.5 text-white outline-none transition focus:border-amber-400/40 focus:ring-2 focus:ring-amber-500/20" /></div>
          <div><label htmlFor="password" className="mb-2.5 block text-sm font-medium text-zinc-300">Password</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={adminMode ? "Admin password" : "Enter your password"} className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-3.5 text-white outline-none transition focus:border-amber-400/40 focus:ring-2 focus:ring-amber-500/20" /></div>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button type="submit" disabled={loading} className="flex w-full justify-center rounded-2xl bg-amber-500 px-6 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:brightness-110 disabled:opacity-60">{loading ? "Signing in..." : adminMode ? "Enter admin" : "Sign in"}</button>
          {!adminMode ? <p className="text-center text-sm text-zinc-400">Don&apos;t have an account? <Link href="/auth/register" className="font-semibold text-amber-300">Create one now</Link></p> : null}
        </form>
      </div>
    </section>
  );
}
