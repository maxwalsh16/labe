import { ContactForm } from "@/components/forms/ContactForm";
import { CallReceptionistButton } from "@/components/ui/CallReceptionistButton";
import { Container } from "@/components/ui/Container";

const promises = [
  "A clear reply from a real person",
  "The price and scope before work begins",
  "No obligation and no pushy sales calls",
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-blue-600 py-24 text-white sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -right-40 h-[36rem] w-[36rem] rounded-full bg-slate-950/25 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-100">
              Ready when you are
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              Make it easier for customers to choose you.
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-blue-50/85">
              Tell us what your business does, what is not working online, and
              where you are losing time or enquiries. We will recommend the
              simplest useful next step.
            </p>

            <ul className="mt-9 space-y-4">
              {promises.map((promise) => (
                <li
                  key={promise}
                  className="flex items-start gap-3 text-sm font-semibold text-blue-50/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="m4 8 2.5 2.5L12 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {promise}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-white/15 pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100/70">
                Prefer to call?
              </p>
              <CallReceptionistButton
                tone="blue"
                className="mt-3 w-full sm:w-auto"
              />
            </div>

            <div className="mt-8 border-t border-white/15 pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100/70">
                Prefer email?
              </p>
              <a
                href="mailto:hello@labe.com.au"
                className="mt-2 inline-flex text-lg font-black text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
              >
                hello@labe.com.au
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
