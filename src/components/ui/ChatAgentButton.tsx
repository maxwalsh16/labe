"use client";

import { useChatAgent } from "@/components/ui/JotformChatDialog";

type ChatAgentButtonProps = {
  tone?: "light" | "blue" | "dark";
  compact?: boolean;
  className?: string;
};

export function ChatAgentButton({
  tone = "light",
  compact = false,
  className = "",
}: ChatAgentButtonProps) {
  const { openChat } = useChatAgent();
  const tones = {
    light:
      "border-slate-200 bg-white text-slate-950 shadow-lg shadow-slate-950/10 hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-blue-600",
    blue:
      "border-white/25 bg-blue-950/25 text-white shadow-xl shadow-blue-950/15 hover:bg-blue-950/40 focus-visible:outline-white",
    dark:
      "border-white/15 bg-white/[0.07] text-white shadow-lg shadow-slate-950/20 hover:border-blue-400/50 hover:bg-white/[0.12] focus-visible:outline-blue-400",
  };

  return (
    <button
      type="button"
      onClick={openChat}
      aria-label="Chat with Labe AI"
      className={`group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border font-black transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${
        compact ? "min-h-11 px-4 text-sm" : "min-h-14 px-6 text-base"
      } ${tones[tone]} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center rounded-full ${
          compact ? "h-7 w-7" : "h-8 w-8"
        } ${
          tone === "blue"
            ? "bg-white/15 text-white"
            : tone === "dark"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"
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
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      </span>
      <span>Chat with Labe AI</span>
    </button>
  );
}
