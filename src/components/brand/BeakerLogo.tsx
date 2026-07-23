type BeakerLogoProps = {
  showWordmark?: boolean;
  inverse?: boolean;
  compact?: boolean;
};

export function BeakerLogo({
  showWordmark = true,
  inverse = false,
  compact = false,
}: BeakerLogoProps) {
  return (
    <span className="group inline-flex h-8 items-center justify-center gap-2.5">
      <svg
        aria-hidden="true"
        className={`${compact ? "h-8 w-8" : "h-9 w-9"} overflow-visible drop-shadow-[0_8px_16px_rgba(37,99,235,0.2)]`}
        viewBox="0 0 48 48"
        fill="none"
      >
        <rect width="48" height="48" rx="14" className="fill-blue-600" />
        <path
          d="M18 10h12M20 10v10.3l-7.1 12.5A3.5 3.5 0 0 0 16 38h16a3.5 3.5 0 0 0 3.1-5.2L28 20.3V10"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.6 29.4c3.6-1.7 6.2 1.6 9.9-.1 2.6-1.2 5-.2 6.8.9l2.1 3.8a2.6 2.6 0 0 1-2.3 3.9H15.9a2.6 2.6 0 0 1-2.3-3.9l2-3.6v-1Z"
          className="fill-[#f7faff]"
        />
        <circle
          cx="22"
          cy="26"
          r="1.7"
          className="beaker-bubble fill-white"
        />
        <circle
          cx="28.5"
          cy="22"
          r="1.25"
          className="beaker-bubble beaker-bubble-delay fill-white/90"
        />
      </svg>
      {showWordmark && (
        <span
          className={`inline-flex h-8 items-center font-[family-name:var(--font-labe-display)] text-[1.075rem] font-bold leading-none tracking-[0.11em] [font-kerning:normal] ${
            inverse ? "text-white" : "text-slate-950"
          }`}
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-px">
            L
          </span>
          <span className="inline-block transition-transform delay-75 duration-300 group-hover:-translate-y-px">
            A
          </span>
          <span className="inline-block transition-transform delay-100 duration-300 group-hover:-translate-y-px">
            B
          </span>
          <span className="-mr-[0.11em] inline-block transition-transform delay-150 duration-300 group-hover:-translate-y-px">
            E
          </span>
        </span>
      )}
    </span>
  );
}
