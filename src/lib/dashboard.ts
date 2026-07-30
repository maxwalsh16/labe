import { neon } from "@neondatabase/serverless";
import { createHmac, randomUUID, timingSafeEqual } from "crypto";

export type LabePlan = "launch" | "growth";
export type ProjectStatus =
  | "awaiting_onboarding"
  | "reviewing_onboarding"
  | "in_progress"
  | "completed";

export type ProjectSummary = {
  id: string;
  stripeSessionId: string;
  business: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  plan: LabePlan;
  addOns: string[];
  status: ProjectStatus;
  paidAt: string;
  onboardingReceivedAt: string | null;
  buildStartedAt: string | null;
  websiteDeadline: string | null;
  projectDeadline: string | null;
  buildStartEmailSentAt: string | null;
  openTaskCount: number;
  overdueTaskCount: number;
};

export type DashboardTask = {
  id: string;
  projectId: string;
  title: string;
  detail: string;
  phase: "before_start" | "website" | "project";
  dueAt: string | null;
  completedAt: string | null;
  sortOrder: number;
};

export type ProjectDetail = ProjectSummary & {
  onboarding: Record<string, string> | null;
  uploadedPhotos: Array<{ name: string; type: string; size: number }>;
  tasks: DashboardTask[];
};

type TaskTemplate = Omit<DashboardTask, "id" | "projectId" | "dueAt" | "completedAt">;

let schemaPromise: Promise<void> | null = null;

function databaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured.");
  return url;
}

function sql() {
  return neon(databaseUrl());
}

export function isDashboardConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

async function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const query = sql();
      await query`
        CREATE TABLE IF NOT EXISTS labe_projects (
          id UUID PRIMARY KEY,
          stripe_session_id TEXT UNIQUE NOT NULL,
          business TEXT NOT NULL,
          customer_name TEXT NOT NULL,
          customer_email TEXT NOT NULL,
          customer_phone TEXT NOT NULL DEFAULT '',
          plan TEXT NOT NULL CHECK (plan IN ('launch', 'growth')),
          add_ons JSONB NOT NULL DEFAULT '[]'::jsonb,
          status TEXT NOT NULL DEFAULT 'awaiting_onboarding',
          paid_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          onboarding_received_at TIMESTAMPTZ,
          onboarding JSONB,
          uploaded_photos JSONB NOT NULL DEFAULT '[]'::jsonb,
          build_started_at TIMESTAMPTZ,
          website_deadline TIMESTAMPTZ,
          project_deadline TIMESTAMPTZ,
          build_start_email_sent_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await query`
        CREATE TABLE IF NOT EXISTS labe_project_tasks (
          id UUID PRIMARY KEY,
          project_id UUID NOT NULL REFERENCES labe_projects(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          detail TEXT NOT NULL,
          phase TEXT NOT NULL CHECK (phase IN ('before_start', 'website', 'project')),
          due_at TIMESTAMPTZ,
          completed_at TIMESTAMPTZ,
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await query`CREATE INDEX IF NOT EXISTS labe_project_tasks_project_id_idx ON labe_project_tasks(project_id)`;
      await query`CREATE INDEX IF NOT EXISTS labe_project_tasks_due_at_idx ON labe_project_tasks(due_at) WHERE completed_at IS NULL`;
    })();
  }
  return schemaPromise;
}

export async function createProjectFromCheckout(input: {
  stripeSessionId: string;
  business: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  plan: LabePlan;
  addOns: string[];
  paidAt?: Date;
}) {
  await ensureSchema();
  const query = sql();
  const id = randomUUID();
  const result = await query`
    INSERT INTO labe_projects (
      id, stripe_session_id, business, customer_name, customer_email,
      customer_phone, plan, add_ons, paid_at
    ) VALUES (
      ${id}, ${input.stripeSessionId}, ${input.business}, ${input.customerName},
      ${input.customerEmail}, ${input.customerPhone}, ${input.plan},
      ${JSON.stringify(input.addOns)}::jsonb, ${input.paidAt || new Date()}
    )
    ON CONFLICT (stripe_session_id) DO NOTHING
    RETURNING id
  `;

  if (!result.length) return;

  const templates = taskTemplates(input.plan, input.addOns);
  for (const task of templates) {
    await query`
      INSERT INTO labe_project_tasks (id, project_id, title, detail, phase, sort_order)
      VALUES (${randomUUID()}, ${id}, ${task.title}, ${task.detail}, ${task.phase}, ${task.sortOrder})
    `;
  }
}

export async function attachOnboardingToProject(input: {
  stripeSessionId: string;
  values: Record<string, string>;
  photos: Array<{ name: string; type: string; size: number }>;
}) {
  await ensureSchema();
  const query = sql();
  await query`
    UPDATE labe_projects
    SET onboarding = ${JSON.stringify(input.values)}::jsonb,
        uploaded_photos = ${JSON.stringify(input.photos)}::jsonb,
        onboarding_received_at = NOW(),
        status = 'reviewing_onboarding',
        updated_at = NOW()
    WHERE stripe_session_id = ${input.stripeSessionId}
  `;
}

export async function listProjects(): Promise<ProjectSummary[]> {
  await ensureSchema();
  const query = sql();
  const rows = await query`
    SELECT
      p.*,
      COUNT(t.id) FILTER (WHERE t.completed_at IS NULL)::int AS open_task_count,
      COUNT(t.id) FILTER (WHERE t.completed_at IS NULL AND t.due_at < NOW())::int AS overdue_task_count
    FROM labe_projects p
    LEFT JOIN labe_project_tasks t ON t.project_id = p.id
    GROUP BY p.id
    ORDER BY
      CASE p.status WHEN 'in_progress' THEN 0 WHEN 'reviewing_onboarding' THEN 1 ELSE 2 END,
      p.website_deadline ASC NULLS LAST,
      p.paid_at DESC
  `;
  return rows.map(mapProjectSummary);
}

export async function getProject(projectId: string): Promise<ProjectDetail | null> {
  await ensureSchema();
  const query = sql();
  const rows = await query`
    SELECT
      p.*,
      COUNT(t.id) FILTER (WHERE t.completed_at IS NULL)::int AS open_task_count,
      COUNT(t.id) FILTER (WHERE t.completed_at IS NULL AND t.due_at < NOW())::int AS overdue_task_count
    FROM labe_projects p
    LEFT JOIN labe_project_tasks t ON t.project_id = p.id
    WHERE p.id = ${projectId}
    GROUP BY p.id
  `;
  if (!rows.length) return null;

  const tasks = await query`
    SELECT * FROM labe_project_tasks
    WHERE project_id = ${projectId}
    ORDER BY completed_at NULLS FIRST, due_at ASC NULLS LAST, sort_order ASC
  `;

  return {
    ...mapProjectSummary(rows[0]),
    onboarding: (rows[0].onboarding as Record<string, string> | null) || null,
    uploadedPhotos: Array.isArray(rows[0].uploaded_photos) ? rows[0].uploaded_photos : [],
    tasks: tasks.map(mapTask),
  };
}

export async function startProject(projectId: string) {
  await ensureSchema();
  const query = sql();
  const current = await getProject(projectId);
  if (!current) throw new Error("Project not found.");
  if (!current.onboardingReceivedAt) throw new Error("Wait until onboarding has been submitted before starting the build.");
  if (current.buildStartedAt) return current;

  const startedAt = new Date();
  const websiteDeadline = new Date(startedAt.getTime() + 48 * 60 * 60 * 1000);
  const projectDeadline = addBusinessDays(startedAt, 5);

  await query`
    UPDATE labe_projects
    SET status = 'in_progress', build_started_at = ${startedAt},
        website_deadline = ${websiteDeadline}, project_deadline = ${projectDeadline},
        updated_at = NOW()
    WHERE id = ${projectId} AND build_started_at IS NULL
  `;
  await query`
    UPDATE labe_project_tasks
    SET due_at = CASE
      WHEN phase = 'website' THEN ${websiteDeadline}
      WHEN phase = 'project' THEN ${projectDeadline}
      ELSE due_at
    END
    WHERE project_id = ${projectId} AND completed_at IS NULL
  `;

  return (await getProject(projectId))!;
}

export async function markBuildStartEmailSent(projectId: string) {
  await ensureSchema();
  await sql()`UPDATE labe_projects SET build_start_email_sent_at = NOW(), updated_at = NOW() WHERE id = ${projectId}`;
}

export async function setTaskCompletion(taskId: string, completed: boolean) {
  await ensureSchema();
  const query = sql();
  const rows = await query`
    UPDATE labe_project_tasks
    SET completed_at = ${completed ? new Date() : null}
    WHERE id = ${taskId}
    RETURNING project_id
  `;
  if (!rows.length) throw new Error("Task not found.");
  return rows[0].project_id as string;
}

function taskTemplates(plan: LabePlan, addOns: string[]): TaskTemplate[] {
  const tasks: TaskTemplate[] = [
    task("Review onboarding and identify missing details", "Confirm the brief is complete and send one clear follow-up if anything is missing.", "before_start", 10),
    task("Confirm account access needed", "Request safe access or invites for the accounts required. Never collect passwords.", "before_start", 20),
    task("Write page structure and customer-first copy", "Turn the onboarding answers into a clear page plan and wording.", "website", 30),
    task("Build the website and connect enquiries", "Create the responsive website, contact flow, tracking, and core SEO setup.", "website", 40),
    task("Test, publish, and confirm the website is live", "Check mobile, desktop, forms, links, metadata, and the live domain.", "website", 50),
  ];

  if (plan === "growth") {
    tasks.push(
      task("Set up custom business email and template", "Create or improve the business inbox and professional reusable email template.", "project", 60),
      task("Configure email automation", "Set up the agreed practical automations and test the customer journey.", "project", 70),
      task("Set up or optimise Google Business Profile", "Prepare local business details, services, categories, and access.", "project", 80),
      task("Set up Stripe payment flow", "Connect customer-owned Stripe access and test the agreed payment journey.", "project", 90),
      task("Configure AI receptionist", "Set up call routing, key answers, lead capture, and a test call.", "project", 100),
      task("Configure AI live chat", "Set up website chat, qualifying questions, and lead routing.", "project", 110),
    );
  }

  const addOnTasks: Record<string, [string, string]> = {
    business_email: ["Set up business email, template, and automation", "Complete the paid email add-on and test the agreed automated replies."],
    google_business_profile: ["Set up or optimise Google Business Profile", "Complete the paid Google Business Profile setup and local visibility essentials."],
    ai_receptionist: ["Configure AI receptionist", "Set up the paid AI receptionist add-on, safe routing, and a test call."],
    google_ads: ["Prepare Google Ads campaign", "Set up the campaign structure, targeting, conversion tracking, and handover controls."],
    meta_ads: ["Prepare Meta ads campaign", "Set up Facebook and Instagram campaign structure, targeting, and conversion tracking."],
    ads_bundle: ["Prepare Google and Meta ad campaigns", "Set up both campaign structures, targeting, conversion tracking, and handover controls."],
  };

  addOns.forEach((addOn, index) => {
    if (plan === "growth" && ["business_email", "google_business_profile", "ai_receptionist"].includes(addOn)) return;
    const definition = addOnTasks[addOn];
    if (definition) tasks.push(task(definition[0], definition[1], "project", 120 + index * 10));
  });

  tasks.push(task("Final project checks and handover", "Confirm all included work is tested, documented, and ready for the customer.", "project", 200));
  return tasks;
}

function task(title: string, detail: string, phase: TaskTemplate["phase"], sortOrder: number): TaskTemplate {
  return { title, detail, phase, sortOrder };
}

function mapProjectSummary(row: Record<string, unknown>): ProjectSummary {
  return {
    id: String(row.id),
    stripeSessionId: String(row.stripe_session_id),
    business: String(row.business),
    customerName: String(row.customer_name),
    customerEmail: String(row.customer_email),
    customerPhone: String(row.customer_phone || ""),
    plan: row.plan === "growth" ? "growth" : "launch",
    addOns: Array.isArray(row.add_ons) ? row.add_ons.map(String) : [],
    status: row.status as ProjectStatus,
    paidAt: new Date(String(row.paid_at)).toISOString(),
    onboardingReceivedAt: row.onboarding_received_at ? new Date(String(row.onboarding_received_at)).toISOString() : null,
    buildStartedAt: row.build_started_at ? new Date(String(row.build_started_at)).toISOString() : null,
    websiteDeadline: row.website_deadline ? new Date(String(row.website_deadline)).toISOString() : null,
    projectDeadline: row.project_deadline ? new Date(String(row.project_deadline)).toISOString() : null,
    buildStartEmailSentAt: row.build_start_email_sent_at ? new Date(String(row.build_start_email_sent_at)).toISOString() : null,
    openTaskCount: Number(row.open_task_count || 0),
    overdueTaskCount: Number(row.overdue_task_count || 0),
  };
}

function mapTask(row: Record<string, unknown>): DashboardTask {
  return {
    id: String(row.id),
    projectId: String(row.project_id),
    title: String(row.title),
    detail: String(row.detail),
    phase: row.phase as DashboardTask["phase"],
    dueAt: row.due_at ? new Date(String(row.due_at)).toISOString() : null,
    completedAt: row.completed_at ? new Date(String(row.completed_at)).toISOString() : null,
    sortOrder: Number(row.sort_order),
  };
}

function addBusinessDays(date: Date, days: number) {
  const result = new Date(date);
  let remaining = days;
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return result;
}

const authCookieName = "labe_dashboard";

export function dashboardCookieName() {
  return authCookieName;
}

export function verifyDashboardPassword(value: string) {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) return false;
  const received = Buffer.from(value);
  const expected = Buffer.from(password);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function createDashboardSession() {
  const secret = dashboardSecret();
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
  const payload = `max.${expiresAt}`;
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("base64url")}`;
}

export function hasValidDashboardSession(value?: string) {
  if (!value) return false;
  const [user, expiresAtText, signature] = value.split(".");
  const expiresAt = Number(expiresAtText);
  if (user !== "max" || !Number.isSafeInteger(expiresAt) || expiresAt < Date.now() / 1000 || !signature) return false;
  const payload = `${user}.${expiresAt}`;
  const expected = createHmac("sha256", dashboardSecret()).update(payload).digest("base64url");
  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

function dashboardSecret() {
  const secret = process.env.DASHBOARD_AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("DASHBOARD_AUTH_SECRET is not configured.");
  return secret;
}
