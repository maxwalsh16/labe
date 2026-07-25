"use client";

import { FormEvent, useState } from "react";

type Plan = "launch" | "growth";
type AddOn = "google_ads" | "meta_ads" | "ads_bundle" | "ai_receptionist";

const plans = {
  launch: {
    name: "Labe Launch",
    price: "$1,499",
    detail: "Website live in 48 hours. One payment, with no ongoing Labe subscription.",
  },
  growth: {
    name: "Labe Growth",
    price: "$2,999",
    detail:
      "Website live in 48 hours; Growth automation within 5 business days. Then $149/month after a 7-day setup period.",
  },
} as const;

const addOns: ReadonlyArray<{
  id: AddOn;
  name: string;
  price: string;
  detail: string;
  featured?: boolean;
}> = [
  {
    id: "google_ads",
    name: "Google Ads setup",
    price: "$750 setup",
    detail: "Campaign setup, conversion tracking, and landing-page alignment.*",
  },
  {
    id: "meta_ads",
    name: "Meta Ads setup",
    price: "$750 setup",
    detail: "Facebook and Instagram campaign setup with enquiry tracking.*",
  },
  {
    id: "ads_bundle",
    name: "Google + Meta bundle",
    price: "$1,250 setup",
    detail: "Both advertising setups together.* Save $250.",
    featured: true,
  },
  {
    id: "ai_receptionist",
    name: "AI receptionist",
    price: "$299 setup with Launch",
    detail: "Included with Growth. Provider fees apply.*",
  },
] as const;

export function CheckoutForm({ initialPlan }: { initialPlan: Plan }) {
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const oneTimeTotal =
    (plan === "growth" ? 2999 : 1499) +
    (selectedAddOns.includes("google_ads") ? 750 : 0) +
    (selectedAddOns.includes("meta_ads") ? 750 : 0) +
    (selectedAddOns.includes("ads_bundle") ? 1250 : 0) +
    (plan === "launch" && selectedAddOns.includes("ai_receptionist") ? 299 : 0);
  const monthlyTotal = plan === "growth" ? 149 : 0;

  function toggleAddOn(addOn: AddOn) {
    setSelectedAddOns((current) => {
      if (current.includes(addOn)) {
        return current.filter((item) => item !== addOn);
      }

      if (addOn === "ads_bundle") {
        return [
          ...current.filter(
            (item) => item !== "google_ads" && item !== "meta_ads",
          ),
          addOn,
        ];
      }

      if (addOn === "google_ads" || addOn === "meta_ads") {
        return [...current.filter((item) => item !== "ads_bundle"), addOn];
      }

      return [...current, addOn];
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          plan,
          addOns: selectedAddOns,
          termsAccepted: formData.get("termsAccepted") === "on",
        }),
      });
      const result = (await response.json()) as {
        url?: string;
        message?: string;
      };

      if (!response.ok || !result.url) {
        throw new Error(
          result.message ||
            "Checkout could not be opened. Please email hello@labe.com.au.",
        );
      }

      window.location.assign(result.url);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Checkout could not be opened. Please email hello@labe.com.au.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/10 sm:p-9"
    >
      <fieldset>
        <legend className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          1. Choose your package
        </legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {(Object.keys(plans) as Plan[]).map((planKey) => {
            const selected = plan === planKey;
            const option = plans[planKey];

            return (
              <label
                key={planKey}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                  planKey === "growth"
                    ? selected
                      ? "border-blue-400 bg-slate-950 text-white shadow-xl shadow-blue-950/20 ring-2 ring-blue-500/25"
                      : "border-slate-800 bg-slate-950 text-white shadow-lg shadow-slate-950/10 hover:-translate-y-0.5 hover:border-blue-500"
                    : selected
                      ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-600/10 ring-2 ring-blue-500/15"
                      : "border-slate-200 hover:-translate-y-0.5 hover:border-blue-300"
                }`}
              >
                {planKey === "growth" && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-blue-600/30 blur-3xl"
                  />
                )}
                <input
                  type="radio"
                  name="planChoice"
                  value={planKey}
                  checked={selected}
                  onChange={() => setPlan(planKey)}
                  className="sr-only"
                />
                {planKey === "growth" && (
                  <span className="absolute right-3 top-3 rounded-full bg-blue-500 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wide text-white shadow-lg shadow-blue-500/20">
                    Recommended
                  </span>
                )}
                <span
                  className={`relative block text-sm font-black ${
                    planKey === "growth" ? "text-white" : "text-slate-950"
                  }`}
                >
                  {option.name}
                </span>
                <span
                  className={`relative mt-3 block text-3xl font-black tracking-tight ${
                    planKey === "growth" ? "text-white" : "text-slate-950"
                  }`}
                >
                  {option.price}
                </span>
                <span
                  className={`relative mt-2 block pr-2 text-xs leading-5 ${
                    planKey === "growth" ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {option.detail}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-9">
        <legend className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          2. Add anything else you need
        </legend>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Optional—choose now to include it in the same secure checkout, or add
          it later after speaking with Labe.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {addOns.map((addOn) => {
            const includedWithGrowth =
              addOn.id === "ai_receptionist" && plan === "growth";
            const selected =
              includedWithGrowth || selectedAddOns.includes(addOn.id);

            return (
              <label
                key={addOn.id}
                className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                  addOn.featured
                    ? selected
                      ? "border-blue-400 bg-slate-950 text-white shadow-xl shadow-blue-950/20 ring-2 ring-blue-500/25"
                      : "border-blue-500 bg-slate-950 text-white shadow-lg shadow-blue-950/15 hover:-translate-y-0.5 hover:border-blue-400"
                    : includedWithGrowth
                      ? "cursor-default border-blue-400 bg-blue-50 shadow-lg shadow-blue-600/10 ring-2 ring-blue-500/15"
                      : selected
                      ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-600/10 ring-2 ring-blue-500/15"
                      : "cursor-pointer border-slate-200 hover:-translate-y-0.5 hover:border-blue-300"
                }`}
              >
                {addOn.featured && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-blue-600/30 blur-3xl"
                  />
                )}
                <input
                  type="checkbox"
                  name="addOns"
                  value={addOn.id}
                  checked={selected}
                  onChange={() => {
                    if (!includedWithGrowth) toggleAddOn(addOn.id);
                  }}
                  disabled={includedWithGrowth}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border text-sm font-black ${
                    selected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : addOn.featured
                        ? "border-white/25 bg-white/10 text-transparent"
                        : "border-slate-300 bg-white text-transparent"
                  }`}
                >
                  ✓
                </span>
                {addOn.featured && (
                  <span className="relative mb-3 inline-flex flex-wrap gap-2 pr-9">
                    <span className="rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.1em] text-white shadow-lg shadow-orange-500/20">
                      Weekly hot offer
                    </span>
                    <span className="rounded-full bg-blue-500 px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.1em] text-white shadow-lg shadow-blue-500/20">
                      Bundle &amp; save $250
                    </span>
                  </span>
                )}
                {includedWithGrowth && (
                  <span className="relative mb-3 inline-flex rounded-full bg-blue-600 px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.1em] text-white shadow-lg shadow-blue-600/20">
                    Included with Growth
                  </span>
                )}
                <span
                  className={`relative block pr-8 text-sm font-black ${
                    addOn.featured ? "text-white" : "text-slate-950"
                  }`}
                >
                  {addOn.name}
                </span>
                <span
                  className={`relative mt-2 block text-xl font-black tracking-tight ${
                    addOn.featured ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  {includedWithGrowth ? "$0 Labe setup fee" : addOn.price}
                </span>
                <span
                  className={`relative mt-2 block text-xs leading-5 ${
                    addOn.featured ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {includedWithGrowth
                    ? "We’ll set up and tailor your AI receptionist. Provider fees apply.*"
                    : addOn.detail}
                </span>
              </label>
            );
          })}
        </div>
        <p
          id="checkout-ai-provider-note"
          className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-xs leading-5 text-slate-600"
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
            control of the provider account and pay its service plan directly,
            usually from about $99/month plus tax. Provider pricing may change.
          </span>
        </p>
      </fieldset>

      <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-300">
          Your order
        </p>
        <div className="mt-4 flex items-end justify-between gap-5">
          <span className="text-sm font-bold text-slate-300">Due today</span>
          <span className="text-3xl font-black tracking-tight">
            ${oneTimeTotal.toLocaleString("en-AU")}
          </span>
        </div>
        {monthlyTotal > 0 ? (
          <div className="mt-4 flex items-start justify-between gap-5 border-t border-white/10 pt-4">
            <div>
              <span className="block text-sm font-bold text-slate-300">
                Ongoing service
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                Begins seven days after checkout
              </span>
            </div>
            <span className="shrink-0 text-xl font-black text-blue-300">
              ${monthlyTotal.toLocaleString("en-AU")}/month
            </span>
          </div>
        ) : (
          <p className="mt-4 border-t border-white/10 pt-4 text-xs font-bold text-slate-400">
            No recurring Labe subscription.
          </p>
        )}
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Prices are in AUD. Advertising spend and separately disclosed
          third-party costs are not included. Paying today&apos;s total in full
          secures the advertised priority turnaround.
        </p>
      </div>

      <div className="mt-9">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          3. Reserve your build position
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <CheckoutField label="Your name" id="checkout-name">
            <input
              className="form-control"
              id="checkout-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              required
            />
          </CheckoutField>
          <CheckoutField label="Business name" id="checkout-business">
            <input
              className="form-control"
              id="checkout-business"
              name="business"
              type="text"
              autoComplete="organization"
              maxLength={100}
              required
            />
          </CheckoutField>
          <CheckoutField label="Email address" id="checkout-email">
            <input
              className="form-control"
              id="checkout-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={160}
              required
            />
          </CheckoutField>
          <CheckoutField label="Phone number" id="checkout-phone">
            <input
              className="form-control"
              id="checkout-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              required
            />
          </CheckoutField>
        </div>

        <div className="mt-5">
          <CheckoutField
            label="Current website or Facebook page"
            id="checkout-website"
            hint="Optional—leave this blank if you do not have one."
          >
            <input
              className="form-control"
              id="checkout-website"
              name="website"
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="example.com or facebook.com/yourpage"
              maxLength={240}
            />
          </CheckoutField>
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <p className="font-black text-slate-950">
          Your content comes after payment
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          You do not need everything ready today. After payment, Labe will
          collect your logo, photos, colours, wording, service details, and
          other customisation through a simple guided onboarding process.
        </p>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-600">
        <input
          name="termsAccepted"
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600"
          required
        />
        <span>
          I agree to Labe&apos;s{" "}
          <a
            href="/terms"
            target="_blank"
            className="font-bold text-blue-700 underline underline-offset-2"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            target="_blank"
            className="font-bold text-blue-700 underline underline-offset-2"
          >
            Privacy Policy
          </a>
          , and understand that after Labe receives my required content and
          approval to start, the advertised priority timelines apply because
          the package setup price and selected one-off add-ons are being paid
          in full. Deposit or staged-payment arrangements enter the next
          available waiting-list position. Third-party add-ons may require
          additional approval time.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="button-shine mt-7 inline-flex h-14 w-full items-center justify-center rounded-full bg-blue-600 px-7 text-base font-black text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-wait disabled:opacity-65"
      >
        {status === "loading"
          ? "Opening secure checkout…"
          : "Pay securely & reserve priority"}
        {status !== "loading" && (
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        )}
      </button>

      <div aria-live="polite" className="mt-4 min-h-6">
        {message && (
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            {message}
          </p>
        )}
      </div>

      <p className="mt-3 text-center text-xs leading-5 text-slate-500">
        Secure checkout and card processing are provided by Stripe. Labe does
        not receive or store your complete card details.
      </p>
    </form>
  );
}

function CheckoutField({
  label,
  id,
  hint,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-black text-slate-800">
        {label}
        {!hint && (
          <span className="ml-1 text-blue-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && <p className="mt-2 text-xs leading-5 text-slate-500">{hint}</p>}
    </div>
  );
}
