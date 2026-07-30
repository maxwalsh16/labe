import { hasValidDashboardSession, setTaskCompletion } from "@/lib/dashboard";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const cookieStore = await cookies();
  if (!hasValidDashboardSession(cookieStore.get("labe_dashboard")?.value)) {
    return Response.json({ message: "Not signed in." }, { status: 401 });
  }
  const { completed } = (await request.json()) as { completed?: boolean };
  const { taskId } = await params;
  try {
    const projectId = await setTaskCompletion(taskId, Boolean(completed));
    return Response.json({ projectId });
  } catch (error) {
    return Response.json({ message: error instanceof Error ? error.message : "Task could not be updated." }, { status: 400 });
  }
}
