import { hasValidDashboardSession, listProjects } from "@/lib/dashboard";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  if (!hasValidDashboardSession(cookieStore.get("labe_dashboard")?.value)) {
    return Response.json({ message: "Not signed in." }, { status: 401 });
  }

  try {
    return Response.json({ projects: await listProjects() });
  } catch (error) {
    console.error("Dashboard projects error", error);
    return Response.json(
      { message: "The dashboard database is not connected yet." },
      { status: 503 },
    );
  }
}
