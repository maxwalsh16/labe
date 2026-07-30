"use client";

import type { DashboardTask, ProjectDetail, ProjectSummary } from "@/lib/dashboard";
import { useCallback, useEffect, useMemo, useState } from "react";

type ApiError = { message?: string };

const statusLabel = {
  awaiting_onboarding: "Waiting on onboarding",
  reviewing_onboarding: "Ready for your review",
  in_progress: "Build in progress",
  completed: "Complete",
};

const addOnLabel: Record<string, string> = {
  business_email: "Business email",
  google_business_profile: "Google Business Profile",
  google_ads: "Google Ads",
  meta_ads: "Meta ads",
  ads_bundle: "Google + Meta ads",
  ai_receptionist: "AI receptionist",
};

export function DashboardClient({ preview = false }: { preview?: boolean }) {
  const [projects, setProjects] = useState<ProjectSummary[]>(preview ? previewProjects : []);
  const [selected, setSelected] = useState<ProjectDetail | null>(preview ? previewProject : null);
  const [loading, setLoading] = useState(!preview);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState("");

  const refreshProjects = useCallback(async () => {
    const response = await fetch("/api/dashboard/projects", { cache: "no-store" });
    const data = (await response.json()) as { projects?: ProjectSummary[] } & ApiError;
    if (!response.ok) throw new Error(data.message || "The dashboard could not load.");
    setProjects(data.projects || []);
  }, []);

  const openProject = useCallback(async (projectId: string) => {
    setBusy(projectId);
    setMessage("");
    try {
      const response = await fetch(`/api/dashboard/projects/${projectId}`, { cache: "no-store" });
      const data = (await response.json()) as { project?: ProjectDetail } & ApiError;
      if (!response.ok || !data.project) throw new Error(data.message || "Project could not load.");
      setSelected(data.project);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Project could not load.");
    } finally {
      setBusy("");
    }
  }, []);

  useEffect(() => {
    if (preview) return;
    let active = true;
    const timer = window.setTimeout(() => {
      refreshProjects()
        .catch((error) => {
          if (active) setMessage(error instanceof Error ? error.message : "The dashboard could not load.");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [preview, refreshProjects]);

  const today = useMemo(() => getTodayItems(projects, selected), [projects, selected]);

  async function toggleTask(task: DashboardTask) {
    if (preview) {
      setSelected((current) => current ? {
        ...current,
        tasks: current.tasks.map((item) => item.id === task.id ? { ...item, completedAt: item.completedAt ? null : new Date().toISOString() } : item),
      } : current);
      return;
    }
    setBusy(task.id);
    try {
      const response = await fetch(`/api/dashboard/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completedAt }),
      });
      const data = (await response.json()) as { projectId?: string } & ApiError;
      if (!response.ok) throw new Error(data.message || "Task could not be updated.");
      await refreshProjects();
      if (selected) await openProject(selected.id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Task could not be updated.");
    } finally {
      setBusy("");
    }
  }

  async function startBuild() {
    if (!selected) return;
    if (preview) {
      const startedAt = new Date();
      const websiteDeadline = new Date(startedAt.getTime() + 48 * 60 * 60 * 1000).toISOString();
      const projectDeadline = new Date(startedAt.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString();
      setSelected({ ...selected, status: "in_progress", buildStartedAt: startedAt.toISOString(), websiteDeadline, projectDeadline });
      setMessage("Preview only — this is what happens when you start a real build.");
      return;
    }
    const confirmed = window.confirm("Start this build now? This starts the 48-hour website deadline, the five-business-day project deadline, and emails the customer.");
    if (!confirmed) return;
    setBusy("start");
    try {
      const response = await fetch(`/api/dashboard/projects/${selected.id}/start`, { method: "POST" });
      const data = (await response.json()) as { project?: ProjectDetail } & ApiError;
      if (!response.ok || !data.project) throw new Error(data.message || "The build could not be started.");
      setSelected(data.project);
      await refreshProjects();
      setMessage("Build started and the customer has been emailed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The build could not be started.");
    } finally {
      setBusy("");
    }
  }

  async function signOut() {
    if (preview) {
      window.location.href = "/dashboard?preview=verified";
      return;
    }
    await fetch("/api/dashboard/session", { method: "DELETE" });
    window.location.reload();
  }

  if (loading) return <main className="min-h-screen bg-[#f6f8fc] p-8 text-slate-600">Opening your project desk…</main>;

  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5 sm:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Labe operations</p>
            <h1 className="mt-1 text-2xl font-black tracking-[-0.04em]">Your project desk</h1>
          </div>
          <button onClick={signOut} className="text-sm font-bold text-slate-500 underline underline-offset-4 transition hover:text-slate-950">Sign out</button>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.85fr)]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">Today&apos;s focus</p>
            {preview && <p className="mt-3 inline-flex rounded-full border border-blue-300/25 bg-blue-400/10 px-3 py-1 text-xs font-black text-blue-200">Preview mode · no client data</p>}
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em]">Keep the right work moving.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">This is your short list—onboarding reviews, builds that need attention, and anything due or overdue.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Metric label="Active builds" value={String(projects.filter((project) => project.status === "in_progress").length)} />
              <Metric label="Needs review" value={String(projects.filter((project) => project.status === "reviewing_onboarding").length)} />
              <Metric label="Overdue tasks" value={String(projects.reduce((sum, project) => sum + project.overdueTaskCount, 0))} urgent />
            </div>
          </section>
          {message && <p className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-950">{message}</p>}
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Do this next</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">Your action queue</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{today.length} item{today.length === 1 ? "" : "s"}</span>
            </div>
            <div className="mt-5 space-y-3">
              {today.length ? today.map((item) => <button key={`${item.projectId}-${item.title}`} onClick={() => openProject(item.projectId)} className="group flex w-full items-start gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50">
                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.urgent ? "bg-red-500" : "bg-blue-600"}`} />
                <span className="min-w-0 flex-1"><span className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">{item.business}</span><span className="mt-1 block font-bold text-slate-950">{item.title}</span><span className="mt-1 block text-sm leading-6 text-slate-600">{item.detail}</span></span>
                <span className="mt-1 text-sm font-black text-blue-700">View</span>
              </button>) : <p className="rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">Nothing urgent right now. Keep an eye on new payments and onboarding submissions here.</p>}
            </div>
          </section>
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">All projects</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">Work at a glance</h2>
            <div className="mt-5 space-y-3">
              {projects.length ? projects.map((project) => <button key={project.id} onClick={() => openProject(project.id)} className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:shadow-sm">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${project.status === "in_progress" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{project.plan === "growth" ? "G" : "L"}</span>
                <span className="min-w-0 flex-1"><span className="block truncate font-black text-slate-950">{project.business}</span><span className="mt-0.5 block text-sm text-slate-600">{statusLabel[project.status]} · {project.openTaskCount} open task{project.openTaskCount === 1 ? "" : "s"}</span></span>
                <span className="text-right text-xs font-bold text-slate-500">{project.websiteDeadline ? <>Site due<br /><strong className="text-slate-950">{shortDate(project.websiteDeadline)}</strong></> : "Not started"}</span>
              </button>) : <p className="rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">Paid projects will appear here automatically after Stripe confirms payment.</p>}
            </div>
          </section>
        </div>
        <aside className="min-w-0">
          {selected ? <ProjectPanel project={selected} busy={busy} onClose={() => setSelected(null)} onStart={startBuild} onToggleTask={toggleTask} /> : <div className="sticky top-6 rounded-[2rem] border border-dashed border-slate-300 bg-white/60 p-8 text-center shadow-sm"><p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Project detail</p><h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">Choose a project.</h2><p className="mt-3 leading-7 text-slate-600">You&apos;ll see the onboarding answers, what is included, every task, and the exact deadlines in one place.</p></div>}
        </aside>
      </div>
    </main>
  );
}

function ProjectPanel({ project, busy, onClose, onStart, onToggleTask }: { project: ProjectDetail; busy: string; onClose: () => void; onStart: () => void; onToggleTask: (task: DashboardTask) => void }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const canStart = project.status === "reviewing_onboarding" && !project.buildStartedAt;
  const included = project.plan === "growth" ? ["Everything in Launch", "Business email & automation", "Google Business Profile", "AI receptionist", "AI live chat", "Stripe payments"] : [];
  return <div className="sticky top-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
    <div className="bg-slate-950 p-6 text-white sm:p-7"><button onClick={onClose} className="float-right text-sm font-bold text-slate-400 underline underline-offset-4 hover:text-white">Close</button><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">{project.plan === "growth" ? "Labe Growth" : "Labe Launch"}</p><h2 className="mt-2 pr-12 text-3xl font-black tracking-[-0.05em]">{project.business}</h2><p className="mt-2 text-sm text-slate-300">{project.customerName} · <a className="underline decoration-blue-300/50 underline-offset-4" href={`mailto:${project.customerEmail}`}>{project.customerEmail}</a></p><span className="mt-5 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-black text-blue-100">{statusLabel[project.status]}</span></div>
    <div className="space-y-6 p-5 sm:p-7">
      {canStart && <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5"><p className="text-sm font-black text-slate-950">You&apos;re ready to take this live.</p><p className="mt-2 text-sm leading-6 text-slate-600">Start only once you have reviewed the onboarding and asked any final questions. This starts the 48-hour website deadline, the five-business-day project deadline, and emails the client.</p><button onClick={onStart} disabled={busy === "start"} className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700 disabled:opacity-70">{busy === "start" ? "Starting build…" : "Start build and email client"}</button></div>}
      {project.buildStartedAt && <div className="grid gap-3 sm:grid-cols-2"><Deadline label="Website live" date={project.websiteDeadline} /><Deadline label="Full project" date={project.projectDeadline} /></div>}
      <section><p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">What&apos;s included</p><div className="mt-3 flex flex-wrap gap-2">{[...included, ...project.addOns.map((item) => addOnLabel[item] || item)].map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">{item}</span>)}</div></section>
      <section><p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">Project checklist</p><div className="mt-3 space-y-2">{project.tasks.map((task) => <label key={task.id} className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition ${task.completedAt ? "border-slate-100 bg-slate-50 opacity-60" : "border-slate-200 bg-white hover:border-blue-300"}`}><input type="checkbox" checked={Boolean(task.completedAt)} disabled={busy === task.id} onChange={() => onToggleTask(task)} className="mt-1 h-4 w-4 shrink-0 accent-blue-600" /><span><span className="block text-sm font-bold text-slate-950">{task.title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{task.detail}{task.dueAt ? ` · Due ${shortDate(task.dueAt)}` : ""}</span></span></label>)}</div></section>
      {project.onboarding && <section className="border-t border-slate-200 pt-6"><button onClick={() => setShowOnboarding(!showOnboarding)} className="flex w-full items-center justify-between gap-4 text-left"><span><span className="block text-xs font-black uppercase tracking-[0.16em] text-blue-700">Customer onboarding</span><span className="mt-1 block text-sm font-bold text-slate-950">Submitted {project.onboardingReceivedAt ? shortDate(project.onboardingReceivedAt) : ""}</span></span><span className="text-sm font-black text-blue-700">{showOnboarding ? "Hide" : "View"}</span></button>{showOnboarding && <div className="mt-4 max-h-[34rem] space-y-3 overflow-y-auto pr-1">{Object.entries(project.onboarding).filter(([, value]) => value).map(([key, value]) => <div key={key} className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">{humanize(key)}</p><p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-800">{value}</p></div>)}</div>}</section>}
      {project.uploadedPhotos.length > 0 && <section><p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">Photos received</p><div className="mt-3 space-y-2">{project.uploadedPhotos.map((photo) => <div key={`${photo.name}-${photo.size}`} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"><span className="font-bold">{photo.name}</span><span className="ml-2 text-xs text-slate-500">{Math.round(photo.size / 1024)} KB</span></div>)}</div><p className="mt-2 text-xs leading-5 text-slate-500">The original files are attached to the onboarding email in your inbox.</p></section>}
      <section className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Safe account access</p><p className="mt-2 text-sm leading-6 text-slate-600">Ask for provider invites or access links after review. Keep passwords out of the dashboard and out of email.</p></section>
    </div>
  </div>;
}

function Metric({ label, value, urgent = false }: { label: string; value: string; urgent?: boolean }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"><p className={`text-3xl font-black ${urgent && value !== "0" ? "text-red-300" : "text-white"}`}>{value}</p><p className="mt-1 text-xs font-bold text-slate-400">{label}</p></div>; }
function Deadline({ label, date }: { label: string; date: string | null }) { return <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4"><p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">{label}</p><p className="mt-2 text-sm font-black text-slate-950">{date ? fullDate(date) : "Not scheduled"}</p><p className="mt-1 text-xs text-slate-600">{date ? relativeTime(date) : ""}</p></div>; }

function getTodayItems(projects: ProjectSummary[], selected: ProjectDetail | null) {
  const items: Array<{ projectId: string; business: string; title: string; detail: string; urgent: boolean }> = [];
  projects.forEach((project) => {
    if (project.status === "reviewing_onboarding") items.push({ projectId: project.id, business: project.business, title: "Review onboarding and decide whether to start", detail: "Their details are in—check the brief, request any missing information, then start the schedule when ready.", urgent: false });
    if (project.status === "awaiting_onboarding") items.push({ projectId: project.id, business: project.business, title: "Wait for onboarding", detail: "The welcome email has been sent. No deadline has started yet.", urgent: false });
    if (project.status === "in_progress") {
      const overdue = project.overdueTaskCount > 0;
      const websiteSoon = project.websiteDeadline && new Date(project.websiteDeadline).getTime() - Date.now() < 24 * 60 * 60 * 1000;
      items.push({ projectId: project.id, business: project.business, title: overdue ? `${project.overdueTaskCount} task${project.overdueTaskCount === 1 ? "" : "s"} overdue` : "Keep the checklist moving", detail: websiteSoon ? `Website deadline is ${relativeTime(project.websiteDeadline!)}.` : `${project.openTaskCount} open task${project.openTaskCount === 1 ? "" : "s"} remain.`, urgent: overdue || Boolean(websiteSoon) });
    }
  });
  if (selected?.tasks) selected.tasks.filter((task) => !task.completedAt && task.dueAt && new Date(task.dueAt).getTime() <= Date.now() + 24 * 60 * 60 * 1000).forEach((task) => items.unshift({ projectId: selected.id, business: selected.business, title: task.title, detail: `${task.detail} · Due ${relativeTime(task.dueAt!)}`, urgent: new Date(task.dueAt!).getTime() < Date.now() }));
  return items.slice(0, 8);
}

function shortDate(value: string) { return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", timeZone: "Australia/Adelaide" }).format(new Date(value)); }
function fullDate(value: string) { return new Intl.DateTimeFormat("en-AU", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Australia/Adelaide" }).format(new Date(value)); }
function relativeTime(value: string) { const hours = Math.round((new Date(value).getTime() - Date.now()) / 3_600_000); if (hours < 0) return `${Math.abs(hours)}h overdue`; if (hours < 24) return `in ${hours}h`; const days = Math.ceil(hours / 24); return `in ${days} day${days === 1 ? "" : "s"}`; }
function humanize(value: string) { return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()); }

const previewStart = new Date(Date.now() - 20 * 60 * 60 * 1000);
const previewWebsiteDeadline = new Date(Date.now() + 28 * 60 * 60 * 1000).toISOString();
const previewProjectDeadline = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString();
const previewProject: ProjectDetail = {
  id: "preview-growth", stripeSessionId: "preview", business: "Adelaide Home Repairs", customerName: "Jordan Taylor", customerEmail: "jordan@adelaidehomerepairs.com.au", customerPhone: "0400 000 000", plan: "growth", addOns: ["google_ads"], status: "in_progress", paidAt: previewStart.toISOString(), onboardingReceivedAt: previewStart.toISOString(), buildStartedAt: previewStart.toISOString(), websiteDeadline: previewWebsiteDeadline, projectDeadline: previewProjectDeadline, buildStartEmailSentAt: previewStart.toISOString(), openTaskCount: 7, overdueTaskCount: 0,
  uploadedPhotos: [{ name: "van-logo.png", type: "image/png", size: 428000 }, { name: "before-after.jpg", type: "image/jpeg", size: 1920000 }],
  onboarding: { services: "Home repairs, decking, fences and small renovations.", customerDetails: "Photos, suburb, a short description of the job and preferred timing.", painPoints: "Missed calls while on-site and too much quote chasing.", goals: "More quote-ready jobs and less time on admin.", workflowSteps: "Enquiry, photos, quote, approval, booking, deposit, job completed.", receptionistSetup: "Answer missed calls on my usual business number", advertisingLocations: "Adelaide metro and the Adelaide Hills" },
  tasks: [
    { id: "preview-1", projectId: "preview-growth", title: "Review onboarding and identify missing details", detail: "Confirm the brief is complete and send one clear follow-up if anything is missing.", phase: "before_start", dueAt: null, completedAt: previewStart.toISOString(), sortOrder: 10 },
    { id: "preview-2", projectId: "preview-growth", title: "Confirm account access needed", detail: "Request safe access or invites for the accounts required. Never collect passwords.", phase: "before_start", dueAt: null, completedAt: previewStart.toISOString(), sortOrder: 20 },
    { id: "preview-3", projectId: "preview-growth", title: "Write page structure and customer-first copy", detail: "Turn the onboarding answers into a clear page plan and wording.", phase: "website", dueAt: previewWebsiteDeadline, completedAt: null, sortOrder: 30 },
    { id: "preview-4", projectId: "preview-growth", title: "Build the website and connect enquiries", detail: "Create the responsive website, contact flow, tracking, and core SEO setup.", phase: "website", dueAt: previewWebsiteDeadline, completedAt: null, sortOrder: 40 },
    { id: "preview-5", projectId: "preview-growth", title: "Test, publish, and confirm the website is live", detail: "Check mobile, desktop, forms, links, metadata, and the live domain.", phase: "website", dueAt: previewWebsiteDeadline, completedAt: null, sortOrder: 50 },
    { id: "preview-6", projectId: "preview-growth", title: "Configure AI receptionist", detail: "Set up call routing, key answers, lead capture, and a test call.", phase: "project", dueAt: previewProjectDeadline, completedAt: null, sortOrder: 60 },
    { id: "preview-7", projectId: "preview-growth", title: "Configure AI live chat", detail: "Set up website chat, qualifying questions, and lead routing.", phase: "project", dueAt: previewProjectDeadline, completedAt: null, sortOrder: 70 },
  ],
};
const previewProjects: ProjectSummary[] = [
  previewProject,
  { id: "preview-launch", stripeSessionId: "preview-2", business: "Coastal Electrical", customerName: "Casey Lee", customerEmail: "casey@coastalelectrical.com.au", customerPhone: "0400 000 001", plan: "launch", addOns: ["ai_receptionist"], status: "reviewing_onboarding", paidAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), onboardingReceivedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), buildStartedAt: null, websiteDeadline: null, projectDeadline: null, buildStartEmailSentAt: null, openTaskCount: 6, overdueTaskCount: 0 },
];
