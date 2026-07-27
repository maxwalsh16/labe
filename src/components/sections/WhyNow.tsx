import { Container } from "@/components/ui/Container";

export function WhyNow() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-80 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
              The gap is widening
            </p>
            <h2 className="mt-3 max-w-2xl text-balance text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Your competitors are not standing still.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              While they’re busy doing the work, their setup answers enquiries,
              captures the right details, and makes the next step easy. Less
              admin. More enquiries moving towards a job.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              That advantage compounds with every enquiry. Labe gives you the
              same setup, without you needing to be the tech person.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
              A head start gets harder to catch
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              When one business makes it easier to enquire, get answers, and
              take the next step, the other starts losing ground—job by job.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <p className="font-black text-slate-100">Don’t get left behind</p>
                <p className="text-sm font-black uppercase tracking-[0.12em] text-blue-200">The AI advantage</p>
              </div>
              <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] p-2 sm:p-3">
                <svg
                  aria-label="Conceptual line graph illustrating how an AI-enabled competitor can move ahead of a business without a connected setup."
                  className="h-auto w-full"
                  role="img"
                  viewBox="0 0 460 260"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="lead-response-line" x1="64" y1="208" x2="406" y2="50" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#60A5FA" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#2563EB" />
                    </linearGradient>
                    <linearGradient id="lead-response-area" x1="235" y1="40" x2="235" y2="208" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB" stopOpacity="0.28" />
                      <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M64 48H416M64 101H416M64 154H416M64 208H416" stroke="rgba(148,163,184,0.18)" strokeDasharray="4 7" />
                  <path d="M64 32V208H430" stroke="rgba(148,163,184,0.35)" strokeWidth="1.5" />
                  <path d="M64 208C127 197 176 184 224 161C279 135 332 92 406 50V208H64Z" fill="url(#lead-response-area)" />
                  <path d="M64 208C145 203 250 196 406 184" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                  <path d="M64 208C127 197 176 184 224 161C279 135 332 92 406 50" stroke="url(#lead-response-line)" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="406" cy="50" r="7" fill="#60A5FA" stroke="#DBEAFE" strokeWidth="3" />
                  <circle cx="406" cy="184" r="6" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="2.5" />
                  <text x="75" y="238" fill="#94A3B8" fontSize="12" fontWeight="700">Today</text>
                  <text x="321" y="238" fill="#BFDBFE" fontSize="12" fontWeight="700">Over time →</text>
                  <text x="283" y="38" fill="#BFDBFE" fontSize="13" fontWeight="800">AI-enabled competitor</text>
                  <text x="323" y="205" fill="#CBD5E1" fontSize="13" fontWeight="800">Your business</text>
                </svg>
              </div>
              <p className="mt-5 rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm font-bold leading-6 text-blue-100">
                The gap isn’t created by working harder. It comes from having a better system working while you do the job.
              </p>
            </div>
            <div className="mt-5 text-xs font-bold text-blue-200">
              <a
                href="https://www.oecd.org/en/publications/generative-ai-and-the-sme-workforce_2d08b99d-en/full-report/component-2.html"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-blue-400/50 underline-offset-4 transition hover:text-white"
              >
                Read the OECD small-business research ↗
              </a>
            </div>
            <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-5 text-slate-500">
              Visual scenario, not a prediction. In an OECD survey of 5,000+ small and medium-sized businesses using generative AI, 29% said it helped them compete with larger businesses. Your outcome depends on your business, offer, and customer demand.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
