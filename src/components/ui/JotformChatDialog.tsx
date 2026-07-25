"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AGENT_URL =
  "https://www.jotform.com/agent/019f974cf558700081687388fe29a2aa97f4?skipWelcome=1&maximizable=1";

const ChatAgentContext = createContext<{
  openChat: () => void;
} | null>(null);

export function useChatAgent() {
  const context = useContext(ChatAgentContext);
  if (!context) {
    throw new Error("useChatAgent must be used within ChatAgentProvider");
  }
  return context;
}

export function ChatAgentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const contextValue = useMemo(
    () => ({
      openChat() {
        setHasOpened(true);
        setIsOpen(true);
      },
    }),
    [],
  );

  return (
    <ChatAgentContext.Provider value={contextValue}>
      {children}
      {hasOpened ? (
        <JotformChatDialog isOpen={isOpen} closeChat={() => setIsOpen(false)} />
      ) : null}
    </ChatAgentContext.Provider>
  );
}

function JotformChatDialog({
  isOpen,
  closeChat,
}: {
  isOpen: boolean;
  closeChat: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeChat();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeChat, isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/55 p-0 backdrop-blur-sm transition-opacity duration-300 sm:items-center sm:p-6 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Chat with Labe AI"
      aria-hidden={!isOpen}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeChat();
      }}
    >
      <div
        className={`relative flex h-[min(92dvh,760px)] w-full max-w-[29rem] flex-col overflow-hidden rounded-t-[2rem] border border-white/15 bg-white shadow-[0_32px_100px_rgba(15,23,42,0.45)] transition-all duration-300 sm:h-[min(82dvh,760px)] sm:rounded-[2rem] ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-5 scale-[0.98]"
        }`}
      >
        <div className="flex items-center justify-between bg-blue-600 px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
                <path d="M8 9h8M8 13h5" />
              </svg>
            </span>
            <div>
              <p className="font-black leading-tight">Labe AI</p>
              <p className="mt-0.5 text-xs font-semibold text-blue-100">
                Ask about packages, pricing, and next steps
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeChat}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close chat"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <iframe
          src={AGENT_URL}
          title="Labe AI chat"
          className="min-h-0 flex-1 border-0 bg-white"
          allow="microphone; display-capture"
        />
      </div>
    </div>
  );
}
