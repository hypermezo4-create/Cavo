type PrismaClientLike = Record<string, unknown>;

declare global {
  var __cavoPrisma: PrismaClientLike | undefined;
}

export async function getPrismaClient(): Promise<PrismaClientLike | null> {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    if (!globalThis.__cavoPrisma) {
      const { PrismaClient } = await import("@prisma/client");
      globalThis.__cavoPrisma = new PrismaClient();
    }

    return globalThis.__cavoPrisma ?? null;
  } catch (error) {
    console.warn("Prisma client is not available yet. Falling back to in-memory catalog.", error);
    return null;
  }
}
