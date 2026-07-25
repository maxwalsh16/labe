import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

const services: Array<{
  title: string;
  description: string;
  tag: string;
  href: string;
  icon: IconName;
  className: string;
  dark?: boolean;
  accent?: boolean;
  highlights?: readonly string[];
}> = [
  {
    title: "Lead-generation websites",
    description:
      "A fast, professional website that makes it easy for customers to call, request a quote, or book.",
    tag: "Labe Launch",
    href: "#launch-plan",
    icon: "browser",
    className: "lg:col-span-2",
    accent: true,
  },
  {
    title: "Turn more enquiries into paying customers",
    description:
      "Growth answers the first questions, collects the details that matter, and keeps suitable leads moving towards payment—even when you are busy.",
    tag: "Labe Growth",
    href: "#growth-plan",
    icon: "spark",
    className: "lg:row-span-2",
    dark: true,
    highlights: ["Answers", "Qualifies", "Follows up"],
  },
  {
    title: "Google Ads",
    description:
      "Reach people already searching for your service and send them to a page built to turn clicks into enquiries.",
    tag: "Add-on",
    href: "#add-ons",
    icon: "search",
    className: "",
  },
  {
    title: "Facebook & Instagram Ads",
    description:
      "Put your business in front of the right local audience and track which ads lead to real enquiries.",
    tag: "Add-on",
    href: "#add-ons",
    icon: "megaphone",
    className: "",
  },
  {
    title: "Booking & email automation",
    description:
      "Send confirmations, reminders, and automated follow-up messages so fewer leads go cold.",
    tag: "Growth feature",
    href: "#growth-plan",
    icon: "flow",
    className: "lg:col-span-2",
  },
  {
    title: "AI receptionist",
    description:
      "Give callers an answer when you cannot pick up, capture their details, and route important calls through a suitable AI phone provider. Setup is included with Growth.",
    tag: "Growth feature",
    href: "#growth-plan",
    icon: "phone",
    className: "",
  },
];

type IconName =
  | "browser"
  | "spark"
  | "search"
  | "megaphone"
  | "flow"
  | "phone";

export function Services() {
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
            We bring your website, enquiries, bookings, AI receptionist,
            automated follow-up, and advertising together—so you can win more
            work with less admin.
          </p>
        </div>

        <div className="mt-14 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
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
}: (typeof services)[number]) {
  return (
    <a
      href={href}
      className={`service-card group relative isolate min-w-0 min-h-72 overflow-hidden rounded-[2rem] border p-6 outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 sm:p-8 ${className} ${
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
        <div className="mt-auto pt-12">
          <h3 className="text-2xl font-black tracking-tight">{title}</h3>
          <p
            className={`mt-3 max-w-xl leading-7 ${
              dark || accent ? "text-white/70" : "text-slate-600"
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
          <span
            className={`mt-5 inline-flex items-center text-sm font-black ${
              dark || accent ? "text-white" : "text-blue-700"
            }`}
          >
            View price
            <span
              aria-hidden="true"
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </a>
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
    flow: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="2" />
        <rect x="15" y="15" width="6" height="6" rx="2" />
        <path d="M9 6h3a5 5 0 0 1 5 5v4M15 18h-3a5 5 0 0 1-5-5V9" />
      </>
    ),
    phone: (
      <path d="M7.2 3.5H4.5A1.5 1.5 0 0 0 3 5c0 8.8 7.2 16 16 16a1.5 1.5 0 0 0 1.5-1.5v-2.7l-4.3-1.4-1.1 2.1a13 13 0 0 1-8.6-8.6l2.1-1.1-1.4-4.3Z" />
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
