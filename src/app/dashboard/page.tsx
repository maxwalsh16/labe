import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { DashboardLogin } from "@/components/dashboard/DashboardLogin";
import { dashboardCookieName, hasValidDashboardSession } from "@/lib/dashboard";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Labe project desk",
  description: "Private Labe operations dashboard.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const isPreview = process.env.NODE_ENV !== "production";
  const cookieStore = await cookies();
  const signedIn = hasValidDashboardSession(cookieStore.get(dashboardCookieName())?.value);
  return signedIn ? <DashboardClient /> : isPreview ? <DashboardClient preview /> : <DashboardLogin />;
}
