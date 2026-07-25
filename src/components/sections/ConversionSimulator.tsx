"use client";

import { Container } from "@/components/ui/Container";
import { useEffect, useMemo, useRef, useState } from "react";

type IndustryKey = "trades" | "professional" | "wellness" | "hospitality";

const industries: Record<
  IndustryKey,
  { label: string; multiplier: number; example: string }
> = {
  trades: {
    label: "Trades & home services",
    multiplier: 1,
    example: "plumber, electrician, cleaner",
  },
  professional: {
    label: "Professional services",
    multiplier: 0.85,
    example: "accountant, broker, consultant",
  },
  wellness: {
    label: "Health & wellness",
    multiplier: 1.05,
    example: "clinic, physio, beauty",
  },
  hospitality: {
    label: "Hospitality & venues",
    multiplier: 1.15,
    example: "restaurant, café, event venue",
  },
};

const packages = [
  {
    name: "Launch",
    label: "Focused website",
    rate: 0.032,
    colour: "bg-slate-300",
    text: "text-slate-700",
  },
  {
    name: "Growth",
    label: "Automated follow-up",
    rate: 0.048,
    colour: "bg-blue-400",
    text: "text-blue-700",
  },
  {
    name: "Growth +",
    label: "Growth with add-ons",
    rate: 0.064,
    colour: "bg-blue-600",
    text: "text-blue-700",
  },
] as const;

export function ConversionSimulator() {
  const [visitors, setVisitors] = useState(800);
  const [industry, setIndustry] = useState<IndustryKey>("trades");
  const [barsVisible, setBarsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBarsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );

    observer.observe(chart);
    return () => observer.disconnect();
  }, []);

  const results = useMemo(
    () =>
      packages.map((item) => ({
        ...item,
        enquiries: Math.round(
          visitors * item.rate * industries[industry].multiplier,
        ),
      })),
    [industry, visitors],
  );

  const maximum = Math.max(...results.map((item) => item.enquiries));

  return (
    <section
      id="results"
      className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-3xl"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Make every website visit count
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] sm:text-6xl">
            Win more enquiries from the visitors you already have.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300">
            Choose your business type and monthly visitors to see how many
            enquiries each Labe setup could generate.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/30 backdrop-blur sm:mt-16">
          <div className="grid gap-8 border-b border-white/10 p-6 sm:p-8 lg:grid-cols-[1fr_1.35fr] lg:gap-14 lg:p-10">
            <div>
              <label
                htmlFor="business-type"
                className="text-sm font-bold text-slate-200"
              >
                What kind of business do you run?
              </label>
              <div className="relative mt-3">
                <select
                  id="business-type"
                  value={industry}
                  onChange={(event) =>
                    setIndustry(event.target.value as IndustryKey)
                  }
                  className="h-14 w-full appearance-none rounded-2xl border border-white/15 bg-white/10 px-4 pr-11 text-base font-semibold text-white outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/15"
                >
                  {Object.entries(industries).map(([key, item]) => (
                    <option key={key} value={key} className="text-slate-950">
                      {item.label}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="m6 8 4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                For example: {industries[industry].example}
              </p>
            </div>

            <div>
              <div className="flex items-end justify-between gap-4">
                <label
                  htmlFor="monthly-visitors"
                  className="text-sm font-bold text-slate-200"
                >
                  Estimated website visitors each month
                </label>
                <output
                  htmlFor="monthly-visitors"
                  className="text-3xl font-black tracking-tight text-white"
                >
                  {visitors.toLocaleString()}
                </output>
              </div>
              <input
                id="monthly-visitors"
                type="range"
                min="100"
                max="2500"
                step="100"
                value={visitors}
                onInput={(event) =>
                  setVisitors(Number(event.currentTarget.value))
                }
                className="conversion-range mt-5 w-full"
                style={
                  {
                    "--range-progress": `${((visitors - 100) / 2400) * 100}%`,
                  } as React.CSSProperties
                }
              />
              <div className="mt-3 flex justify-between text-xs font-semibold text-slate-500">
                <span>100</span>
                <span>2,500</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">Possible monthly enquiries</h3>
                <p className="mt-1 text-sm text-slate-400">
                  An example based on the assumptions below
                </p>
              </div>
              <span className="hidden rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-bold text-blue-300 sm:inline-flex">
                Live comparison
              </span>
            </div>

            <div
              ref={chartRef}
              aria-live="polite"
              className="mt-10 grid min-h-[22rem] grid-cols-3 items-end gap-3 sm:gap-6"
            >
              {results.map((item, index) => {
                const barHeight = Math.max(
                  24,
                  Math.round((item.enquiries / maximum) * 100),
                );

                return (
                  <div
                    key={item.name}
                    className="flex h-full min-w-0 flex-col justify-end text-center"
                  >
                    <div className="mb-4">
                      <strong className="block text-3xl font-black tracking-tight sm:text-5xl">
                        {item.enquiries}
                      </strong>
                      <span className="mt-1 block text-xs text-slate-400 sm:text-sm">
                        enquiries
                      </span>
                    </div>
                    <div className="flex h-52 items-end sm:h-60">
                      <div
                        className={`conversion-bar relative w-full rounded-t-2xl ${item.colour} ${
                          barsVisible ? "conversion-bar-visible" : ""
                        }`}
                        style={
                          {
                            "--bar-height": `${barHeight}%`,
                            "--bar-delay": `${index * 120}ms`,
                          } as React.CSSProperties
                        }
                      >
                        {index === 2 && (
                          <span className="absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950 sm:block">
                            Most complete setup
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="min-h-24 border-t border-white/10 pt-4 sm:min-h-20">
                      <strong className="block text-sm font-black sm:text-base">
                        {item.name}
                      </strong>
                      <span
                        className={`mt-1 text-[0.65rem] leading-4 text-slate-400 sm:block sm:text-xs sm:leading-5 ${
                          index === 2 ? "block" : "hidden"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/15 px-6 py-5 sm:px-8 lg:px-10">
            <p className="text-xs leading-5 text-slate-400">
              <strong className="font-bold text-slate-300">
                Example only—not a guarantee.
              </strong>{" "}
              This calculator uses assumed enquiry rates of 3.2%, 4.8% and
              6.4%, adjusted slightly by business category. Your results will
              depend on your offer, reputation, location, competition, and the
              quality of your website traffic.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
