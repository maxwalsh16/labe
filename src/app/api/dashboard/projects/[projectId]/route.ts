import { getProject, hasValidDashboardSession } from "@/lib/dashboard";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> },
) {
  const cookieStore = await cookies();
  if (!hasValidDashboardSession(cookieStore.get("labe_dashboard")?.value)) {
    return Response.json({ message: "Not signed in." }, { status: 401 });
  }

  const { projectId } = await params;
  try {
    const project = await getProject(projectId);
    if (!project) return Response.json({ message: "Project not found." }, { status: 404 });
    return Response.json({ project });
  } catch (error) {
    console.error("Dashboard project error", error);
    return Response.json({ message: "The dashboard could not load this project." }, { status: 503 });
  }
}
