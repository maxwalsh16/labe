import { getProject, hasValidDashboardSession, markBuildStartEmailSent, startProject } from "@/lib/dashboard";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const cookieStore = await cookies();
  if (!hasValidDashboardSession(cookieStore.get("labe_dashboard")?.value)) {
    return Response.json({ message: "Not signed in." }, { status: 401 });
  }

  const { projectId } = await params;
  try {
    const project = await startProject(projectId);
    if (!project.buildStartedAt || !project.websiteDeadline || !project.projectDeadline) {
      throw new Error("The build schedule could not be created.");
    }

    if (!project.buildStartedAt || !(await getProject(projectId))?.buildStartedAt) {
      throw new Error("The build schedule could not be created.");
    }

    const current = await getProject(projectId);
    if (!current) throw new Error("Project not found.");
    if (!current.buildStartedAt) throw new Error("The build schedule could not be created.");

    if (current.buildStartEmailSentAt) {
      return Response.json({ project: current });
    }

    const response = await sendBuildStartedEmail(current);
    if (!response.ok) throw new Error("The build started, but the client email could not be sent. Please email them before continuing.");
    await markBuildStartEmailSent(projectId);
    return Response.json({ project: await getProject(projectId) });
  } catch (error) {
    return Response.json(
      { message: error instanceof Error ? error.message : "The build could not be started." },
      { status: 400 },
    );
  }
}

async function sendBuildStartedEmail(project: NonNullable<Awaited<ReturnType<typeof getProject>>>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) throw new Error("Resend is not configured for build-start emails.");

  const websiteDate = new Intl.DateTimeFormat("en-AU", { dateStyle: "full", timeZone: "Australia/Adelaide" }).format(new Date(project.websiteDeadline!));
  const projectDate = new Intl.DateTimeFormat("en-AU", { dateStyle: "full", timeZone: "Australia/Adelaide" }).format(new Date(project.projectDeadline!));
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `${project.stripeSessionId}:build-started`,
    },
    body: JSON.stringify({
      from,
      to: [project.customerEmail],
      subject: `Your Labe build has started — ${project.business}`,
      text: `Hi ${project.customerName},\n\nYour Labe build for ${project.business} has officially started.\n\nYour website target is ${websiteDate}. Your full project target is ${projectDate}.\n\nMax will keep you updated and be in touch if anything else is needed.\n\nLabe`,
      html: `<div style="margin:0;padding:32px 16px;background:#f6f8fc;font-family:Arial,sans-serif;color:#0f172a;line-height:1.6"><div style="max-width:620px;margin:0 auto;overflow:hidden;border:1px solid #e2e8f0;border-radius:24px;background:#fff"><div style="padding:32px;background:#0f172a;color:#fff"><p style="margin:0;font-size:14px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#93c5fd">Labe project update</p><h1 style="margin:8px 0 0;font-size:30px;line-height:1.2">Your build has started.</h1></div><div style="padding:32px;font-size:16px"><p style="margin:0 0 16px">Hi ${escapeHtml(project.customerName)},</p><p style="margin:0 0 20px">Your Labe build for <strong>${escapeHtml(project.business)}</strong> has officially started.</p><div style="padding:20px;border-radius:16px;background:#eff6ff"><p style="margin:0 0 8px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#2563eb">Your project timeline</p><p style="margin:0 0 8px"><strong>Website live target:</strong> ${escapeHtml(websiteDate)}</p><p style="margin:0"><strong>Full project target:</strong> ${escapeHtml(projectDate)}</p></div><p style="margin:20px 0 0">Max will keep you updated and be in touch if anything else is needed.</p></div><div style="padding:18px 32px;background:#f8fafc;color:#64748b;font-size:13px">Labe Labs · Adelaide, South Australia</div></div></div>`,
    }),
  });
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
