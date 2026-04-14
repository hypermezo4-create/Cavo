"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

function mapUser(user: User | null) {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

export function useAuthUser() {
  const [user, setUser] = useState<{ uid: string; email?: string | null; displayName?: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(mapUser(currentUser));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAuthenticated = useMemo(() => Boolean(user), [user]);
  return { user, loading, isAuthenticated };
}

export async function logoutAuthUser() {
  await fetch("/api/auth/session", { method: "DELETE" }).catch(() => undefined);
  await signOut(auth).catch(() => undefined);
}
