import { BeakerLogo } from "@/components/brand/BeakerLogo";
import { CallReceptionistButton } from "@/components/ui/CallReceptionistButton";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { siX } from "simple-icons";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <Container>
        <div className="grid gap-12 pb-10 pt-16 md:grid-cols-[1.3fr_0.7fr_0.7fr] md:pb-12 md:pt-20">
          <div>
            <Link
              href="/"
              aria-label="Labe home"
              className="inline-flex text-white"
            >
              <BeakerLogo inverse />
            </Link>
            <p className="mt-6 max-w-md text-pretty leading-7 text-slate-400">
              Websites, automated follow-up, and practical AI solutions that
              help small businesses win more enquiries and spend less time on
              admin.
            </p>
            <p className="mt-6 text-sm font-semibold text-slate-500">
              Built in Adelaide, South Australia.
            </p>
            <address className="mt-2 max-w-sm text-sm not-italic leading-6 text-slate-500">
              Level 30, 91 King William Street
              <br />
              Adelaide, Australia
            </address>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              ABN 60 802 842 481
            </p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Explore
            </p>
            <nav aria-label="Footer navigation" className="mt-5 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Contact
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <CallReceptionistButton
                tone="dark"
                compact
                className="self-start"
              />
              <a
                href="mailto:hello@labe.com.au"
                className="text-sm font-bold text-slate-300 transition-colors hover:text-white"
              >
                hello@labe.com.au
              </a>
              <address className="text-sm font-bold not-italic leading-6 text-slate-300">
                Level 30, 91 King William Street
                <br />
                Adelaide, Australia
              </address>
              <a
                href="#contact"
                className="text-sm font-bold text-slate-300 transition-colors hover:text-white"
              >
                Tell us about your business
              </a>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://www.facebook.com/share/19ENGSTuSX"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Labe on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/50 hover:bg-blue-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-400"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4.5 w-4.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.5 21v-8h2.75l.41-3.12H13.5v-2c0-.9.25-1.52 1.59-1.52h1.7V3.57c-.29-.04-1.3-.12-2.47-.12-2.44 0-4.11 1.49-4.11 4.23v2.2H7.45V13h2.76v8h3.29Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/labe.labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Labe on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-400/50 hover:bg-gradient-to-br hover:from-violet-600 hover:via-pink-500 hover:to-orange-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-pink-400"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4.5 w-4.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://x.com/labe_labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Labe on X"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={siX.path} />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/max-walsh-a4a594424"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Max Walsh on LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/50 hover:bg-[#0A66C2] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-400"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Labe Labs. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#contact" className="transition-colors hover:text-white">
              Contact
            </a>
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
