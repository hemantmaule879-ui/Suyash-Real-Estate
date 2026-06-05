import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { leadsDb } from "@/lib/db";

// Helper to escape CSV cell content
function escapeCSV(text) {
  if (text === null || text === undefined) return "";
  const stringVal = String(text);
  if (stringVal.includes(",") || stringVal.includes('"') || stringVal.includes("\n") || stringVal.includes("\r")) {
    return `"${stringVal.replace(/"/g, '""')}"`;
  }
  return stringVal;
}

export async function GET() {
  // Check authorization
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get leads
  const leads = leadsDb.getAll();

  // CSV headers
  const csvHeaders = ["Lead ID", "Date", "Name", "Mobile Number", "Email", "Property Interest", "Message"];
  const csvRows = [csvHeaders.join(",")];

  leads.forEach(lead => {
    const formattedDate = new Date(lead.date).toLocaleString("en-IN");
    const row = [
      escapeCSV(lead.id),
      escapeCSV(formattedDate),
      escapeCSV(lead.name),
      escapeCSV(lead.mobile),
      escapeCSV(lead.email),
      escapeCSV(lead.propertyTitle || "General Enquiry"),
      escapeCSV(lead.message)
    ];
    csvRows.push(row.join(","));
  });

  const csvContent = csvRows.join("\r\n");

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=suyash_real_estate_leads.csv"
    }
  });
}

// Ensure this route is evaluated on demand
export const dynamic = "force-dynamic";
