import { OnboardingForm } from "@/components/forms/OnboardingForm";
import { BeakerLogo } from "@/components/brand/BeakerLogo";
import { getVerifiedLabeCheckout } from "@/lib/stripe-checkout";
import { readOnboardingToken } from "@/lib/onboarding";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Project onboarding",
  description: "Complete your private Labe project onboarding.",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ token?: string; preview?: string }> }) {
  const { token = "", preview } = await searchParams;
  const tokenData = readOnboardingToken(token);
  const checkout = tokenData ? await getVerifiedLabeCheckout(tokenData.sessionId) : null;
  const isPreview = process.env.NODE_ENV !== "production" && preview === "verified";

  if (!checkout && !isPreview) notFound();

  const session = checkout?.session;
  const email = checkout?.email || "hello@example.com";
  const plan = checkout?.plan || "growth";
  const business = session?.metadata?.business || "Example Business";

  return (
    <main className="min-h-screen bg-[#f6f8fc] py-8 text-slate-950 sm:py-14">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6">
        <div className="flex items-center gap-3">
          <BeakerLogo />
          <span className="text-sm font-black tracking-[-0.02em]">Labe onboarding</span>
        </div>
        <div className="mt-10 rounded-[2rem] bg-slate-950 px-6 py-9 text-white shadow-2xl sm:px-10 sm:py-12">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">Welcome to Labe</p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-black tracking-[-0.05em] sm:text-5xl">Let&apos;s get your build started.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">This is your private project questionnaire for {business}. Take your time, answer what you can, and leave anything you do not have yet—we will help with the rest.</p>
          <div className="mt-7 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-100">Allow around 20–30 minutes to complete</div>
          <p className="mt-6 text-sm text-slate-400">Your details are handled under our <a href="/privacy" className="font-bold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white">Privacy Policy</a>.</p>
        </div>
        <div className="mt-8">
          <OnboardingForm
            token={token}
            name={session?.metadata?.name || "Max Walsh"}
            business={business}
            email={email}
            phone={session?.customer_details?.phone || session?.metadata?.phone || "0432 076 236"}
            website={session?.metadata?.website === "Not provided" ? "" : session?.metadata?.website || ""}
            plan={plan}
          />
        </div>
        <p className="mt-8 text-center text-sm leading-6 text-slate-500">Need a hand? Email <a className="font-bold text-blue-700 underline underline-offset-4" href="mailto:hello@labe.com.au">hello@labe.com.au</a> and we will help you through it.</p>
      </div>
    </main>
  );
}
