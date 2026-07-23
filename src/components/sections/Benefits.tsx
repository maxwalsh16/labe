import { Container } from "@/components/ui/Container";

const benefits = [
  {
    metric: "48h",
    title: "Your website, ready fast",
    description:
      "Once we have your details, we build and prepare your new website for launch within 48 hours.",
  },
  {
    metric: "$999",
    title: "One clear starting price",
    description:
      "You know what your website costs before work begins—without a lengthy quoting process or surprise bill.",
  },
  {
    metric: "$0",
    title: "Monthly Labe fee for Launch",
    description:
      "There is no Labe subscription for Launch. If you need a small change later, it is simply $50 per request.",
  },
] as const;

export function Benefits() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Built for busy owners
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl">
              A better online presence without the usual hassle.
            </h2>
          </div>
          <p className="max-w-xl text-pretty text-lg leading-8 text-slate-600 lg:justify-self-end">
            You run the business. Labe handles the website, forms, and technical
            setup so customers can find you, trust you, and get in touch.
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-xl shadow-slate-900/[0.04] md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`benefit-card group relative p-7 sm:p-9 ${
                index < benefits.length - 1
                  ? "border-b border-slate-200 md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <strong className="text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl">
                  {benefit.metric}
                </strong>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <Checkmark />
                </span>
              </div>
              <h3 className="mt-8 text-xl font-black tracking-tight text-slate-950">
                {benefit.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-3xl border border-blue-100 bg-blue-50/70 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <OwnershipIcon />
            </span>
            <div>
              <strong className="block text-lg font-black text-slate-950">
                You own your finished website.
              </strong>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                You are not trapped in a Labe-only website builder. Ownership,
                access, and any third-party costs are explained before we begin.
              </p>
            </div>
          </div>
          <a
            href="#pricing"
            className="shrink-0 text-sm font-black text-blue-700 transition-colors hover:text-blue-900"
          >
            See what is included <span aria-hidden="true">→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

function Checkmark() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20" fill="none">
      <path
        d="m5.5 10 3 3 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OwnershipIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2.5 16 5v4.6c0 3.8-2.5 6.3-6 7.9-3.5-1.6-6-4.1-6-7.9V5l6-2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m7.2 10 1.8 1.8 3.8-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
