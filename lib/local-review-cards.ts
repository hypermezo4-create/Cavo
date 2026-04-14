export type LocalReviewCard = {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = "cavo-showcase-reviews";

export function getLocalReviewCards(): LocalReviewCard[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as LocalReviewCard[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addLocalReviewCard(review: Omit<LocalReviewCard, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  const next: LocalReviewCard = {
    ...review,
    id: `review-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const merged = [next, ...getLocalReviewCards()].slice(0, 20);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  window.dispatchEvent(new Event("cavo-review-cards-change"));
  return next;
}
