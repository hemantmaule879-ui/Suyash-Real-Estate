"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePropertyAction, deleteLeadAction, logoutAdminAction } from "@/app/actions";

// Price formatting helper
function formatPrice(price, type) {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString("en-IN")}${type === "Rent" ? "/mo" : ""}`;
}

export default function DashboardClient({ initialProperties = [], initialLeads = [] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("properties");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // Handle Logout
  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out of the Broker Panel?")) {
      await logoutAdminAction();
      router.push("/admin/login");
      router.refresh();
    }
  };

  // Handle Delete Property
  const handleDeleteProperty = async (id, title) => {
    if (confirm(`Are you sure you want to permanently delete listing: "${title}"?`)) {
      startTransition(async () => {
        const success = await deletePropertyAction(id);
        if (success) {
          alert("Listing deleted successfully.");
          router.refresh();
        } else {
          alert("Failed to delete listing.");
        }
      });
    }
  };

  // Handle Delete Lead
  const handleDeleteLead = async (id, clientName) => {
    if (confirm(`Are you sure you want to delete lead from: "${clientName}"?`)) {
      startTransition(async () => {
        const success = await deleteLeadAction(id);
        if (success) {
          alert("Lead enquiry deleted successfully.");
          router.refresh();
        } else {
          alert("Failed to delete lead.");
        }
      });
    }
  };

  // Filter lists based on search bar
  const filteredProperties = initialProperties.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLeads = initialLeads.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.mobile.includes(searchQuery) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      {/* Top Header Panel */}
      <div className="admin-header" style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "20px" }}>
        <div>
          <span className="section-subtitle" style={{ textAlign: "left" }}>Broker Operations</span>
          <h1 className="font-serif" style={{ fontSize: "36px", marginTop: "4px" }}>
            Broker Control Center
          </h1>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/admin/properties/new" className="btn btn-accent btn-sm">
            ➕ Add Listing
          </Link>
          <a href="/admin/leads/export" className="btn btn-outline btn-sm" download>
            📥 Export Leads (CSV)
          </a>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            🔒 Log Out
          </button>
        </div>
      </div>

      {/* Tabs and Quick Search bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "30px 0",
        gap: "16px",
        flexWrap: "wrap"
      }}>
        {/* Tab buttons */}
        <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "1px" }}>
          <button
            onClick={() => { setActiveTab("properties"); setSearchQuery(""); }}
            style={{
              padding: "12px 24px",
              fontWeight: "600",
              fontSize: "15px",
              border: "none",
              background: "none",
              cursor: "pointer",
              borderBottom: activeTab === "properties" ? "3px solid var(--color-accent)" : "3px solid transparent",
              color: activeTab === "properties" ? "var(--color-primary)" : "var(--color-text-muted)"
            }}
          >
            Properties ({initialProperties.length})
          </button>
          <button
            onClick={() => { setActiveTab("leads"); setSearchQuery(""); }}
            style={{
              padding: "12px 24px",
              fontWeight: "600",
              fontSize: "15px",
              border: "none",
              background: "none",
              cursor: "pointer",
              borderBottom: activeTab === "leads" ? "3px solid var(--color-accent)" : "3px solid transparent",
              color: activeTab === "leads" ? "var(--color-primary)" : "var(--color-text-muted)"
            }}
          >
            Customer Leads ({initialLeads.length})
          </button>
        </div>

        {/* Quick Search */}
        <div style={{ width: "100%", maxWidth: "350px" }}>
          <input
            type="text"
            className="form-control"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="admin-card">
        {activeTab === "properties" ? (
          <div>
            <h3 className="font-serif" style={{ fontSize: "22px", marginBottom: "20px" }}>
              Active Property Listings
            </h3>

            {filteredProperties.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-text-muted)" }}>
                No property listings found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProperties.map((prop) => (
                      <tr key={prop.id}>
                        <td>
                          <img
                            src={prop.images?.[0] || "/placeholder.jpg"}
                            alt={prop.title}
                            className="admin-img-thumb"
                          />
                        </td>
                        <td>
                          <div style={{ fontWeight: "600", color: "var(--color-primary)" }}>{prop.title}</div>
                          <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                            📍 {prop.locality}, {prop.city}
                          </div>
                        </td>
                        <td>{prop.category}</td>
                        <td style={{ fontWeight: "600" }}>{formatPrice(prop.price, prop.type)}</td>
                        <td>
                          <span className={`badge ${prop.status === "Available" ? "badge-available" : prop.status === "Rented" ? "badge-rent" : "badge-sold"}`}>
                            {prop.status}
                          </span>
                        </td>
                        <td>
                          {prop.featured ? (
                            <span className="badge badge-featured" style={{ fontSize: "10px" }}>Yes</span>
                          ) : (
                            <span style={{ color: "var(--color-text-muted)", fontSize: "13px" }}>No</span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <Link href={`/admin/properties/${prop.id}/edit`} className="btn btn-outline btn-sm" style={{ padding: "6px 12px" }}>
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteProperty(prop.id, prop.title)}
                              disabled={isPending}
                              className="btn btn-danger btn-sm"
                              style={{ padding: "6px 12px" }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="font-serif" style={{ fontSize: "22px", marginBottom: "20px" }}>
              Customer Enquiries & Leads
            </h3>

            {filteredLeads.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-text-muted)" }}>
                No customer lead submissions found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Client Info</th>
                      <th>Property Interested In</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {new Date(lead.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                        <td>
                          <div style={{ fontWeight: "600", color: "var(--color-primary)" }}>{lead.name}</div>
                          <div style={{ marginTop: "4px" }}>
                            📞 <a href={`tel:${lead.mobile}`} style={{ color: "var(--color-text-dark)", textDecoration: "underline" }}>{lead.mobile}</a>
                          </div>
                          {lead.email && (
                            <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                              ✉ <a href={`mailto:${lead.email}`}>{lead.email}</a>
                            </div>
                          )}
                        </td>
                        <td>
                          {lead.propertyId ? (
                            <Link href={`/properties/${lead.propertyId}`} target="_blank" style={{ fontWeight: "600", color: "var(--color-accent)", textDecoration: "underline" }}>
                              {lead.propertyTitle}
                            </Link>
                          ) : (
                            <span style={{ fontStyle: "italic", color: "var(--color-text-muted)" }}>General Enquiry</span>
                          )}
                        </td>
                        <td style={{ maxWidth: "250px", wordBreak: "break-word" }}>
                          {lead.message}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteLead(lead.id, lead.name)}
                            disabled={isPending}
                            className="btn btn-danger btn-sm"
                            style={{ padding: "6px 12px" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
