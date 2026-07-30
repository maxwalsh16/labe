import {
  createDashboardSession,
  dashboardCookieName,
  verifyDashboardPassword,
} from "@/lib/dashboard";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return Response.json({ message: "Please enter your password." }, { status: 400 });
  }

  if (!verifyDashboardPassword(password)) {
    return Response.json({ message: "That password is not right." }, { status: 401 });
  }

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${dashboardCookieName()}=${createDashboardSession()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=2592000${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return response;
}

export async function DELETE() {
  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${dashboardCookieName()}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return response;
}
