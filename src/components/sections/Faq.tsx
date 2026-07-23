import { Container } from "@/components/ui/Container";

const questions = [
  {
    question: "What if I’m not confident with technology or AI?",
    answer:
      "That is completely fine—you do not need to be technical. Labe handles the setup, explains everything in plain English, and shows you exactly how to use anything you need. We keep the day-to-day experience simple, guide you through it step by step, and are here if you need help after launch.",
  },
  {
    question: "When does the 48-hour turnaround begin?",
    answer:
      "The 48 hours begin once we have your completed questionnaire, logo, content, images, required account access, and approval to start. Waiting for missing details or feedback is not counted. If an integration needs more time, we will tell you before you commit.",
  },
  {
    question: "Does Labe Launch really have no monthly subscription?",
    answer:
      "Yes. There is no recurring Labe fee for Launch. Your domain and any optional third-party services are separate. Small content changes after launch cost $50 per request, and we quote larger changes before starting.",
  },
  {
    question: "What counts as a $50 minor update?",
    answer:
      "Examples include changing opening hours, replacing supplied text or an image, or updating contact details. New pages, sections, designs, integrations, or substantial rewriting are larger jobs, so we quote them first.",
  },
  {
    question: "Do I own the finished website?",
    answer:
      "Yes—the normal arrangement is that you own the finished website and the content you supplied or purchased. Your proposal confirms this before work begins. Domains, stock images, fonts, AI tools, and other outside services still follow their providers’ licence terms.",
  },
  {
    question: "What does the Growth monthly fee cover?",
    answer:
      "The $24.99 monthly fee covers ongoing checks, the standard usage listed in your proposal, and minor content updates such as changing supplied text, images, opening hours, or contact details. Growth clients do not pay the $50 Launch update fee for those included updates. Heavy usage, larger website changes, or separate third-party software may cost extra, and you will see any additional cost before work begins.",
  },
  {
    question: "Is the AI receptionist included in Growth?",
    answer:
      "No. It is a separate add-on because phone providers charge ongoing and usage-based fees. We will recommend a suitable option and show you both the setup cost and expected provider cost before you proceed.",
  },
  {
    question: "Are Google or Facebook advertising costs included?",
    answer:
      "No. Your advertising budget is paid separately to Google or Meta. We confirm Labe’s setup or management fee, what work is included, and your planned ad spend before a campaign launches.",
  },
  {
    question: "Can I upgrade from Launch to Growth later?",
    answer:
      "Yes. Launch gives you a strong starting point. You can add Growth features, advertising, or other services later as your enquiry volume and business needs become clearer.",
  },
  {
    question: "Do the conversion-planner numbers guarantee results?",
    answer:
      "No. They are examples based on the enquiry rates shown beneath the calculator. Real results depend on your offer, reputation, location, competition, season, and the quality of your traffic. Labe cannot guarantee a specific number of leads, bookings, or sales.",
  },
] as const;

export function Faq() {
  return (
    <section id="faq" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Straight answers
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl">
              Know exactly what you’re agreeing to.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
              The important details about timing, ownership, costs, and what
              happens once your website is live.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center text-sm font-black text-blue-700 transition-colors hover:text-blue-900"
            >
              Ask Labe a question{" "}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </a>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {questions.map((item, index) => (
              <details
                key={item.question}
                className="faq-item group"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-lg font-black text-slate-950 outline-none transition-colors marker:content-none hover:text-blue-700 focus-visible:text-blue-700 sm:py-7 sm:text-xl">
                  <span>{item.question}</span>
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-blue-600 transition-all duration-300 group-open:rotate-45 group-open:border-blue-200 group-open:bg-blue-50">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="faq-answer overflow-hidden">
                  <p className="max-w-3xl pb-7 pr-12 leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
