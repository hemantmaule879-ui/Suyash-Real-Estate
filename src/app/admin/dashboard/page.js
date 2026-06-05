import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { propertiesDb, leadsDb } from "@/lib/db";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Admin Dashboard | Suyash Real Estate"
};

export default async function DashboardPage() {
  // Check authorization
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    redirect("/admin/login");
  }

  // Load properties and leads from local database
  const properties = propertiesDb.getAll();
  // Sort leads by date descending
  const leads = [...leadsDb.getAll()].sort((a, b) => new Date(b.date) - new Date(a.date));

  return <DashboardClient initialProperties={properties} initialLeads={leads} />;
}

// Force dynamic execution to prevent static caching of dashboard details
export const dynamic = "force-dynamic";
export const revalidate = 0;
