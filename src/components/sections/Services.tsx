"use client";

import { Container } from "@/components/ui/Container";
import { useState, type ReactNode } from "react";

type Service = {
  title: string;
  description: string;
  tag: string;
  href: string;
  icon: IconName;
  className: string;
  dark?: boolean;
  accent?: boolean;
  highlights?: readonly string[];
  expandableOnDesktop?: boolean;
  detailsExpanded?: boolean;
  onToggleDetails?: () => void;
};

const packages: Service[] = [
  {
    title: "Websites that win work",
    description:
      "A fast, professional website that makes it easy for customers to understand your business, call, request a quote, or book.",
    tag: "Labe Launch",
    href: "#launch-plan",
    icon: "browser",
    className: "",
    accent: true,
  },
  {
    title: "Keep enquiries moving while you work.",
    description:
      "AI chat, an AI receptionist, email automation, and Stripe payments help enquiries move forward while you are busy doing the job.",
    tag: "Labe Growth",
    href: "#growth-plan",
    icon: "spark",
    className: "",
    dark: true,
    highlights: ["AI chat", "AI receptionist", "Stripe payments"],
  },
];

const growthInclusions: Service[] = [
  {
    title: "Custom business email",
    description:
      "Look professional from the first reply, with your own business email, custom professional email template, and automated follow-up ready to go.",
    tag: "Growth inclusion",
    href: "#growth-plan",
    icon: "mail",
    className: "",
  },
  {
    title: "Google Business Profile",
    description:
      "Show customers the right business details when they find you on Google, including your services, hours, and contact options.",
    tag: "Growth inclusion",
    href: "#growth-plan",
    icon: "pin",
    className: "",
  },
  {
    title: "AI receptionist",
    description:
      "Make sure every caller gets an answer. Your AI receptionist captures their details and sends important enquiries straight to you.",
    tag: "Growth inclusion",
    href: "#growth-plan",
    icon: "phone",
    className: "",
  },
  {
    title: "AI live chat",
    description:
      "Give website visitors quick answers, collect the details you need, and make it easier for them to take the next step.",
    tag: "Growth inclusion",
    href: "#growth-plan",
    icon: "chat",
    className: "",
  },
  {
    title: "Stripe payment setup",
    description:
      "Give customers a simple, secure way to pay a deposit or invoice online when they are ready to move forward.",
    tag: "Growth inclusion",
    href: "#growth-plan",
    icon: "card",
    className: "",
  },
];

const addOns: Service[] = [
  {
    title: "Google Ads",
    description:
      "Reach people actively searching for your service and send them straight to a page built to win enquiries.",
    tag: "Add-on",
    href: "#add-ons",
    icon: "search",
    className: "",
  },
  {
    title: "Facebook & Instagram Ads",
    description:
      "Reach the right local customers, stay top of mind, and turn attention into real enquiries.",
    tag: "Add-on",
    href: "#add-ons",
    icon: "megaphone",
    className: "",
  },
  {
    title: "Extra content & pages",
    description:
      "Add more services, locations, written content, or page sections as your business grows.",
    tag: "Add-on",
    href: "#add-ons",
    icon: "browser",
    className: "",
  },
];

type IconName =
  | "browser"
  | "spark"
  | "mail"
  | "pin"
  | "search"
  | "megaphone"
  | "phone"
  | "chat"
  | "card";

export function Services() {
  const [areGrowthDetailsExpanded, setAreGrowthDetailsExpanded] =
    useState(false);

  return (
    <section id="services" className="bg-slate-50 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
            One team. Everything connected.
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl">
            Your website, AI, and advertising—all working together.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-600">
            One connected setup to get your business found, turn more enquiries
            into customers, get paid faster, and spend less time on admin.
          </p>
        </div>

        <div className="mt-14">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
            Our packages
          </p>
          <div className="mt-5 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
            {packages.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>

        <div className="relative mt-7 overflow-hidden rounded-[2rem] border border-blue-200 bg-blue-50/60 p-5 sm:p-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-blue-300"
          />
          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2 sm:items-end sm:gap-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
                  Growth inclusions
                </p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  Everything working behind the website.
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-600 sm:justify-self-end">
                Everything included with Growth to help more customers find
                you, get answers fast, and move towards payment.
              </p>
            </div>
            <div className="mt-8 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 lg:grid-cols-5">
              {growthInclusions.map((service) => (
                <ServiceCard
                  key={service.title}
                  {...service}
                  expandableOnDesktop
                  detailsExpanded={areGrowthDetailsExpanded}
                  onToggleDetails={() =>
                    setAreGrowthDetailsExpanded((expanded) => !expanded)
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
            Add-ons
          </p>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Bring in more customers when you are ready.
          </h3>
          <div className="mt-5 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 lg:grid-cols-3">
            {addOns.map((service) => (
            <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500">
          Ad spend and any third-party phone, AI, or software costs are separate.
          You will see and approve those costs before anything is switched on.
        </p>
      </Container>
    </section>
  );
}

function ServiceCard({
  title,
  description,
  tag,
  href,
  icon,
  className,
  dark = false,
  accent = false,
  highlights,
  expandableOnDesktop = false,
  detailsExpanded = false,
  onToggleDetails,
}: Service) {
  return (
    <article
      role="link"
      tabIndex={0}
      onClick={(event) => {
        if ((event.target as Element).closest("a, button")) return;
        window.location.href = href;
      }}
      onKeyDown={(event) => {
        if ((event.target as Element).closest("a, button")) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = href;
        }
      }}
      className={`service-card group relative isolate min-w-0 min-h-72 cursor-pointer overflow-hidden rounded-[2rem] border p-6 outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-blue-500/30 sm:p-8 ${className} ${
        dark
          ? "border-blue-400/80 bg-slate-950 text-white shadow-2xl shadow-blue-900/30 ring-4 ring-blue-500/10"
          : accent
            ? "border-blue-200 bg-blue-600 text-white shadow-2xl shadow-blue-600/15"
            : "border-slate-200 bg-white text-slate-950 shadow-lg shadow-slate-900/[0.035]"
      }`}
    >
      <div
        aria-hidden="true"
        className="service-card-effects absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        <div
          className={`service-card-glow absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-75 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
            dark
              ? "bg-blue-500/45"
              : accent
                ? "bg-white/20"
                : "bg-blue-200/45"
          }`}
        />
        {dark && (
          <>
            <div className="service-card-glow absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-cyan-500/15 opacity-75 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
          </>
        )}
      </div>
      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 ${
              dark || accent
                ? "border-white/15 bg-white/10 text-white"
                : "border-blue-100 bg-blue-50 text-blue-600"
            }`}
          >
            <ServiceIcon name={icon} />
          </span>
          <span
            className={`max-w-full rounded-full px-3 py-1.5 text-center text-xs font-black leading-4 ${
              dark
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                : accent
                  ? "bg-white/10 text-white/80"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {dark ? "Most complete · Labe Growth" : tag}
          </span>
        </div>
        <div className="mt-10 flex flex-1 flex-col">
          <div className="md:flex md:min-h-24 md:flex-col md:justify-end">
            <h3 className="text-2xl font-black tracking-tight">{title}</h3>
          </div>
          <p
            className={`mt-3 max-w-xl leading-7 ${
              dark || accent ? "text-white/70" : "text-slate-600"
            } ${
              expandableOnDesktop && !detailsExpanded ? "md:hidden" : ""
            }`}
          >
            {description}
          </p>
          {highlights && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {highlights.map((highlight, index) => (
                <span key={highlight} className="contents">
                  <span className="rounded-full border border-blue-300/20 bg-blue-500/15 px-3 py-1.5 text-xs font-black text-blue-100">
                    {highlight}
                  </span>
                  {index < highlights.length - 1 && (
                    <span aria-hidden="true" className="text-blue-300/70">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}
          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            {expandableOnDesktop && (
              <button
                type="button"
                onClick={onToggleDetails}
                aria-expanded={detailsExpanded}
                className="hidden items-center gap-1.5 text-sm font-black text-slate-600 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 md:inline-flex"
              >
                {detailsExpanded ? "Less" : "More"}
                <span aria-hidden="true" className="text-base leading-none">
                  {detailsExpanded ? "−" : "+"}
                </span>
              </button>
            )}
            <a
              href={href}
              className={`inline-flex shrink-0 items-center text-sm font-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 ${
                dark || accent ? "text-white" : "text-blue-700"
              } ${expandableOnDesktop ? "ml-auto" : ""}`}
            >
              View price
              <span
                aria-hidden="true"
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function ServiceIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    browser: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 8h18M7 6h.01M10 6h.01" />
      </>
    ),
    spark: (
      <>
        <path d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10.5c0 5.2-7 10.5-7 10.5S5 15.7 5 10.5a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10.5" r="2.25" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 4.5 4.5" />
      </>
    ),
    megaphone: (
      <>
        <path d="M4 13V9l13-5v14L4 13Z" />
        <path d="m7 14 1 6h4l-1.5-5" />
      </>
    ),
    phone: (
      <path d="M7.2 3.5H4.5A1.5 1.5 0 0 0 3 5c0 8.8 7.2 16 16 16a1.5 1.5 0 0 0 1.5-1.5v-2.7l-4.3-1.4-1.1 2.1a13 13 0 0 1-8.6-8.6l2.1-1.1-1.4-4.3Z" />
    ),
    chat: (
      <>
        <path d="M4.5 5.5A3.5 3.5 0 0 1 8 2h8a3.5 3.5 0 0 1 3.5 3.5v5A3.5 3.5 0 0 1 16 14h-4.5L7 18v-4H8A3.5 3.5 0 0 1 4.5 10.5v-5Z" />
        <path d="M9 8h.01M12 8h.01M15 8h.01" />
      </>
    ),
    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
