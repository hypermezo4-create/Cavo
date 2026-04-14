import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

import { ADMIN_SESSION_COOKIE, DEFAULT_ADMIN_EMAIL } from "@/lib/auth-constants";

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();

function resolveBucketName() {
  return process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || undefined;
}

function getFirebaseAdminApp(): App {
  if (getApps().length) {
    return getApps()[0]!;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const storageBucket = resolveBucketName();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.");
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket,
  });
}

export function firebaseAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}

export function firebaseAdminStorage() {
  return getStorage(getFirebaseAdminApp());
}

export function isAdminEmail(email?: string | null) {
  return Boolean(email) && email!.toLowerCase() === ADMIN_EMAIL;
}

export async function verifyAdminSessionCookie(sessionCookie: string) {
  const decoded = await firebaseAdminAuth().verifySessionCookie(sessionCookie, true);
  if (!isAdminEmail(decoded.email)) {
    throw new Error("Not allowed.");
  }
  return decoded;
}

export { ADMIN_SESSION_COOKIE };
