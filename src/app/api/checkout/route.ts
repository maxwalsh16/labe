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
  addOns?: unknown;
  termsAccepted?: unknown;
};

const validAddOns = [
  "business_email",
  "google_business_profile",
  "google_ads",
  "meta_ads",
  "ads_bundle",
  "ai_receptionist",
] as const;
type AddOn = (typeof validAddOns)[number];

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
  const addOns = Array.isArray(payload.addOns)
    ? [
        ...new Set(
          payload.addOns.filter(
            (item): item is AddOn =>
              typeof item === "string" &&
              validAddOns.includes(item as AddOn),
          ),
        ),
      ]
    : [];

  if (
    addOns.includes("ads_bundle") &&
    (addOns.includes("google_ads") || addOns.includes("meta_ads"))
  ) {
    return Response.json(
      {
        message:
          "Choose either the advertising bundle or the individual advertising setups.",
      },
      { status: 400 },
    );
  }

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
  const hasRecurringCharge = isGrowth;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = isGrowth
    ? [
        {
          price_data: {
            currency: "aud",
            unit_amount: 299900,
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
            unit_amount: 14900,
            recurring: { interval: "month" },
            product_data: {
              name: "Labe Growth — ongoing service",
              description:
                "Standard usage, ongoing checks, and one minor content update each month.",
            },
          },
          quantity: 1,
        },
      ]
    : [
        {
          price_data: {
            currency: "aud",
            unit_amount: 199900,
            product_data: {
              name: "Labe Launch",
              description:
                "A focused 1–2 page lead-generation website with no ongoing Labe subscription.",
            },
          },
          quantity: 1,
        },
      ];

  if (addOns.includes("google_ads")) {
    lineItems.push(oneTimeAddOn("Google Ads setup", 75000));
  }

  if (addOns.includes("meta_ads")) {
    lineItems.push(oneTimeAddOn("Meta Ads setup", 75000));
  }

  if (addOns.includes("ads_bundle")) {
    lineItems.push(
      oneTimeAddOn("Google + Meta Ads bundle", 125000, "Bundle saving: $250."),
    );
  }

  if (!isGrowth && addOns.includes("business_email")) {
    lineItems.push(
      oneTimeAddOn(
        "Business email, template & automation — setup",
        59900,
        "Professional email setup, a custom professional email template, and automated email configuration. Email provider plan is paid separately by the customer.",
      ),
    );
  }

  if (!isGrowth && addOns.includes("google_business_profile")) {
    lineItems.push(
      oneTimeAddOn(
        "Google Business Profile — setup and optimisation",
        34900,
        "Google Business Profile setup or optimisation for local visibility.",
      ),
    );
  }

  if (!isGrowth && addOns.includes("ai_receptionist")) {
    lineItems.push(
      oneTimeAddOn(
        "AI receptionist — setup",
        49900,
        "Initial AI receptionist setup and configuration. The provider subscription is paid separately by the customer.",
      ),
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: hasRecurringCharge ? "subscription" : "payment",
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
      ...(hasRecurringCharge
        ? {
            subscription_data: {
              trial_period_days: 7,
            },
          }
        : {}),
      line_items: lineItems,
      metadata: {
        plan,
        add_ons: addOns.join(",") || "None",
        ai_receptionist:
          isGrowth
            ? "AI receptionist setup included; provider subscription paid separately"
            : addOns.includes("ai_receptionist")
              ? "Paid AI receptionist setup; provider subscription paid separately"
              : "Not selected",
        business_email:
          isGrowth
            ? "Business email, custom professional email template, and automation included with Growth; provider plan paid separately"
            : addOns.includes("business_email")
              ? "Paid business email, custom professional email template, and automation setup; provider plan paid separately"
              : "Not selected",
        google_business_profile:
          isGrowth
            ? "Google Business Profile setup and optimisation included with Growth"
            : addOns.includes("google_business_profile")
              ? "Paid Google Business Profile setup and optimisation"
              : "Not selected",
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

function oneTimeAddOn(
  name: string,
  unitAmount: number,
  description?: string,
): Stripe.Checkout.SessionCreateParams.LineItem {
  return {
    price_data: {
      currency: "aud",
      unit_amount: unitAmount,
      product_data: {
        name,
        ...(description ? { description } : {}),
      },
    },
    quantity: 1,
  };
}
