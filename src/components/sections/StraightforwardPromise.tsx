import { Container } from "@/components/ui/Container";

const promises = [
  {
    title: "Price agreed upfront",
    detail: "Know exactly what is included and what it costs before we begin.",
    icon: "price",
  },
  {
    title: "Live in 48h*",
    detail: "48h website delivery when paid in full*",
    icon: "speed",
  },
  {
    title: "Made easy for you",
    detail: "We handle the setup and make everything simple to use—no tech skills needed.",
    icon: "simple",
  },
] as const;

function PromiseIcon({ icon }: { icon: (typeof promises)[number]["icon"] }) {
  if (icon === "price") {
    return <span aria-hidden="true">$</span>;
  }

  if (icon === "speed") {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2M5.6 5.6 4 4M18.4 5.6 20 4" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function StraightforwardPromise() {
  return (
    <section className="relative z-20 bg-white pb-20 pt-8 sm:pb-24 sm:pt-4">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
          <div className="grid gap-8 border-b border-white/10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <div className="inline-flex rounded-full bg-gradient-to-r from-blue-500 via-cyan-300 to-blue-500 p-px shadow-[0_8px_30px_rgba(37,99,235,0.24)]">
                <p className="inline-flex items-center gap-2.5 rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                  <span
                    aria-hidden="true"
                    className="relative flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[0.65rem] text-white shadow-[0_0_18px_rgba(96,165,250,0.7)]"
                  >
                    ✓
                  </span>
                  The Labe promise
                </p>
              </div>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.045em] sm:text-4xl">
                Clear price. Fast launch. No tech headache.
              </h2>
            </div>
            <p className="max-w-2xl text-pretty text-base leading-7 text-slate-300 lg:justify-self-end">
              Know what you are getting, get online quickly, and put better
              technology to work without having to figure it out yourself.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3">
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
                    <PromiseIcon icon={promise.icon} />
                  </span>
                  <div>
                    <h3 className="text-xl font-black">{promise.title}</h3>
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
          *Launch websites are completed within 48 hours once full payment and
          all required content are received. Growth is completed within 5
          business days, with the website delivered inside the first 48 hours.
          Deposit and staged-payment projects join the next available
          waiting-list position. Add-ons selected with Launch or Growth may
          require additional setup and testing time.
        </p>
      </Container>
    </section>
  );
}
