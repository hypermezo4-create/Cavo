import { Suspense } from "react";
import LoginForm from "./login-form";

function LoginPageFallback() {
  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-[570px] rounded-[2rem] border border-white/10 bg-[rgba(10,12,18,0.86)] p-5 shadow-2xl shadow-black/30 sm:p-8 xl:p-11">
        <div className="h-8 w-40 animate-pulse rounded-full bg-white/10" />
        <div className="mt-6 h-12 w-72 animate-pulse rounded-2xl bg-white/10" />
        <div className="mt-4 h-24 animate-pulse rounded-2xl bg-white/5" />
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginForm />
    </Suspense>
  );
}
