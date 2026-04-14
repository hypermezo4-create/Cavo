"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import SocialAuthButtons from "../_components/SocialAuthButtons";
import { auth } from "@/lib/firebase";

function getAuthErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unable to create the account right now.";
  if (message.includes("auth/email-already-in-use")) {
    return "This email is already in use. Please sign in instead.";
  }
  if (message.includes("auth/weak-password")) {
    return "Password is too weak. Please choose a stronger one.";
  }
  return message;
}

export default function RegisterForm() {
  const router = useRouter();
  const callbackUrl = "/store/reviews";
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const credential = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password);
      if (form.name.trim()) {
        await updateProfile(credential.user, { displayName: form.name.trim() });
      }
      router.push(callbackUrl);
      router.refresh();
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError));
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-[570px] rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-400">Cavo</p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Create your review account</h1>
          <p className="mt-3 text-sm text-zinc-400">Create a customer profile so you can leave reviews inside the Cavo showcase.</p>
        </div>
        <div className="mb-6"><SocialAuthButtons callbackUrl={callbackUrl} mode="register" /></div>
        <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-zinc-500"><div className="h-px flex-1 bg-white/10" /><span>or</span><div className="h-px flex-1 bg-white/10" /></div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label htmlFor="name" className="mb-2.5 block text-sm font-medium text-white">Full name</label><input id="name" type="text" value={form.name} onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-400/40" placeholder="Enter your full name" required /></div>
          <div><label htmlFor="email" className="mb-2.5 block text-sm font-medium text-white">Email</label><input id="email" type="email" value={form.email} onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-400/40" placeholder="Enter your email" required /></div>
          <div><label htmlFor="password" className="mb-2.5 block text-sm font-medium text-white">Password</label><input id="password" type="password" value={form.password} onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-400/40" placeholder="Create a password" required /></div>
          <div><label htmlFor="confirm" className="mb-2.5 block text-sm font-medium text-white">Confirm password</label><input id="confirm" type="password" value={form.confirm} onChange={(e) => setForm((current) => ({ ...current, confirm: e.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-400/40" placeholder="Confirm your password" required /></div>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center rounded-2xl bg-amber-500 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:brightness-110 disabled:opacity-60">{loading ? "Creating..." : "Create account"}</button>
          <p className="text-center text-sm text-zinc-400">Already have an account? <Link href="/auth/login" className="font-semibold text-amber-300 hover:text-amber-200">Sign in</Link></p>
        </form>
      </div>
    </section>
  );
}
