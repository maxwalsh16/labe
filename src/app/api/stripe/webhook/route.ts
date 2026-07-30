import Stripe from "stripe";
import { createProjectFromCheckout, isDashboardConfigured } from "@/lib/dashboard";
import { createOnboardingToken } from "@/lib/onboarding";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!webhookSecret || !signature) {
    return Response.json(
      { message: "Stripe webhook is not configured." },
      { status: 400 },
    );
  }

  // Signature verification is local and does not make a Stripe API request.
  const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY || "sk_test_webhook_verification_only",
  );
  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error(
      "Stripe webhook signature verification failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return Response.json(
      { message: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const customerEmail =
          session.customer_details?.email || session.customer_email || "";
        const customerName = session.metadata?.name || "there";
        const business = session.metadata?.business || "your business";

        if (isDashboardConfigured()) {
          const plan = session.metadata?.plan === "growth" ? "growth" : "launch";
          const addOns = (session.metadata?.add_ons || "None")
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item && item !== "None");
          await createProjectFromCheckout({
            stripeSessionId: session.id,
            business,
            customerName,
            customerEmail,
            customerPhone:
              session.customer_details?.phone || session.metadata?.phone || "",
            plan,
            addOns,
            paidAt: new Date(session.created * 1000),
          });
        }

        await notifyLabe({
          eventId: event.id,
          subject: `Labe payment received — ${
            session.metadata?.business || "new customer"
          }`,
          heading: "New Labe checkout completed",
          lines: [
            `Package: ${formatPlan(session.metadata?.plan)}`,
            `Business: ${session.metadata?.business || "Not provided"}`,
            `Name: ${session.metadata?.name || "Not provided"}`,
            `Email: ${customerEmail || "Not provided"}`,
            `Phone: ${
              session.customer_details?.phone ||
              session.metadata?.phone ||
              "Not provided"
            }`,
            `Website: ${session.metadata?.website || "Not provided"}`,
            `Stripe session: ${session.id}`,
          ],
        });

        if (customerEmail) {
          await sendWelcomeEmail({
            eventId: event.id,
            email: customerEmail,
            name: customerName,
            business,
            sessionId: session.id,
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;

        await notifyLabe({
          eventId: event.id,
          subject: "Labe Growth subscription payment failed",
          heading: "A recurring Stripe payment needs attention",
          lines: [
            `Stripe invoice: ${invoice.id}`,
            `Customer: ${String(invoice.customer || "Not provided")}`,
            "Review the invoice in Stripe before contacting the customer.",
          ],
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        await notifyLabe({
          eventId: event.id,
          subject: "Labe Growth subscription ended",
          heading: "A Growth subscription has ended",
          lines: [
            `Stripe subscription: ${subscription.id}`,
            `Customer: ${String(subscription.customer)}`,
            "Review the customer and any connected Growth services in Stripe.",
          ],
        });
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error("Stripe webhook handling failed", event.id, error);
    return Response.json(
      { message: "Webhook processing failed." },
      { status: 500 },
    );
  }

  return Response.json({ received: true });
}

async function sendWelcomeEmail({
  eventId,
  email,
  name,
  business,
  sessionId,
}: {
  eventId: string;
  email: string;
  name: string;
  business: string;
  sessionId: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    throw new Error("Resend is not configured for welcome emails.");
  }

  const token = createOnboardingToken(sessionId);
  const onboardingUrl = `${siteConfig.url}/onboarding?token=${encodeURIComponent(token)}`;
  const subject = "Welcome to Labe — let’s get your build started";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `${eventId}:welcome`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject,
      text: [
        `Hi ${name},`,
        "",
        `Your Labe project for ${business} is confirmed.`,
        "",
        "You do not need to have everything ready today. Your private onboarding link is below—work through it when you are ready, and leave anything you do not have yet. We will help with the rest.",
        "",
        `Complete your onboarding: ${onboardingUrl}`,
        "",
        "Your project manager is Max Walsh. Text is preferred on 0432 076 236, or email business.maxwalsh@gmail.com. For urgent matters, Max will call from Labe on 0414 785 829.",
        "",
        "Labe",
      ].join("\n"),
      html: welcomeEmailHtml({ name, business, onboardingUrl }),
    }),
  });

  if (!response.ok) {
    throw new Error("Welcome email could not be delivered.");
  }
}

function formatPlan(plan?: string | null) {
  if (plan === "growth") return "Labe Growth";
  if (plan === "launch") return "Labe Launch";
  return "Not provided";
}

async function notifyLabe({
  eventId,
  subject,
  heading,
  lines,
}: {
  eventId: string;
  subject: string;
  heading: string;
  lines: string[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.info("Stripe event verified", eventId, subject);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": eventId,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      text: [heading, "", ...lines].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
          <h1 style="font-size:24px">${escapeHtml(heading)}</h1>
          ${lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
        </div>
      `,
    }),
  });

  if (!response.ok) {
    throw new Error("Stripe notification email could not be delivered.");
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function welcomeEmailHtml({
  name,
  business,
  onboardingUrl,
}: {
  name: string;
  business: string;
  onboardingUrl: string;
}) {
  return `
    <div style="margin:0;padding:32px 16px;background:#f6f8fc;font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
      <div style="max-width:620px;margin:0 auto;overflow:hidden;border:1px solid #e2e8f0;border-radius:24px;background:#fff">
        <div style="padding:32px;background:#0f172a;color:#fff">
          <p style="margin:0;font-size:14px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#93c5fd">Welcome to Labe</p>
          <h1 style="margin:8px 0 0;font-size:30px;line-height:1.2">Your project is confirmed.</h1>
        </div>
        <div style="padding:32px;font-size:16px">
          <p style="margin:0 0 16px">Hi ${escapeHtml(name)},</p>
          <p style="margin:0 0 16px">Your Labe project for ${escapeHtml(business)} is confirmed.</p>
          <p style="margin:0 0 24px">You do not need to have everything ready today. Your private onboarding link is below—work through it when you are ready, and leave anything you do not have yet. We will help with the rest.</p>
          <p style="margin:0 0 28px"><a href="${escapeHtml(onboardingUrl)}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#2563eb;color:#fff;font-weight:800;text-decoration:none">Complete your onboarding</a></p>
          <div style="padding:20px;border-radius:16px;background:#f1f5f9">
            <p style="margin:0 0 8px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#2563eb">Your direct contact</p>
            <p style="margin:0;font-weight:700">Max Walsh · Senior Project Manager</p>
            <p style="margin:8px 0 0;color:#475569;font-size:14px">Text preferred: 0432 076 236<br/>business.maxwalsh@gmail.com<br/>For urgent matters, Max will call from Labe on 0414 785 829.</p>
          </div>
        </div>
        <div style="padding:18px 32px;background:#f8fafc;color:#64748b;font-size:13px">Labe Labs · Adelaide, South Australia</div>
      </div>
    </div>
  `;
}
