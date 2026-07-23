import { ButtonLink } from "@/components/ui/ButtonLink";
import { CallReceptionistButton } from "@/components/ui/CallReceptionistButton";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section id="top" className="hero-grid relative isolate overflow-hidden pb-20 pt-20 text-center sm:pb-28 sm:pt-28">
      <div
        aria-hidden="true"
        className="hero-orb absolute left-1/2 top-0 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl"
      />
      <Container className="relative">
        <div className="hero-enter hero-enter-1 mx-auto inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
          </span>
          Built in Adelaide for small businesses
        </div>
        <h1 className="hero-enter hero-enter-2 mx-auto mt-7 max-w-5xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-7xl lg:text-[5.75rem]">
          More enquiries.
          <br />
          <span className="hero-highlight relative inline-block text-blue-600">
            Less work chasing them.
          </span>
        </h1>
        <p className="hero-enter hero-enter-3 mx-auto mt-8 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
          Get a fast, professional website built to win business—then add AI,
          automated follow-up, and advertising when your business is ready.
        </p>
        <div className="hero-enter hero-enter-4 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="#pricing" size="large">
            See packages and prices
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </ButtonLink>
          <ButtonLink href="#contact" secondary size="large">
            Tell us about your business
          </ButtonLink>
        </div>
        <div className="hero-enter hero-enter-5 mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
          <span className="inline-flex items-center gap-2">
            <CheckIcon /> Prices shown upfront
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckIcon /> Built in 48 hours
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckIcon /> No monthly Launch fee
          </span>
        </div>
        <div className="hero-enter hero-enter-5 mt-7">
          <CallReceptionistButton />
          <p className="mt-3 text-xs font-semibold text-slate-500">
            Speak with Labe&apos;s AI receptionist about your business.
          </p>
        </div>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 text-blue-600"
      viewBox="0 0 20 20"
      fill="none"
    >
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity=".12" />
      <path
        d="m6.5 10 2.2 2.2 4.8-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
