import { ButtonLink } from "@/components/ui/ButtonLink";
import { CallReceptionistButton } from "@/components/ui/CallReceptionistButton";
import { ChatAgentButton } from "@/components/ui/ChatAgentButton";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-grid relative z-10 isolate overflow-x-clip pb-12 pt-[7.75rem] sm:pb-24 sm:pt-36 lg:pb-16 lg:pt-32"
    >
      <div
        aria-hidden="true"
        className="hero-orb absolute left-[62%] top-0 -z-10 h-[40rem] w-[64rem] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-center gap-16 sm:gap-28 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 xl:gap-24">
          <div className="text-center lg:text-left">
            <div className="hero-enter hero-enter-1 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              <span className="text-left">
                <span className="block sm:inline">Built in Adelaide,</span>{" "}
                <span className="block sm:inline">
                  designed for SA business
                </span>
              </span>
            </div>

            <h1 className="hero-enter hero-enter-2 mt-11 text-balance text-5xl font-black leading-[0.98] tracking-[-0.058em] text-slate-950 sm:mt-12 sm:text-7xl lg:mt-7 lg:text-[5.25rem]">
              The website and AI you need—
              <span className="hero-highlight relative inline-block text-blue-600">
                sorted.
              </span>
            </h1>

            <p className="hero-enter hero-enter-3 mx-auto mt-8 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:mt-12 sm:text-xl lg:mx-0 lg:mt-7">
              One connected setup to win more customers and cut admin—without
              the jargon, long timelines, or agency price tag.
            </p>

            <div className="hero-enter hero-enter-4 mx-auto mt-10 flex w-full max-w-sm flex-col items-center gap-3 [&>a]:w-full sm:mx-0 sm:mt-14 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center sm:[&>a]:w-auto lg:mt-9 lg:justify-start">
              <ButtonLink href="#pricing" size="large">
                See packages & prices
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </ButtonLink>
              <ButtonLink href="#process" secondary size="large">
                See how it works
              </ButtonLink>
            </div>

            <div className="hero-enter hero-enter-5 mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-500 sm:mt-12 lg:mt-7 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <CheckIcon /> Upfront pricing
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckIcon /> Live in 48h*
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckIcon /> No tech skills needed
              </span>
            </div>

            <div className="hero-enter hero-enter-5 mx-auto mt-8 flex w-full max-w-sm flex-col items-center gap-3 sm:mx-0 sm:mt-12 sm:w-auto sm:max-w-none lg:mt-7 lg:items-start">
              <span className="text-sm font-semibold text-slate-500">
                Want to talk it through?
              </span>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <CallReceptionistButton
                  balanced
                  showNumber={false}
                  className="w-full sm:min-h-11 sm:w-auto sm:px-4 sm:text-sm"
                />
                <ChatAgentButton
                  balanced
                  compact
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </div>

          <div className="hero-enter hero-enter-3 relative mx-auto w-full max-w-xl lg:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[3rem] bg-blue-500/10 blur-3xl"
            />
            <div className="hero-system relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 p-4 text-white shadow-[0_32px_90px_rgba(15,23,42,0.28)] [clip-path:inset(0_round_2rem)] sm:p-6">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/35 blur-3xl"
              />

              <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                    Labe Growth
                  </p>
                  <p className="mt-1 font-black">
                    Turning enquiries into paying customers
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Example
                </span>
              </div>

              <div className="relative mt-5 space-y-3">
                <FlowCard
                  className="hero-flow-card hero-flow-card-1"
                  icon={<MessageIcon />}
                  eyebrow="New website enquiry"
                  title="“Can you help me this week?”"
                  meta="Received just now"
                />

                <FlowConnector delay={1} />

                <FlowCard
                  className="hero-flow-card hero-flow-card-2 border-blue-400/25 bg-blue-500/10"
                  icon={<SparkIcon />}
                  eyebrow="Answered instantly"
                  title="The right questions are asked"
                  meta="Service · Location · Timing · Budget"
                  blue
                />

                <FlowConnector delay={2} />

                <div className="hero-flow-card hero-flow-card-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.08] p-4 shadow-lg shadow-black/15 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                        <CheckCircleIcon />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
                          One clear next step
                        </p>
                        <p className="mt-1 font-black text-white">
                          Sent straight to booking or payment
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          No back-and-forth. Everything they need to take action
                          is ready.
                        </p>
                      </div>
                    </div>
                    <span className="hero-ready-badge shrink-0 self-start rounded-full bg-emerald-400 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wide text-emerald-950">
                      Ready to buy
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="#growth-plan"
                className="group relative mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 transition-colors hover:border-blue-400/35 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <p className="text-sm font-bold text-slate-300">
                  From first enquiry to payment—automatically.
                </p>
                <span className="text-lg text-blue-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FlowCard({
  icon,
  eyebrow,
  title,
  meta,
  className,
  blue = false,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  meta: string;
  className: string;
  blue?: boolean;
}) {
  return (
    <div
      className={`${className} rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-lg shadow-black/15 sm:p-5`}
    >
      <div className="flex gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            blue
              ? "bg-blue-400/15 text-blue-300"
              : "bg-white/10 text-slate-200"
          }`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p
            className={`text-xs font-black uppercase tracking-[0.14em] ${
              blue ? "text-blue-300" : "text-slate-400"
            }`}
          >
            {eyebrow}
          </p>
          <p className="mt-1 font-black text-white">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{meta}</p>
        </div>
      </div>
    </div>
  );
}

function FlowConnector({ delay = 1 }: { delay?: number }) {
  return (
    <div
      aria-hidden="true"
      className="hero-flow-track relative mx-auto -my-1 h-5 w-px overflow-hidden bg-white/10"
    >
      <span
        className={`hero-flow-pulse hero-flow-pulse-${delay} absolute left-0 top-0 h-2 w-px bg-blue-400 shadow-[0_0_10px_2px_rgba(96,165,250,0.8)]`}
      />
    </div>
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

function MessageIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 5.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-4.5 3v-3H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m8 12 2.5 2.5L16.5 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
