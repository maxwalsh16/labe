"use client";

import { BeakerLogo } from "@/components/brand/BeakerLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { navigation } from "@/lib/content";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const previousScrollY = useRef(0);

  useEffect(() => {
    previousScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - previousScrollY.current;

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (scrollDifference > 5) {
        setIsVisible(false);
      } else if (scrollDifference < -5) {
        setIsVisible(true);
      }

      previousScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`pointer-events-none sticky top-0 z-50 h-0 transform-gpu transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-[calc(100%+5rem)] opacity-0"
      }`}
    >
      <Container className="pt-3 sm:pt-4">
        <div className="pointer-events-auto flex h-16 items-center justify-between rounded-[1.35rem] border border-white/80 bg-white/82 px-3 shadow-[0_12px_42px_rgba(15,23,42,0.1),0_2px_8px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/[0.035] backdrop-blur-2xl sm:px-4 lg:px-5">
          <a
            href="#top"
            aria-label="Back to the top of the Labe website"
            className="inline-flex h-11 items-center rounded-xl text-slate-950 transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <BeakerLogo compact />
          </a>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100/80 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden sm:block">
            <ButtonLink href="#pricing" size="small">
              Start your launch
            </ButtonLink>
          </div>
          <a
            href="#pricing"
            className="inline-flex h-10 items-center rounded-full bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition-transform active:scale-[0.98] sm:hidden"
          >
            Get started
          </a>
        </div>
      </Container>
    </header>
  );
}
