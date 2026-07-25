import { ButtonLink } from "@/components/ui/ButtonLink";
import { CallReceptionistButton } from "@/components/ui/CallReceptionistButton";
import { ChatAgentButton } from "@/components/ui/ChatAgentButton";
import { Container } from "@/components/ui/Container";
import { OfferCountdown } from "@/components/ui/OfferCountdown";
import {
  siAfterpay,
  siApplepay,
  siGooglepay,
  siKlarna,
} from "simple-icons";

const launchFeatures = [
  "A focused 1–2 page website built for enquiries",
  "Looks and works properly on phones",
  "Your custom domain connected",
  "Quote, contact, or booking request form",
  "Tap-to-call, map, and social links",
  "Essential Google setup and visitor tracking",
  "One round of changes before launch",
  "Priority 48-hour build when paid in full",
] as const;

const growthFeatures = [
  "Everything included in Labe Launch",
  "Website live within 48 hours when paid in full",
  "Growth automation complete within 5 business days",
  "AI chat answers common questions, even when you are busy",
  "Asks about the service, location, timing, and other details you choose",
  "Turns every conversation into a clear lead summary",
  "Highlights urgent and better-matched enquiries so you know who to call first",
  "Sends an immediate, professional reply with the right next step",
  "Offers suitable leads a booking link while they are ready to act",
  "Automatically follows up when an enquiry has not booked or replied",
  "AI receptionist setup included—provider fees apply*",
  "Tracks which channels bring you the strongest leads",
  "Ongoing checks keep your lead system working properly",
  "Minor content updates included",
] as const;

const addOns = [
  {
    title: "Google Ads",
    description:
      "Reach people searching for your service, track enquiries, and improve the page they land on.*",
    pricing: "$750 setup",
  },
  {
    title: "Meta Ads",
    description:
      "Reach a relevant local audience on Facebook and Instagram and track the enquiries you receive.*",
    pricing: "$750 setup",
  },
  {
    title: "AI receptionist",
    description:
      "Answer missed calls, capture caller details, and route important enquiries through a suitable AI phone provider. Setup is included with Growth. Provider fees apply.*",
    pricing: "Included with Growth · $299 with Launch",
  },
  {
    title: "Extra content & pages",
    description:
      "Add more services, locations, written content, or page sections when your business needs them.",
    pricing: "Quoted before work",
  },
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-24 -z-0 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
            Pick what fits today
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl">
            Choose the setup that suits your business now.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-600">
            Launch gives customers a professional place to contact you. Growth
            helps answer, qualify, prioritise, and follow up those enquiries
            automatically.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl min-w-0 grid-cols-[minmax(0,1fr)] items-stretch gap-6 lg:grid-cols-2">
          <article
            id="launch-plan"
            className="pricing-card scroll-mt-28 flex min-w-0 flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/[0.05] sm:p-10"
          >
            <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                  Labe Launch
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  Get found, trusted, and contacted.
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600">
                No subscription
              </span>
            </div>

            <div className="mt-9 border-b border-slate-200 pb-9">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black tracking-[-0.06em] text-slate-950 min-[360px]:text-6xl">
                  $1,499
                </span>
                <span className="mb-2 text-sm font-bold text-slate-500">
                  once
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                No ongoing Labe fee. Small future content updates are{" "}
                <strong className="font-black text-slate-900">
                  $75 per request
                </strong>
                ; larger changes are quoted first.
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {launchFeatures.map((feature) => (
                <Feature key={feature}>{feature}</Feature>
              ))}
            </ul>

            <div className="mt-auto flex min-h-[12.5rem] flex-col justify-end pt-12">
              <div className="[&>a]:w-full [&>a]:min-w-0 [&>a]:whitespace-normal [&>a]:px-4 [&>a]:text-center [&>a]:text-sm sm:[&>a]:px-7 sm:[&>a]:text-base">
                <ButtonLink href="/start?plan=launch" secondary size="large">
                  Pay now & reserve priority
                </ButtonLink>
              </div>
              <PaymentMethodBadges buyNowPayLater />
            </div>
          </article>

          <article
            id="growth-plan"
            className="pricing-card growth-card scroll-mt-28 relative flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-blue-500 bg-slate-950 p-6 text-white shadow-2xl shadow-blue-900/20 sm:p-10"
          >
            <div
              aria-hidden="true"
              className="pricing-card-effects absolute inset-0 overflow-hidden rounded-[inherit]"
            >
              <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-600/35 blur-3xl" />
            </div>
            <div className="relative flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-400">
                  Labe Growth
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-tight">
                  Turn more enquiries into paying customers—automatically.
                </h3>
              </div>
              <span className="rounded-full bg-blue-500 px-3 py-1.5 text-xs font-black text-white shadow-lg shadow-blue-500/20">
                Recommended
              </span>
            </div>

            <div className="relative mt-9 border-b border-white/10 pb-9">
              <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                <span className="text-5xl font-black tracking-[-0.06em] min-[360px]:text-6xl">
                  $2,999
                </span>
                <span className="mb-2 text-sm font-bold text-slate-400">
                  setup
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Then{" "}
                <strong className="font-black text-white">$149/month</strong>{" "}
                after a 7-day setup period, covering standard usage, ongoing
                checks, AI receptionist configuration, and one minor content
                update each month. AI receptionist provider fees apply.*
              </p>
            </div>

            <div className="relative mt-7 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-300">
                Your lead system keeps working
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                While you are on a job, with a customer, or finished for the
                day, Growth can answer the first questions, collect the details
                that matter, and move suitable leads towards payment.
              </p>
            </div>

            <ul className="relative mt-8 space-y-4">
              {growthFeatures.map((feature) => (
                <Feature key={feature} inverse>
                  {feature}
                </Feature>
              ))}
            </ul>

            <div className="relative mt-auto flex min-h-[12.5rem] flex-col justify-end pt-12">
              <a
                href="/start?plan=growth"
                className="button-shine inline-flex min-h-14 w-full min-w-0 items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-center text-sm font-black leading-tight text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 sm:px-7 sm:text-base"
              >
                Pay now & reserve priority
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </a>
              <PaymentMethodBadges inverse />
            </div>
          </article>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center rounded-[2rem] border border-blue-200 bg-blue-50/80 px-6 py-8 text-center sm:px-10">
          <p className="text-xl font-black tracking-tight text-slate-950">
            Have a question before you choose and pay?
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Call Labe now. Our AI receptionist can explain the packages, answer
            common questions, and help you take the right next step without
            waiting for an email.
          </p>
          <div className="mt-5 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <CallReceptionistButton
              balanced
              compact
              className="w-full sm:w-auto"
            />
            <ChatAgentButton balanced compact className="w-full sm:w-auto" />
          </div>
        </div>

        <div id="add-ons" className="mx-auto mt-16 max-w-6xl scroll-mt-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
                Optional add-ons
              </p>
              <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Add help where it makes a difference.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              You see and approve the price before work begins. Advertising
              spend is always separate.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {addOns.map((addOn) => (
              <article
                key={addOn.title}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/[0.05]"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                  <h4 className="min-w-0 text-lg font-black text-slate-950">
                    {addOn.title}
                  </h4>
                  <span className="max-w-full rounded-full bg-white px-3 py-1 text-center text-xs font-black leading-4 text-blue-700 shadow-sm [overflow-wrap:anywhere]">
                    {addOn.pricing}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {addOn.description}
                </p>
              </article>
            ))}
          </div>

          <article className="relative mt-4 overflow-hidden rounded-[2rem] border border-blue-500 bg-slate-950 p-6 text-white shadow-2xl shadow-blue-900/15 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-600/30 blur-3xl"
            />
            <div className="relative flex flex-col gap-7">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                    Google + Meta Ads
                  </p>
                  <span className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-white shadow-lg shadow-orange-500/20">
                    Weekly hot offer
                  </span>
                  <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-black text-white shadow-lg shadow-blue-500/20">
                    Bundle &amp; save $250
                  </span>
                </div>
                <h4 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  Reach customers while they search—and while they scroll.
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Get both advertising channels set up with conversion
                  tracking and a clear path back to your website, so every
                  campaign works towards real enquiries.*
                </p>
              </div>

              <div className="flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <OfferCountdown />
                <div className="flex shrink-0 items-end gap-2 sm:flex-col sm:items-end sm:gap-1">
                  <span className="text-4xl font-black tracking-[-0.05em]">
                    $1,250
                  </span>
                  <span className="mb-1 text-sm font-bold text-slate-400 sm:mb-0">
                    setup
                  </span>
                </div>
              </div>
            </div>
          </article>

          <p
            id="ai-provider-note"
            className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-xs leading-5 text-slate-600"
          >
            <strong className="block font-bold text-slate-700/85">
              * Costs and responsibilities
            </strong>
            <span className="mt-2 block">
              <strong className="font-semibold text-slate-700/85">
                Google and Meta Ads:
              </strong>{" "}
              we professionally set up and target your campaigns, including
              conversion tracking. You keep control of your ad spend and decide
              when campaigns run. Ongoing management is available separately.
            </span>
            <span className="mt-2 block">
              <strong className="font-semibold text-slate-700/85">
                AI receptionist:
              </strong>{" "}
              we set up and tailor the receptionist to your business. You keep
              control of the provider account and pay its service plan
              directly, usually from about $99/month plus tax. Provider pricing
              may change.
            </span>
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-xs leading-5 text-amber-950/75">
            Prices are shown in AUD. Any applicable GST is confirmed in your
            proposal. Domain registration or renewal, advertising spend, and
            third-party usage or subscription charges are separate unless your
            written proposal expressly includes them. Your website goes live
            within 48 hours, with Growth automation completed within 5 business
            days, when the package setup price and selected one-off add-ons are
            paid in full. Timelines begin after Labe receives all required
            content, access, and approval to start. Deposit or staged-payment
            projects enter the next available waiting-list position. Add-ons
            involving third-party approval may require additional time.
          </p>
        </div>
      </Container>
    </section>
  );
}

function PaymentMethodBadges({
  inverse = false,
  buyNowPayLater = false,
}: {
  inverse?: boolean;
  buyNowPayLater?: boolean;
}) {
  return (
    <div className="mt-5">
      <p
        className={`text-center text-[0.68rem] font-bold uppercase tracking-[0.12em] ${
          inverse ? "text-slate-500" : "text-slate-400"
        }`}
      >
        Available at secure checkout
      </p>
      <div className="mt-2.5 flex min-h-9 flex-wrap items-center justify-center gap-2">
        <PaymentBadge label="Apple Pay">
          <BrandMark icon={siApplepay} className="h-5 w-[3.25rem]" />
        </PaymentBadge>
        <PaymentBadge label="Google Pay">
          <BrandMark icon={siGooglepay} className="h-5 w-[3.25rem]" />
        </PaymentBadge>
        {buyNowPayLater && (
          <>
            <PaymentBadge label="Afterpay">
              <BrandMark icon={siAfterpay} className="h-5 w-[3.5rem]" />
            </PaymentBadge>
            <PaymentBadge label="Klarna">
              <BrandMark icon={siKlarna} className="h-5 w-[3.25rem]" />
            </PaymentBadge>
          </>
        )}
      </div>
      <p
        className={`mt-2 min-h-8 text-center text-[0.65rem] leading-4 ${
          inverse ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {buyNowPayLater
          ? "Eligible methods appear automatically. Afterpay and Klarna are available for one-time Launch payments only."
          : "Eligible wallet options appear automatically for supported devices and customers."}
      </p>
    </div>
  );
}

function PaymentBadge({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-label={label}
      title={label}
      className="inline-flex h-9 min-w-[4.5rem] items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 text-slate-950 shadow-sm"
    >
      {children}
    </span>
  );
}

function BrandMark({
  icon,
  className,
}: {
  icon: typeof siApplepay;
  className: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ color: `#${icon.hex}` }}
    >
      <path d={icon.path} />
    </svg>
  );
}

function Feature({
  children,
  inverse = false,
}: {
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <li
      className={`flex items-start gap-3 text-sm leading-6 ${
        inverse ? "text-slate-200" : "text-slate-700"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          inverse ? "bg-blue-500/20 text-blue-300" : "bg-blue-50 text-blue-600"
        }`}
      >
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
      <span>{children}</span>
    </li>
  );
}
