import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Welcome email preview",
  robots: { index: false, follow: false },
};

export default async function WelcomeEmailPreview({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const { preview } = await searchParams;

  if (process.env.NODE_ENV === "production" || preview !== "verified") notFound();

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-5 py-8 text-slate-950 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-sm font-bold text-slate-500">Private welcome-email preview</p>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Subject</p>
          <p className="mt-1 font-bold text-slate-950">Welcome to Labe — let&apos;s get your build started</p>
          <p className="mt-3 text-slate-500">To: example@business.com.au</p>
        </div>

        <article className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-xl">
          <header className="bg-slate-950 p-8 text-white sm:p-10">
            <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-blue-300">Welcome to Labe</p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">Your project is confirmed.</h1>
          </header>
          <div className="p-8 text-base leading-relaxed text-slate-800 sm:p-10">
            <p>Hi Jamie,</p>
            <p className="mt-5">Your Labe project for Example Business is confirmed.</p>
            <p className="mt-5">You do not need to have everything ready today. Your private onboarding link is below—work through it when you are ready, and leave anything you do not have yet. We will help with the rest.</p>
            <a href="/onboarding?preview=verified" className="mt-7 inline-flex rounded-full bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white no-underline">Complete your onboarding</a>

            <section className="mt-8 rounded-2xl bg-slate-100 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-blue-600">Your direct contact</p>
              <p className="mt-2 font-bold text-slate-950">Max Walsh · Senior Project Manager</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Text preferred: 0432 076 236
                <br />
                business.maxwalsh@gmail.com
                <br />
                For urgent matters, Max will call from Labe on 0414 785 829.
              </p>
            </section>
          </div>
          <footer className="bg-slate-50 px-8 py-5 text-sm text-slate-500 sm:px-10">Labe Labs · Adelaide, South Australia</footer>
        </article>
      </div>
    </main>
  );
}
