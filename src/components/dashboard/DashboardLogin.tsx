"use client";

import { FormEvent, useState } from "react";

export function DashboardLogin() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setMessage("");
    const response = await fetch("/api/dashboard/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await response.json()) as { message?: string };
    if (response.ok) window.location.reload();
    else {
      setMessage(data.message || "Please try again.");
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:flex sm:items-center sm:justify-center">
      <form onSubmit={signIn} className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur sm:p-10">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">Labe operations</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Your project desk.</h1>
        <p className="mt-4 leading-7 text-slate-300">Private access for Max only. Sign in to see today&apos;s work, project deadlines, and customer details.</p>
        <label className="mt-8 block text-sm font-bold text-slate-200">
          Dashboard password
          <input
            autoFocus
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-300 focus:ring-4 focus:ring-blue-400/20"
          />
        </label>
        {message && <p role="alert" className="mt-4 rounded-xl bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-200">{message}</p>}
        <button disabled={sending} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-500 px-5 text-sm font-black text-white transition hover:bg-blue-400 disabled:opacity-70">
          {sending ? "Opening your dashboard…" : "Open dashboard"}
        </button>
      </form>
    </main>
  );
}
