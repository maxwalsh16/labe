import { BeakerLogo } from "@/components/brand/BeakerLogo";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Start your Labe project",
  description:
    "Choose your Labe package, reserve a priority build position, and continue to secure Stripe checkout.",
};

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  const initialPlan = params.plan === "launch" ? "launch" : "growth";

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" aria-label="Return to Labe home">
            <BeakerLogo />
          </Link>
          <Link
            href="/#pricing"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
          >
            Back to pricing
          </Link>
        </Container>
      </header>

      <main className="relative overflow-hidden bg-slate-50 py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-blue-100/80 blur-3xl"
        />
        <Container className="relative">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                Ready when you are
              </p>
              <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl">
                Pay now and reserve a priority build position.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Choose your package, share the basics, and pay securely through
                Stripe. Your detailed customisation happens after payment, with
                Labe guiding you through every step.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Secure your place before completing the full content questionnaire",
                  "Upload your logo and photos after payment",
                  "Tell us your colours, services, wording, and preferences",
                  "The 48-hour build starts once your content is complete and approved",
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                      {index + 1}
                    </span>
                    <p className="pt-0.5 text-sm font-bold leading-6 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-black text-emerald-950">
                  Nothing to upload yet
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-900/75">
                  Payment reserves your priority position. Your logo, photos,
                  content, and design choices are collected immediately
                  afterwards.
                </p>
              </div>
            </div>

            <CheckoutForm initialPlan={initialPlan} />
          </div>
        </Container>
      </main>
    </>
  );
}
