"use client";

import { FormEvent, useState } from "react";

type Plan = "launch" | "growth";

const plans = {
  launch: {
    name: "Labe Launch",
    price: "$999",
    detail: "One payment. No ongoing Labe subscription.",
  },
  growth: {
    name: "Labe Growth",
    price: "$1,999",
    detail: "$1,999 today, then $24.99 per month.",
  },
} as const;

export function CheckoutForm({ initialPlan }: { initialPlan: Plan }) {
  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

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
                className={`relative cursor-pointer rounded-2xl border p-5 transition-all ${
                  selected
                    ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-600/10 ring-2 ring-blue-500/15"
                    : "border-slate-200 hover:border-blue-300"
                }`}
              >
                <input
                  type="radio"
                  name="planChoice"
                  value={planKey}
                  checked={selected}
                  onChange={() => setPlan(planKey)}
                  className="sr-only"
                />
                {planKey === "growth" && (
                  <span className="absolute right-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wide text-white">
                    Recommended
                  </span>
                )}
                <span className="block text-sm font-black text-slate-950">
                  {option.name}
                </span>
                <span className="mt-3 block text-3xl font-black tracking-tight text-slate-950">
                  {option.price}
                </span>
                <span className="mt-2 block pr-2 text-xs leading-5 text-slate-600">
                  {option.detail}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-9">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          2. Reserve your build position
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
          , and understand that the 48-hour build begins after Labe receives my
          required content and approval to start.
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
