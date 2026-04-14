"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuthUser } from "@/lib/use-auth-user";
import { TESTIMONIALS } from "@/lib/site-data";
import { addLocalReviewCard, getLocalReviewCards, type LocalReviewCard } from "@/lib/local-review-cards";

export default function ReviewsPage() {
  const { isAuthenticated, user } = useAuthUser();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ rating: "5", review: "" });
  const [localReviews, setLocalReviews] = useState<LocalReviewCard[]>([]);

  useEffect(() => {
    const sync = () => setLocalReviews(getLocalReviewCards());
    sync();
    window.addEventListener("cavo-review-cards-change", sync);
    return () => window.removeEventListener("cavo-review-cards-change", sync);
  }, []);

  const reviewCards = useMemo(
    () => [
      ...localReviews.map((item) => ({ id: item.id, name: item.name, role: item.role, rating: item.rating, text: item.text })),
      ...TESTIMONIALS,
    ],
    [localReviews],
  );

  return (
    <section className="px-4 py-10 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">Customer reviews</p>
          <h1 className="mt-4 text-4xl font-black text-white">Smooth, premium feedback around the Cavo showcase.</h1>
          <div className="mt-8 grid gap-5">
            {reviewCards.map((item) => (
              <div key={item.id} className="rounded-[1.8rem] border border-white/10 bg-black/20 p-6">
                <div className="flex items-center gap-1 text-amber-300">{Array.from({ length: item.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-4 text-sm leading-7 text-zinc-300">“{item.text}”</p>
                <div className="mt-5">
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">Leave a review</p>
          <h2 className="mt-4 text-3xl font-black text-white">Only signed-in users can submit reviews.</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400">Browsing the site stays open for everyone. Login is used only for review posting, while buying will move later to the Cavo app.</p>
          {isAuthenticated ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                addLocalReviewCard({
                  name: user?.displayName || user?.email?.split("@")[0] || "Cavo Customer",
                  role: "Verified reviewer",
                  rating: Number(form.rating),
                  text: form.review.trim(),
                });
                setSubmitted(true);
                setForm({ rating: "5", review: "" });
              }}
              className="mt-6 space-y-4"
            >
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300">Signed in as {user?.displayName || user?.email}</div>
              <select value={form.rating} onChange={(event) => setForm((current) => ({ ...current, rating: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white">
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
              </select>
              <textarea value={form.review} onChange={(event) => setForm((current) => ({ ...current, review: event.target.value }))} rows={6} placeholder="Write your review" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white" required />
              <button type="submit" className="rounded-2xl bg-amber-500 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black">Submit review</button>
              {submitted ? <p className="text-sm text-emerald-300">Your review was posted on this device from your signed-in account.</p> : null}
            </form>
          ) : (
            <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-black/20 p-6">
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/auth/login" className="rounded-2xl bg-amber-500 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black">Sign in</Link>
                <Link href="/auth/register" className="rounded-2xl border border-white/10 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white">Create account</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
