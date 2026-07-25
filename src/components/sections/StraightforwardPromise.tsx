import { Container } from "@/components/ui/Container";

const promises = [
  {
    number: "01",
    title: "Clear pricing",
    detail: "Know the cost and what is included before you commit.",
    icon: "$",
  },
  {
    number: "02",
    title: "Live in 48h*",
    detail: "Pay in full, send your content, and move straight to priority.",
    icon: "48",
  },
  {
    number: "03",
    title: "Easy to use",
    detail: "We handle setup and show you everything in plain English.",
    icon: "✓",
  },
] as const;

export function StraightforwardPromise() {
  return (
    <section className="relative z-20 bg-white pb-20 pt-8 sm:pb-24 sm:pt-4">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
          <div className="grid gap-8 border-b border-white/10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-200 shadow-lg shadow-blue-950/20">
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[0.65rem] text-white"
                >
                  ✓
                </span>
                Straightforward from day one
              </p>
              <h2 className="mt-3 text-balance text-3xl font-black tracking-[-0.045em] sm:text-4xl">
                Clear, fast, and easy from day one.
              </h2>
            </div>
            <p className="max-w-2xl text-pretty text-base leading-7 text-slate-300 lg:justify-self-end">
              Know what you are paying, get your website live fast, and use
              modern technology without needing to become the tech expert.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute left-[16.666%] right-[16.666%] top-[4.7rem] hidden h-px bg-gradient-to-r from-blue-500/0 via-blue-400/50 to-blue-500/0 md:block"
            />
            {promises.map((promise, index) => (
              <div
                key={promise.title}
                className={`relative px-6 py-7 sm:px-10 md:px-7 md:py-9 ${
                  index < promises.length - 1
                    ? "border-b border-white/10 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4 md:flex-col md:items-start">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/15 text-lg font-black text-blue-200 shadow-lg shadow-blue-950/30">
                    {promise.icon}
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-slate-500">
                      {promise.number}
                    </p>
                    <h3 className="mt-1 text-xl font-black">{promise.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400 md:mt-5">
                  {promise.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-slate-500">
          *The 48-hour Launch turnaround begins once payment and required
          content are received. Growth automation and selected add-ons may take
          additional time to configure and test.
        </p>
      </Container>
    </section>
  );
}
