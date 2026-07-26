import { BeakerLogo } from "@/components/brand/BeakerLogo";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Payment confirmed",
  description: "Your Labe priority build position has been reserved.",
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
                Payment confirmed
              </p>
              <h1 className="mt-3 text-balance text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Your priority build is locked in.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                You do not need to have everything ready yet. Take a breath—we
                will guide you through the rest, one simple step at a time.
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 text-left sm:p-8">
                <div className="flex max-w-xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
                  <Image
                    src="/images/max-walsh.jpg"
                    alt="Max Walsh, your Labe project manager"
                    width={80}
                    height={80}
                    className="h-20 w-20 shrink-0 rounded-full border-2 border-blue-300/30 object-cover object-center"
                  />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                      Meet your project manager
                    </p>
                    <h2 className="mt-1.5 text-2xl font-black text-white">
                      Max Walsh
                    </h2>
                    <p className="mt-1 text-sm font-bold text-blue-200">
                      Senior Project Manager
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Has been selected as your direct contact from onboarding
                      through to launch.
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                    Personal details
                  </p>
                  <div className="mt-2 flex flex-col gap-1 text-sm leading-6 text-slate-300">
                    <a
                      href="sms:0432076236"
                      className="w-fit font-bold text-white underline decoration-blue-400/70 underline-offset-4 transition-colors hover:text-blue-200"
                    >
                      0432 076 236 <span className="font-normal text-slate-400">(Text preferred)</span>
                    </a>
                    <a
                      href="mailto:business.maxwalsh@gmail.com"
                      className="w-fit break-words font-bold text-white underline decoration-blue-400/70 underline-offset-4 transition-colors hover:text-blue-200"
                    >
                      business.maxwalsh@gmail.com
                    </a>
                  </div>
                </div>
                <p className="mt-5 border-y border-white/10 py-4 text-center text-xs leading-5 text-slate-400">
                  For urgent matters, Max will call from Labe on 0414 785 829.
                </p>
                <div className="mt-7 grid gap-7 sm:grid-cols-2 sm:gap-8">
                  <section>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300 sm:min-h-10">
                      A bit about me
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Hi, I&apos;m Max, Labe&apos;s Senior Project Manager. I grew up
                      across Adelaide, Whyalla, and the Gold Coast, and now
                      live back in South Australia with my wife and daughter.
                      My background is in sales and management, and I hold a
                      Certificate IV in New Small Business from TAFE SA.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Outside Labe, I&apos;m a long-time music producer, footy and
                      sport fanatic, and proud supporter of South Australian
                      food, wine, and local producers.
                    </p>
                  </section>
                  <section>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300 sm:min-h-10">
                      What I bring to your project
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      I work hands-on across web development, AI, and
                      automation. My job is to understand how your business
                      works, build the right setup around it, and explain it
                      simply.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      You do not need to be technical or have everything
                      figured out. I&apos;ll guide you through each step, make sure
                      you know what happens next, and do everything I can to
                      make the process easy.
                    </p>
                  </section>
                </div>
                <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                  Max&apos;s details will be included in your welcome email.
                </p>
              </div>

              <div className="mt-9 grid gap-4 text-left sm:grid-cols-3">
                {[
                  [
                    "1",
                    "Your welcome email arrives",
                    "It includes your onboarding link and clear next steps.",
                  ],
                  [
                    "2",
                    "Send us what you have",
                    "Logo, photos, services, and preferences—we make the rest simple.",
                  ],
                  [
                    "3",
                    "We take it from here",
                    "We review your details, confirm anything needed, and start your build.",
                  ],
                ].map(([number, title, detail]) => (
                  <div
                    key={number}
                    className="confirmation-step relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 pb-6"
                  >
                    <span className="text-sm font-black text-blue-300">
                      Step {number}
                    </span>
                    <p className="mt-2 text-sm font-bold leading-6 text-white">
                      {title}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="confirmation-panel relative mt-7 overflow-hidden rounded-2xl border border-blue-300/20 bg-blue-500/10 p-6 text-left sm:p-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                      You&apos;re looked after
                    </p>
                    <p className="mt-2 text-base font-black leading-7 text-white">
                      Your welcome email includes your private onboarding link
                      and everything you need to know.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {email
                        ? `Your Stripe receipt and welcome email will be sent to ${email}. If you cannot see them shortly, check your spam folder or contact us.`
                        : "Your Stripe receipt and welcome email will be sent to the email used at checkout. If you cannot see them shortly, check your spam folder or contact us."}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                      What Labe does next
                    </p>
                    <p className="mt-2 text-base font-black leading-7 text-white">
                      We review your onboarding and guide you from there.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Your priority timeline begins once we have your completed
                      details and approval to start. We are here Monday–Friday,
                      9:00 am–5:00 pm Adelaide time, excluding national and
                      South Australian public holidays.
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
