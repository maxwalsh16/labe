"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(
      formData.entries(),
    );
    payload.consent = formData.get("consent") === "on";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          result.message ||
            "The form could not be sent. Please email hello@labe.com.au.",
        );
      }

      form.reset();
      setStatus("success");
      setMessage(
        result.message || "Thanks—your enquiry has been sent to Labe.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "The form could not be sent. Please email hello@labe.com.au.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/25 bg-white p-6 text-slate-950 shadow-2xl shadow-blue-950/25 sm:p-9"
    >
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
          Tell us about your business
        </p>
        <h3 className="mt-2 text-3xl font-black tracking-tight">
          What would make the biggest difference?
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Share the basics and Labe will reply with a practical recommendation,
          clear price and next step.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" id="name" required>
          <input
            className="form-control"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
          />
        </Field>
        <Field label="Business name" id="business" required>
          <input
            className="form-control"
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            maxLength={100}
            required
          />
        </Field>
        <Field label="Email address" id="email" required>
          <input
            className="form-control"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            required
          />
        </Field>
        <Field label="Phone number" id="phone">
          <input
            className="form-control"
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
          />
        </Field>
        <Field
          label="Current website or Facebook page"
          id="website"
          hint="Optional—leave this blank if you do not have one."
        >
          <input
            className="form-control"
            id="website"
            name="website"
            type="text"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="example.com or facebook.com/yourpage"
            maxLength={240}
          />
        </Field>
        <Field label="What do you need help with?" id="interest" required>
          <select
            className="form-control"
            id="interest"
            name="interest"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Choose what sounds closest
            </option>
            <option value="launch">Labe Launch — $1,999</option>
            <option value="growth">Labe Growth — $2,999 + $149/month</option>
            <option value="google-ads">Google Ads setup — $750</option>
            <option value="meta-ads">Meta Ads setup — $750</option>
            <option value="ads-bundle">
              Google + Meta bundle — currently $1,250
            </option>
            <option value="receptionist">
              AI receptionist — included with Growth, or $499 setup with Launch
            </option>
            <option value="unsure">Not sure yet</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="What would you like to improve?"
          id="project-message"
          required
        >
          <textarea
            className="form-control min-h-36 resize-y py-3"
            id="project-message"
            name="message"
            maxLength={2000}
            placeholder="For example: We miss calls while working, and our current website does not bring in many quote requests."
            required
          />
        </Field>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company website</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-600">
        <input
          name="consent"
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600"
          required
        />
        <span>
          I agree that Labe may use these details to respond to this enquiry in
          accordance with its{" "}
          <a
            href="/privacy"
            className="font-bold text-blue-700 underline underline-offset-2"
          >
            privacy policy
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="button-shine mt-7 inline-flex h-14 w-full items-center justify-center rounded-full bg-slate-950 px-7 text-base font-black text-white shadow-xl shadow-slate-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 disabled:cursor-wait disabled:opacity-65"
      >
        {status === "submitting" ? "Sending…" : "Get my recommendation"}
        {status !== "submitting" && (
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        )}
      </button>

      <div aria-live="polite" className="mt-4 min-h-6">
        {message && (
          <p
            className={`rounded-xl px-4 py-3 text-sm leading-6 ${
              status === "success"
                ? "bg-emerald-50 text-emerald-800"
                : "bg-amber-50 text-amber-900"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  required = false,
  hint,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-black text-slate-800">
        {label}
        {required && (
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
