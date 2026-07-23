import Stripe from "stripe";

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
            `Email: ${
              session.customer_details?.email ||
              session.customer_email ||
              "Not provided"
            }`,
            `Phone: ${
              session.customer_details?.phone ||
              session.metadata?.phone ||
              "Not provided"
            }`,
            `Website: ${session.metadata?.website || "Not provided"}`,
            `Stripe session: ${session.id}`,
          ],
        });
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
