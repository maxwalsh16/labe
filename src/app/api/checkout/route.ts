import { siteConfig } from "@/lib/site";
import Stripe from "stripe";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CheckoutPayload = {
  plan?: unknown;
  name?: unknown;
  business?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  termsAccepted?: unknown;
};

export async function POST(request: Request) {
  let payload: CheckoutPayload;

  try {
    payload = (await request.json()) as CheckoutPayload;
  } catch {
    return Response.json(
      { message: "Please check your details and try again." },
      { status: 400 },
    );
  }

  const plan = asText(payload.plan);
  const name = asText(payload.name);
  const business = asText(payload.business);
  const email = asText(payload.email);
  const phone = asText(payload.phone);
  const website = asText(payload.website);

  if (
    !["launch", "growth"].includes(plan) ||
    !name ||
    !business ||
    !emailPattern.test(email) ||
    !phone ||
    payload.termsAccepted !== true
  ) {
    return Response.json(
      { message: "Please complete every required field and accept the terms." },
      { status: 400 },
    );
  }

  if (
    name.length > 80 ||
    business.length > 100 ||
    email.length > 160 ||
    phone.length > 40 ||
    website.length > 240
  ) {
    return Response.json(
      { message: "One or more details are too long. Please shorten them." },
      { status: 400 },
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return Response.json(
      {
        message:
          "Secure checkout is being connected. Please email hello@labe.com.au for now.",
      },
      { status: 503 },
    );
  }

  const stripe = new Stripe(secretKey);
  const brandIconFile = process.env.STRIPE_BRAND_ICON_FILE;
  const requestUrl = new URL(request.url);
  const origin =
    process.env.NODE_ENV === "production"
      ? siteConfig.url
      : requestUrl.origin;
  const isGrowth = plan === "growth";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: isGrowth ? "subscription" : "payment",
      managed_payments: { enabled: false },
      branding_settings: {
        background_color: "#ffffff",
        border_style: "rounded",
        button_color: "#2563eb",
        display_name: "Labe",
        font_family: "inter",
        ...(brandIconFile
          ? { icon: { type: "file" as const, file: brandIconFile } }
          : {}),
      },
      customer_email: email,
      client_reference_id: crypto.randomUUID(),
      line_items: isGrowth
        ? [
            {
              price_data: {
                currency: "aud",
                unit_amount: 199900,
                product_data: {
                  name: "Labe Growth — setup",
                  description:
                    "Website, AI-assisted lead handling, booking, and automated follow-up setup.",
                },
              },
              quantity: 1,
            },
            {
              price_data: {
                currency: "aud",
                unit_amount: 2499,
                recurring: { interval: "month" },
                product_data: {
                  name: "Labe Growth — ongoing service",
                  description:
                    "Standard usage, ongoing checks, and minor content updates.",
                },
              },
              quantity: 1,
            },
          ]
        : [
            {
              price_data: {
                currency: "aud",
                unit_amount: 99900,
                product_data: {
                  name: "Labe Launch",
                  description:
                    "A focused 1–2 page lead-generation website with no ongoing Labe subscription.",
                },
              },
              quantity: 1,
            },
          ],
      metadata: {
        plan,
        name,
        business,
        phone,
        website: website || "Not provided",
      },
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      success_url: `${origin}/start/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/start?plan=${plan}`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return Response.json(
      {
        message:
          "Checkout could not be opened. Please try again or email hello@labe.com.au.",
      },
      { status: 502 },
    );
  }
}

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
