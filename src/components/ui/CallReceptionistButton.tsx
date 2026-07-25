type CallReceptionistButtonProps = {
  tone?: "light" | "blue" | "dark";
  compact?: boolean;
  balanced?: boolean;
  showNumber?: boolean;
  className?: string;
};

const PHONE_HREF = "tel:+61414785829";

export function CallReceptionistButton({
  tone = "light",
  compact = false,
  balanced = false,
  showNumber = true,
  className = "",
}: CallReceptionistButtonProps) {
  const tones = {
    light:
      "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-600/25 hover:border-blue-500 hover:bg-blue-500 focus-visible:outline-blue-600",
    blue:
      "border-white/25 bg-white text-blue-700 shadow-xl shadow-blue-950/15 hover:bg-blue-50 focus-visible:outline-white",
    dark:
      "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-950/20 hover:border-blue-500 hover:bg-blue-500 focus-visible:outline-blue-400",
  };

  return (
    <a
      href={PHONE_HREF}
      aria-label="Call Labe's AI receptionist on 0414 785 829"
      className={`group items-center justify-center gap-3 rounded-full border font-black transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${
        balanced
          ? "grid grid-cols-[2rem_minmax(0,1fr)_2rem] sm:inline-flex"
          : "inline-flex"
      } ${
        compact ? "min-h-11 px-4 text-sm" : "min-h-14 px-6 text-base"
      } ${tones[tone]} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center rounded-full ${
          compact ? "h-7 w-7" : "h-8 w-8"
        } ${
          tone === "blue"
            ? "bg-blue-100 text-blue-700"
            : "bg-white/15 text-white group-hover:bg-white/20"
        }`}
      >
        <svg
          className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" />
        </svg>
      </span>
      <span>
        Call Labe now
        {showNumber ? (
          <span className="ml-2 hidden font-bold opacity-70 sm:inline">
            0414 785 829
          </span>
        ) : null}
      </span>
      {balanced ? (
        <span className="h-8 w-8 sm:hidden" aria-hidden="true" />
      ) : null}
    </a>
  );
}
