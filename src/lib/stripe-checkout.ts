import Stripe from "stripe";

export type VerifiedCheckout = {
  session: Stripe.Checkout.Session;
  email: string;
  plan: "launch" | "growth";
};

export async function getVerifiedLabeCheckout(sessionId: string): Promise<VerifiedCheckout | null> {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || !sessionId.startsWith("cs_")) return null;

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const plan = session.metadata?.plan;
    const email = session.customer_details?.email || session.customer_email || "";
    const isLabePackage = plan === "launch" || plan === "growth";

    if (
      session.status !== "complete" ||
      session.payment_status !== "paid" ||
      !isLabePackage ||
      !session.client_reference_id ||
      !email
    ) {
      return null;
    }

    return { session, email, plan };
  } catch {
    return null;
  }
}
