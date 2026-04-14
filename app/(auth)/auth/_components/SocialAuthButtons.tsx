"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

type SocialAuthButtonsProps = {
  callbackUrl?: string;
  mode?: "login" | "register";
  adminMode?: boolean;
};

export default function SocialAuthButtons({ callbackUrl = "/store/reviews", mode = "login", adminMode = false }: SocialAuthButtonsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (adminMode) {
    return null;
  }

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push(callbackUrl);
      router.refresh();
    } catch (popupError) {
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch {
        setError("Google sign-in is unavailable right now. Please use email and password.");
        setLoading(false);
      }
      return;
    }
    setLoading(false);
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10 disabled:opacity-60"
      >
        {loading ? "Opening Google..." : mode === "login" ? "Sign in with Google" : "Create with Google"}
      </button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
