import { Container } from "@/components/ui/Container";

const questions = [
  {
    question: "What if I’m not confident with technology or AI?",
    answer:
      "That is completely fine—you do not need to be technical. Labe handles the setup, explains everything in plain English, and shows you exactly how to use anything you need. We keep the day-to-day experience simple, guide you through it step by step, and are here if you need help after launch.",
  },
  {
    question: "How quickly will my website and automation be ready?",
    answer:
      "When the package setup price and selected one-off add-ons are paid in full, your website goes live within 48 hours. Growth inclusions and any selected add-ons are completed within 5 business days. After payment, we send your onboarding link by email. Timelines begin once we have your completed questionnaire, content, images, required account access, and approval to start. Time spent waiting for missing details or feedback is not counted. Some add-ons may need extra third-party approval time, which we confirm before work begins.",
  },
  {
    question: "What if I pay a deposit or use staged payments?",
    answer:
      "Deposits and staged payments are available by arrangement. These projects are scheduled into the next available waiting-list position. Priority delivery applies when the package setup price and selected one-off add-ons due today are paid in full.",
  },
  {
    question: "What are the current package and add-on prices?",
    answer:
      "Labe Launch is $1,999 once. Labe Growth is $2,999 setup, followed by $149 per month after a 7-day setup period. With Launch, business email, a custom professional email template, and email automation are $599; Google Business Profile setup and optimisation is $349; and AI receptionist setup is $499. Google Ads setup is $750, Meta Ads setup is $750, and the current Google + Meta bundle is $1,250. Prices are in AUD. Advertising spend, domains, and third-party provider costs are separate unless we expressly include them.",
  },
  {
    question: "What is included with Labe Growth?",
    answer:
      "Growth includes everything in Launch, plus a custom business email, professional email template and email automation; Google Business Profile setup and optimisation; AI receptionist setup; AI live chat setup; and Stripe payment setup. It is designed to help customers find you, get answers, share the right details, and take the next step while you stay focused on your work. Advertising spend and third-party provider costs remain separate.",
  },
  {
    question: "Does Labe Launch really have no monthly subscription?",
    answer:
      "Yes. There is no recurring Labe fee for Launch. Your domain and any optional third-party services are separate. Small content changes after launch cost $75 per request, and we quote larger changes before starting.",
  },
  {
    question: "What counts as a $75 minor update?",
    answer:
      "Examples include changing opening hours, replacing supplied text or an image, or updating contact details. New pages, sections, designs, integrations, or substantial rewriting are larger jobs, so we quote them first.",
  },
  {
    question: "Do I own the finished website?",
    answer:
      "Yes. Once your project is paid in full, you own your finished website, brand content, and materials created specifically for your business. Your domain, Google Business Profile, Stripe account, email account, AI receptionist account, AI chat account, email automation account, advertising accounts, and customer data remain yours. Labe keeps ownership of its reusable templates, components, internal systems, and processes. With Growth, you are paying for ongoing support, maintenance, automation management, and updates—not renting your website. If Growth ends, your website remains yours; we help you wind down or hand over the managed services.",
  },
  {
    question: "What does the Growth monthly fee cover?",
    answer:
      "The $149 monthly service starts seven days after checkout. It covers ongoing support, maintenance, automation management, and updates to keep your Growth setup running smoothly. This includes regular checks, upkeep of third-party services, and one minor content update each month—such as supplied text, an image, opening hours, or contact details. Priority delivery only requires the one-off setup payment to be paid in full; future monthly or provider fees do not need to be prepaid. Third-party subscriptions, higher usage, larger updates, or new tools are separate, and we explain any extra cost before work begins.",
  },
  {
    question: "Is the AI receptionist included in Growth?",
    answer:
      "Yes—the Labe setup is included with Growth. We configure the AI receptionist around your business, services, common questions, lead details, notifications, and call flow, then show you how it works. You create or authorise the provider account and pay its subscription directly. Depending on the phone number, call forwarding, and routing setup you need, separate telco costs may also apply; we explain these before setup. With Launch, Labe’s receptionist setup costs $499 once, plus the separate provider subscription and any applicable telco costs.",
  },
  {
    question: "Are Google or Facebook advertising costs included?",
    answer:
      "No. The $750 Google setup, $750 Meta setup, or current $1,250 combined bundle covers Labe’s setup work—not the money paid to the advertising platforms. Your advertising budget is paid separately to Google or Meta. We confirm what is included, the campaign timeline, and your planned ad spend before launch.",
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
