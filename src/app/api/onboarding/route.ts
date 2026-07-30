import { getVerifiedLabeCheckout } from "@/lib/stripe-checkout";
import { attachOnboardingToProject, isDashboardConfigured } from "@/lib/dashboard";
import { readOnboardingToken } from "@/lib/onboarding";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fields = [
  "name",
  "business",
  "email",
  "phone",
  "businessPhone",
  "website",
  "serviceArea",
  "websiteStatus",
  "preferredDomain",
  "domainOwnership",
  "currentProviders",
  "abn",
  "acn",
  "publicEmail",
  "publicAddress",
  "services",
  "customerDetails",
  "painPoints",
  "goals",
  "pricingAndPayments",
  "serviceBoundaries",
  "customerFaqs",
  "businessEmailSetup",
  "emailTemplateStatus",
  "emailAutomationStatus",
  "emailAutomationNotes",
  "workflowSteps",
  "currentTools",
  "teamAndContacts",
  "staffBusinessEmails",
  "receptionistSetup",
  "businessCallNumber",
  "businessHours",
  "receptionistTasks",
  "callRouting",
  "receptionistNotes",
  "googleAdsAccount",
  "metaAdsAccount",
  "advertisingNotes",
  "advertisingLocations",
  "advertisingServices",
  "advertisingBudget",
  "businessStory",
  "socialFacebook",
  "socialInstagram",
  "socialLinkedIn",
  "socialTiktok",
  "socialYoutube",
  "socialGoogleBusiness",
  "socialWhatsapp",
  "socialOther",
  "assetLink",
  "brandPrimaryHex",
  "brandPrimaryRgb",
  "brandSecondaryHex",
  "brandSecondaryRgb",
  "brandBackgroundHex",
  "brandBackgroundRgb",
  "brandAccentHex",
  "brandAccentRgb",
] as const;

type FieldName = (typeof fields)[number];

const labels: Record<FieldName, string> = {
  name: "Name",
  business: "Business",
  email: "Email",
  phone: "Phone",
  businessPhone: "Business phone number",
  website: "Current website",
  serviceArea: "Service area",
  websiteStatus: "Website status",
  preferredDomain: "Preferred web address for new site",
  domainOwnership: "Domain ownership",
  currentProviders: "Current technology providers",
  abn: "ABN",
  acn: "ACN",
  publicEmail: "Public business email",
  publicAddress: "Public business address",
  services: "Services",
  customerDetails: "What is needed before work starts",
  painPoints: "What takes too much time",
  goals: "What success looks like",
  pricingAndPayments: "Pricing and payment approach",
  serviceBoundaries: "Service and travel boundaries",
  customerFaqs: "Customer FAQs",
  businessEmailSetup: "Business email setup",
  emailTemplateStatus: "Email template status",
  emailAutomationStatus: "Email automation status",
  emailAutomationNotes: "Email and automation notes",
  workflowSteps: "Typical customer journey",
  currentTools: "Current business tools",
  teamAndContacts: "Team and lead contacts",
  staffBusinessEmails: "Staff business email requirements",
  receptionistSetup: "AI receptionist setup preference",
  businessCallNumber: "Current business call number",
  businessHours: "Usual business hours for calls",
  receptionistTasks: "AI receptionist tasks",
  callRouting: "Urgent call routing",
  receptionistNotes: "AI receptionist rules and notes",
  googleAdsAccount: "Google Ads account",
  metaAdsAccount: "Meta ads account",
  advertisingNotes: "Advertising notes",
  advertisingLocations: "Advertising locations",
  advertisingServices: "Services to promote",
  advertisingBudget: "Monthly advertising budget",
  businessStory: "About the business",
  socialFacebook: "Facebook link",
  socialInstagram: "Instagram link",
  socialLinkedIn: "LinkedIn link",
  socialTiktok: "TikTok link",
  socialYoutube: "YouTube link",
  socialGoogleBusiness: "Google Business Profile link",
  socialWhatsapp: "WhatsApp link",
  socialOther: "Other profile or directory link",
  assetLink: "Other notes or links",
  brandPrimaryHex: "Primary colour (HEX)",
  brandPrimaryRgb: "Primary colour (RGB)",
  brandSecondaryHex: "Secondary colour (HEX)",
  brandSecondaryRgb: "Secondary colour (RGB)",
  brandBackgroundHex: "Background colour (HEX)",
  brandBackgroundRgb: "Background colour (RGB)",
  brandAccentHex: "Accent colour (HEX)",
  brandAccentRgb: "Accent colour (RGB)",
};

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  const payload = Object.fromEntries(formData.entries());

  if (text(payload.company)) {
    return Response.json({ message: "Thanks—your onboarding has been received." });
  }

  const token = text(payload.token);
  const tokenData = readOnboardingToken(token);
  const checkout = tokenData ? await getVerifiedLabeCheckout(tokenData.sessionId) : null;

  if (!checkout) {
    return Response.json(
      { message: "This private onboarding link is no longer valid. Please email hello@labe.com.au and we will send a new one." },
      { status: 403 },
    );
  }

  const values = Object.fromEntries(fields.map((field) => [field, text(payload[field])])) as Record<FieldName, string>;
  const photos = formData
    .getAll("photos")
    .filter((item): item is File => item instanceof File && item.size > 0);

  const photoMetadata = photos.map((photo) => ({
    name: safeFileName(photo.name),
    type: photo.type,
    size: photo.size,
  }));

  if (
    !values.name ||
    !values.business ||
    !emailPattern.test(values.email) ||
    !values.phone ||
    !values.serviceArea ||
    !values.websiteStatus ||
    !values.domainOwnership ||
    !values.services ||
    !values.customerDetails ||
    !values.goals ||
    !values.businessEmailSetup ||
    !values.emailTemplateStatus ||
    !values.emailAutomationStatus ||
    !values.workflowSteps ||
    !values.currentTools ||
    !values.receptionistSetup ||
    payload.confirm !== "on"
  ) {
    return Response.json({ message: "Please complete the required fields before sending your onboarding." }, { status: 400 });
  }

  if (fields.some((field) => values[field].length > 4000)) {
    return Response.json({ message: "One of your answers is too long. Please shorten it and try again." }, { status: 400 });
  }

  if (
    photos.length > 5 ||
    photos.some(
      (photo) =>
        !photo.type.startsWith("image/") || photo.size > 5 * 1024 * 1024,
    )
  ) {
    return Response.json(
      { message: "Please upload up to 5 image files, with each file no larger than 5 MB." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return Response.json({ message: "Online onboarding is being connected. Please email hello@labe.com.au for now." }, { status: 503 });
  }

  const subject = `Onboarding received — ${values.business}`;
  const adminResponse = await sendResendEmail({
    apiKey,
    from: fromEmail,
    to: [toEmail],
    replyTo: values.email,
    subject,
    text: [
      `Plan: ${checkout.plan === "growth" ? "Labe Growth" : "Labe Launch"}`,
      `Stripe session: ${checkout.session.id}`,
      "",
      ...fields.map((field) => `${labels[field]}: ${values[field] || "Not provided"}`),
    ].join("\n\n"),
    html: onboardingAdminHtml(values, checkout.plan, checkout.session.id),
    attachments: await Promise.all(
      photos.map(async (photo) => ({
        filename: safeFileName(photo.name),
        content: Buffer.from(await photo.arrayBuffer()).toString("base64"),
      })),
    ),
  });

  if (!adminResponse.ok) {
    return Response.json({ message: "Your onboarding could not be sent just yet. Please try again or email hello@labe.com.au." }, { status: 502 });
  }

  if (isDashboardConfigured()) {
    try {
      await attachOnboardingToProject({
        stripeSessionId: checkout.session.id,
        values,
        photos: photoMetadata,
      });
    } catch (error) {
      console.error("Dashboard onboarding storage failed", error);
      return Response.json({ message: "Your onboarding was received, but we could not save it to the project desk just yet. Please email hello@labe.com.au." }, { status: 502 });
    }
  }

  await sendResendEmail({
    apiKey,
    from: fromEmail,
    to: [values.email],
    subject: "We have received your Labe onboarding",
    text: `Hi ${values.name},\n\nThanks for sending through your project details. Max will review everything and be in touch if anything else is needed.\n\nYou can now take this off your list for today.\n\nLabe`,
    html: customerConfirmationHtml(values.name),
  });

  return Response.json({ message: "Thanks—your onboarding is with Labe. You can now take this off your list for today." });
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function sendResendEmail({ apiKey, from, to, replyTo, subject, text, html, attachments = [] }: { apiKey: string; from: string; to: string[]; replyTo?: string; subject: string; text: string; html: string; attachments?: Array<{ filename: string; content: string }> }) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, ...(replyTo ? { reply_to: replyTo } : {}), subject, text, html, ...(attachments.length ? { attachments } : {}) }),
  });
}

function onboardingAdminHtml(values: Record<FieldName, string>, plan: "launch" | "growth", sessionId: string) {
  return emailShell(
    "New onboarding received",
    `<p style="margin:0 0 18px">${escapeHtml(values.business)} has completed their ${plan === "growth" ? "Labe Growth" : "Labe Launch"} onboarding.</p><p style="margin:0 0 22px;color:#64748b;font-size:13px">Stripe session: ${escapeHtml(sessionId)}</p>${fields.map((field) => `<div style="padding:14px 0;border-top:1px solid #e2e8f0"><p style="margin:0 0 5px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#2563eb">${escapeHtml(labels[field])}</p><p style="margin:0;white-space:pre-wrap">${escapeHtml(values[field] || "Not provided")}</p></div>`).join("")}`,
  );
}

function customerConfirmationHtml(name: string) {
  return emailShell(
    "Your onboarding is in",
    `<p style="margin:0 0 16px">Hi ${escapeHtml(name)},</p><p style="margin:0 0 16px">Thanks for sending through your project details. Max will review everything and be in touch if anything else is needed.</p><p style="margin:0">You can now take this off your list for today.</p>`,
  );
}

function emailShell(heading: string, content: string) {
  return `<div style="margin:0;padding:32px 16px;background:#f6f8fc;font-family:Arial,sans-serif;color:#0f172a;line-height:1.6"><div style="max-width:620px;margin:0 auto;overflow:hidden;border-radius:24px;background:#ffffff;border:1px solid #e2e8f0"><div style="padding:28px 32px;background:#0f172a;color:#ffffff"><p style="margin:0;font-size:14px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#93c5fd">Labe</p><h1 style="margin:8px 0 0;font-size:28px;line-height:1.2">${escapeHtml(heading)}</h1></div><div style="padding:32px;font-size:16px">${content}</div><div style="padding:18px 32px;background:#f8fafc;color:#64748b;font-size:13px">Labe Labs · Adelaide, South Australia</div></div></div>`;
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function safeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120) || "uploaded-photo";
}
