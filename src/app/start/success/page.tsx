import { BeakerLogo } from "@/components/brand/BeakerLogo";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Payment received",
  description: "Your Labe project has been reserved.",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; preview?: string }>;
}) {
  const { session_id: sessionId, preview } = await searchParams;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  let verified =
    process.env.NODE_ENV !== "production" && preview === "verified";
  let email = "";

  if (sessionId && secretKey) {
    try {
      const stripe = new Stripe(secretKey);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const isLabePackage = ["launch", "growth"].includes(
        session.metadata?.plan || "",
      );
      verified =
        session.status === "complete" &&
        session.payment_status === "paid" &&
        isLabePackage &&
        Boolean(session.client_reference_id);
      email = session.customer_details?.email || session.customer_email || "";
    } catch {
      verified = false;
    }
  }

  if (!verified) {
    notFound();
  }

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 py-16 text-white">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/15 bg-white/[0.07] p-7 text-center shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="flex justify-center">
            <BeakerLogo inverse />
          </div>

          {verified ? (
            <>
              <span className="confirmation-mark mx-auto mt-9 flex h-16 w-16 items-center justify-center rounded-full border border-blue-300/30 bg-blue-500/15 text-blue-200 shadow-xl shadow-blue-600/20">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="m8.5 16.5 5 5 10-11"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-blue-300">
                Payment received
              </p>
              <h1 className="mt-3 text-balance text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                You&apos;re booked in for priority delivery.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                We&apos;ll contact you within one business day and guide you
                through the next steps. For now, gather your logo, photos,
                services, colours, and preferred wording. Your priority
                turnaround is locked in.
              </p>

              <div className="mt-9 grid gap-4 text-left sm:grid-cols-3">
                {[
                  ["1", "Look out for your welcome email"],
                  ["2", "Send us your business details, logo, and photos"],
                  ["3", "Confirm everything, and your priority build begins"],
                ].map(([number, text]) => (
                  <div
                    key={number}
                    className="confirmation-step relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 pb-6"
                  >
                    <span className="text-sm font-black text-blue-300">
                      Step {number}
                    </span>
                    <p className="mt-2 text-sm font-bold leading-6 text-white">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="confirmation-panel relative mt-7 overflow-hidden rounded-2xl border border-blue-300/20 bg-blue-500/10 p-6 text-left sm:p-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                      When will you hear from us?
                    </p>
                    <p className="mt-2 text-base font-black leading-7 text-white">
                      We&apos;ll email you within one business day with
                      everything we need to get started.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {email
                        ? `Your Stripe receipt and project updates will be sent to ${email}.`
                        : "Your Stripe receipt and project updates will be sent to the email used at checkout."}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                      Standard office hours
                    </p>
                    <p className="mt-2 text-base font-black leading-7 text-white">
                      Monday–Friday, 9:00 am–5:00 pm
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Adelaide time, excluding national and South Australian
                      public holidays.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 border-t border-white/10 pt-6 text-sm leading-6 text-slate-400">
                <p className="font-bold text-slate-300">Labe Labs</p>
                <p>Level 30, 91 King William Street, Adelaide, Australia</p>
                <p>ABN 60 802 842 481</p>
              </div>
            </>
          ) : (
            <>
              <p className="mt-9 text-sm font-black uppercase tracking-[0.2em] text-amber-300">
                Payment confirmation pending
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">
                We could not verify this payment yet.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-300">
                If you completed checkout, please check your Stripe receipt or
                email Labe and we will confirm it for you.
              </p>
            </>
          )}

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="mailto:hello@labe.com.au"
              className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-black text-white transition-colors hover:bg-blue-500"
            >
              Email Labe
            </a>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-black text-white transition-colors hover:bg-white/10"
            >
              Return to Labe
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
