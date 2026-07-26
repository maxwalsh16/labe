import { ContactForm } from "@/components/forms/ContactForm";
import { CallReceptionistButton } from "@/components/ui/CallReceptionistButton";
import { ChatAgentButton } from "@/components/ui/ChatAgentButton";
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
              Tell us where you want more customers or less admin. We’ll
              recommend the simplest way to get there.
            </p>

            <p className="mt-9 text-sm font-black uppercase tracking-[0.18em] text-blue-100">
              We&apos;re here to help
            </p>
            <ul className="mt-4 space-y-4">
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

            <div className="mt-9 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm leading-6 text-blue-50/90 backdrop-blur">
              <strong className="font-black text-white">
                Flexible payment is available.
              </strong>{" "}
              Deposits and staged payments can be arranged, with these projects
              joining the next available waiting-list position. Paying in full
              secures priority delivery.
            </div>

            <div className="mt-10 flex max-w-md flex-col gap-3 border-t border-white/15 pt-8">
              <CallReceptionistButton
                tone="blue"
                balanced="always"
                compact
                className="w-full"
              />
              <ChatAgentButton
                tone="blue"
                balanced="always"
                compact
                className="w-full"
              />
            </div>

            <div className="mt-6">
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
