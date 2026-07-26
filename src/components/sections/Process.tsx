import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Complete your onboarding",
    description:
      "After payment, check your inbox for your onboarding link and send your logo, services, contact details, and any photos you want us to use.",
    note: "One simple questionnaire in your welcome email",
    icon: "brief",
  },
  {
    number: "02",
    title: "We build and connect everything",
    description:
      "We turn your details into a polished website, tailor it to your business, connect the essentials, and test it on every screen.",
    note: "Your build timeline begins",
    icon: "build",
  },
  {
    number: "03",
    title: "You approve it, then go live",
    description:
      "Review your website, send one clear round of changes, and approve it. We then connect the domain and launch.",
    note: "Ready for new enquiries",
    icon: "launch",
  },
] as const;

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-96 w-[55rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
            Three simple steps
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.045em] sm:text-6xl">
            You send the details. We handle the technical work.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300">
            No long meetings or confusing project management. You always know
            what we need from you and what happens next.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="process-line-vertical absolute bottom-16 left-16 top-16 w-px bg-white/10 lg:hidden"
          >
            <span className="process-line-fill-vertical absolute inset-x-0 top-0 bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-500" />
            <span className="process-pulse-vertical absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_5px_rgba(96,165,250,0.65)]" />
          </div>

          <div
            aria-hidden="true"
            className="process-line absolute left-[16.66%] right-[16.66%] top-16 hidden h-px bg-white/10 lg:block"
          >
            <span className="process-line-fill absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
            <span className="process-pulse absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_5px_rgba(96,165,250,0.65)]" />
          </div>

          <div className="relative grid gap-5 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="process-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 backdrop-blur sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/10 text-blue-300 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                    <ProcessIcon name={step.icon} />
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-500">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-10 text-2xl font-black tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-300">
                  {step.description}
                </p>
                <div className="mt-8 flex items-center gap-2 border-t border-white/10 pt-5 text-xs font-bold text-blue-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  {step.note}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-center">
          <p className="text-xs leading-5 text-slate-400">
            Your website goes live within 48 hours, with Growth inclusions and
            selected add-ons completed within 5 business days. These priority
            timelines apply when the package setup price and selected one-off
            add-ons are paid in full. They begin once all required content,
            access, and approval to start have been received. Deposit or
            staged-payment projects enter the next available waiting-list
            position. Time awaiting client feedback is outside those windows;
            third-party add-ons may receive a separate timeline.
          </p>
        </div>
      </Container>
    </section>
  );
}

function ProcessIcon({ name }: { name: (typeof steps)[number]["icon"] }) {
  if (name === "brief") {
    return (
      <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm-2 5.5c5.7 2.5 12.3 2.5 18 0M10 13h4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "build") {
    return (
      <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M14.5 6.5 17.5 3.5M15.5 3.5l3 3M4 20l5.4-1.3L19 9.1a2.1 2.1 0 0 0-3-3l-9.6 9.6L4 20Zm3.2-5 3.3 3.3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 5c2.7-2.7 5.7-2 6.5-1.5.5.8 1.2 3.8-1.5 6.5l-4 4-5-5 4-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m10 9-4.5 1L3 12.5l5 1.5M15 14l-1 4.5-2.5 2.5-1.5-5M17 7l.01.01M6 18c-1.5.2-2.8 1.5-3 3 1.5-.2 2.8-1.5 3-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
