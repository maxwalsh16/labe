import { BeakerLogo } from "@/components/brand/BeakerLogo";
import { Container } from "@/components/ui/Container";

const workflowSteps = [
  {
    number: "01",
    title: "We get to know your business",
    description:
      "How you price, quote, book, and decide which enquiries are worth your time.",
  },
  {
    number: "02",
    title: "Customers and AI do the groundwork",
    description:
      "Clear answers, useful details, and the right next step are handled before you need to get involved.",
  },
  {
    number: "03",
    title: "You take it from there",
    description:
      "Spend less time chasing enquiries and more time quoting, closing, and getting jobs done.",
  },
] as const;

export function Benefits() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-40 lg:py-32">
      <Container>
        <div className="grid items-end gap-10 sm:gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Built for busy owners
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl">
              Technology that works for your business—not the other way around.
            </h2>
          </div>
          <p className="max-w-xl text-pretty text-lg leading-8 text-slate-600 lg:justify-self-end">
            Good technology takes work off your plate. We’ll shape the website
            and AI around your workflow, handle setup, and make it easy to
            use.
          </p>
        </div>

        <div className="mt-16 grid gap-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:mt-24 sm:p-10 lg:mt-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
              Built around how you operate
            </p>
            <h3 className="mt-3 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Stay ahead without having to become a tech expert.
            </h3>
            <p className="mt-5 max-w-xl text-pretty leading-7 text-slate-600">
              Customer expectations are changing quickly. Businesses that are
              easy to find, easy to deal with, and quick to respond are the
              ones that stand out.
            </p>
            <p className="mt-4 max-w-xl text-pretty leading-7 text-slate-600">
              Labe helps make sure yours is one of them. We get to know how
              you price, quote, book, and follow up, then tailor your website,
              AI, and automated follow-up around it. We handle the setup and
              show you how it works, so you can keep focusing on the work.
            </p>
          </div>

          <div className="grid gap-3">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/[0.03] sm:p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white shadow-lg shadow-blue-600/20">
                  {step.number}
                </span>
                <div>
                  <strong className="text-sm font-black text-slate-950 sm:text-base">
                    {step.title}
                  </strong>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
            <p className="rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black leading-6 text-white shadow-lg shadow-blue-600/20">
              Give customers a reason to choose you first—without adding
              another job to your day.
            </p>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 px-5 py-7 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)] sm:mt-14 sm:px-9 sm:py-10 lg:px-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl"
          />

          <div className="relative text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
              Inside Labe Growth
            </p>
            <h3 className="mt-3 text-balance text-2xl font-black tracking-[-0.035em] sm:text-4xl">
              Everything working together around your business.
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              Your website and AI share the work, so customers get a clear
              experience and you get fewer loose ends.
            </p>
          </div>

          <div className="relative mt-9 grid items-center gap-5 lg:grid-cols-[1fr_0.82fr_1fr] lg:gap-7">
            <div
              aria-hidden="true"
              className="absolute left-[18%] right-[18%] top-1/2 hidden h-px -translate-y-1/2 overflow-hidden bg-blue-400/20 lg:block"
            >
              <span className="workflow-signal absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
            </div>

            <div className="relative z-10 grid gap-4">
              <WorkflowNode
                icon={<WebsiteIcon />}
                eyebrow="Website"
                title="Builds trust and captures enquiries"
              />
              <WorkflowNode
                icon={<SparkIcon />}
                eyebrow="Practical AI"
                title="Answers questions and follows up"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center py-3">
              <span
                aria-hidden="true"
                className="h-8 w-px bg-gradient-to-b from-blue-400/0 to-blue-400/60 lg:hidden"
              />
              <div className="workflow-hub flex w-full max-w-[15rem] flex-col items-center rounded-[1.75rem] border border-blue-400/30 bg-blue-500/10 px-6 py-7 text-center shadow-[0_20px_55px_rgba(37,99,235,0.18)] backdrop-blur">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg shadow-blue-950/20">
                  <BeakerLogo showWordmark={false} compact />
                </span>
                <p className="mt-5 text-[0.65rem] font-black uppercase tracking-[0.18em] text-blue-300">
                  Your workflow
                </p>
                <strong className="mt-2 text-lg font-black leading-6">
                  Built around how you operate
                </strong>
              </div>
              <span
                aria-hidden="true"
                className="h-8 w-px bg-gradient-to-b from-blue-400/60 to-blue-400/0 lg:hidden"
              />
            </div>

            <div className="relative z-10 grid gap-4">
              <WorkflowNode
                icon={<CustomerIcon />}
                eyebrow="More customers"
                title="Clear next steps move people forward"
                outcome
              />
              <WorkflowNode
                icon={<TimeIcon />}
                eyebrow="Less admin"
                title="Routine work happens automatically"
                outcome
              />
            </div>
          </div>

          <div className="relative mt-8 flex flex-wrap justify-center gap-2.5 border-t border-white/10 pt-6">
            {["Setup handled", "Simple to use", "You stay in control"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 text-xs font-bold text-slate-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

      </Container>
    </section>
  );
}

function WorkflowNode({
  icon,
  eyebrow,
  title,
  outcome = false,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  outcome?: boolean;
}) {
  return (
    <div
      className={`workflow-node flex items-center gap-4 rounded-2xl border p-4 backdrop-blur sm:p-5 ${
        outcome
          ? "border-emerald-400/20 bg-emerald-400/[0.07]"
          : "border-white/10 bg-white/[0.055]"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          outcome
            ? "bg-emerald-400/10 text-emerald-300"
            : "bg-blue-400/10 text-blue-300"
        }`}
      >
        {icon}
      </span>
      <div>
        <p
          className={`text-[0.65rem] font-black uppercase tracking-[0.14em] ${
            outcome ? "text-emerald-300" : "text-blue-300"
          }`}
        >
          {eyebrow}
        </p>
        <p className="mt-1 text-sm font-black leading-5 text-white sm:text-base sm:leading-6">
          {title}
        </p>
      </div>
    </div>
  );
}

function WebsiteIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M7 6.5h.01M10 6.5h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
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

function CustomerIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m17 11 1.6 1.6L22 9.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TimeIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
