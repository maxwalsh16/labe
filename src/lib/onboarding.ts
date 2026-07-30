import { createHmac, timingSafeEqual } from "crypto";

const tokenLifetimeDays = 60;

type OnboardingToken = {
  sessionId: string;
  expiresAt: number;
};

export function createOnboardingToken(sessionId: string) {
  const secret = getOnboardingSecret();
  const expiresAt = Math.floor(Date.now() / 1000) + tokenLifetimeDays * 24 * 60 * 60;
  const payload = `${sessionId}.${expiresAt}`;
  const signature = sign(payload, secret);

  return `${payload}.${signature}`;
}

export function readOnboardingToken(token: string): OnboardingToken | null {
  const parts = token.split(".");

  if (parts.length !== 3) return null;

  const [sessionId, expiresAtText, signature] = parts;
  const expiresAt = Number(expiresAtText);

  if (!sessionId || !Number.isSafeInteger(expiresAt) || expiresAt < Date.now() / 1000) {
    return null;
  }

  try {
    const expected = sign(`${sessionId}.${expiresAt}`, getOnboardingSecret());
    const receivedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    if (
      receivedBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(receivedBuffer, expectedBuffer)
    ) {
      return null;
    }
  } catch {
    return null;
  }

  return { sessionId, expiresAt };
}

function getOnboardingSecret() {
  const secret = process.env.ONBOARDING_LINK_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("ONBOARDING_LINK_SECRET is not configured.");
  }

  return secret;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}
