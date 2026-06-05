import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { propertiesDb } from "@/lib/db";
import EditPropertyClient from "./EditPropertyClient";

export const metadata = {
  title: "Edit Property Listing | Suyash Real Estate"
};

export default async function EditPropertyPage({ params }) {
  // Check authorization
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const property = propertiesDb.getById(id);

  if (!property) {
    notFound();
  }

  return <EditPropertyClient property={property} />;
}

// Force dynamic execution to prevent caching
export const dynamic = "force-dynamic";
export const revalidate = 0;
