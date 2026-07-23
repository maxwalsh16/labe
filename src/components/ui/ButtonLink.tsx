import type { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  secondary?: boolean;
  size?: "small" | "default" | "large";
};

export function ButtonLink({
  children,
  href,
  secondary = false,
  size = "default",
}: ButtonLinkProps) {
  const sizeClasses = {
    small: "h-10 px-5 text-sm",
    default: "h-12 px-6 text-sm",
    large: "h-14 px-7 text-base",
  };

  return (
    <a
      href={href}
      className={`button-shine inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
        sizeClasses[size]
      } ${
        secondary
          ? "border border-slate-300 bg-white text-slate-950 shadow-sm hover:border-slate-400 hover:shadow-md"
          : "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:bg-blue-600 hover:shadow-blue-600/20"
      }`}
    >
      {children}
    </a>
  );
}
