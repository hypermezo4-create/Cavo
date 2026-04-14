import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getStorage } from "firebase-admin/storage";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionCookie } from "@/lib/server/firebase-admin";

export const runtime = "nodejs";

function sanitizeBaseName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "") || "image";
}

function buildPublicUrl(bucketName: string, objectPath: string, token: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`;
}

export async function POST(request: Request) {
  try {
    const sessionCookie = cookies().get(ADMIN_SESSION_COOKIE)?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Sign in as admin first." }, { status: 401 });
    }

    await verifyAdminSessionCookie(sessionCookie);

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
    }

    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: "Image is too large. Keep every image under 25 MB." }, { status: 400 });
    }

    const bucket = getStorage().bucket();
    const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase() : ".jpg";
    const base = sanitizeBaseName(file.name.replace(/\.[^.]+$/, ""));
    const objectPath = `cavo/products/${new Date().getFullYear()}/${Date.now()}-${base}-${randomUUID().slice(0, 8)}${ext}`;
    const token = randomUUID();
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadedFile = bucket.file(objectPath);

    await uploadedFile.save(buffer, {
      metadata: {
        contentType: file.type,
        cacheControl: "public,max-age=31536000,immutable",
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
      public: false,
      resumable: false,
    });

    return NextResponse.json({
      success: true,
      url: buildPublicUrl(bucket.name, objectPath, token),
      path: objectPath,
      size: file.size,
      contentType: file.type,
      name: file.name,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 },
    );
  }
}
