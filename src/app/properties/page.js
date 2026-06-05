import Link from "next/link";
import { propertiesDb } from "@/lib/db";

export const metadata = {
  title: "Search Properties | Suyash Real Estate",
  description: "Browse and filter our available rental flats, bungalows, commercial spaces, and lands for sale."
};

// Price formatting helper
function formatPrice(price, type) {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString("en-IN")}${type === "Rent" ? "/mo" : ""}`;
}

export default async function PropertiesPage({ searchParams }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const location = params.location || "";
  const category = params.category || "";
  const budget = params.budget || "";
  const bedrooms = params.bedrooms || "";
  const type = params.type || "";
  const status = params.status || "";

  // Get and filter listings
  let listings = propertiesDb.getAll();

  if (location) {
    const locLower = location.toLowerCase();
    listings = listings.filter(
      p =>
        p.city.toLowerCase().includes(locLower) ||
        p.locality.toLowerCase().includes(locLower) ||
        p.address.toLowerCase().includes(locLower)
    );
  }

  if (category) {
    listings = listings.filter(p => p.category === category);
  }

  if (type) {
    listings = listings.filter(p => p.type === type);
  }

  if (status) {
    listings = listings.filter(p => p.status === status);
  }

  if (budget) {
    if (budget.includes("-")) {
      const [min, max] = budget.split("-").map(parseFloat);
      listings = listings.filter(p => p.price >= min && p.price <= max);
    } else {
      const maxBudget = parseFloat(budget);
      listings = listings.filter(p => p.price <= maxBudget);
    }
  }

  if (bedrooms) {
    if (bedrooms === "1RK") {
      listings = listings.filter(p => 
        p.title.toLowerCase().includes("1 rk") || 
        p.title.toLowerCase().includes("1rk") || 
        p.description.toLowerCase().includes("1 rk") || 
        p.description.toLowerCase().includes("1rk")
      );
    } else if (bedrooms === "1") {
      listings = listings.filter(p => 
        p.bedrooms === 1 && 
        !p.title.toLowerCase().includes("1 rk") && 
        !p.title.toLowerCase().includes("1rk") &&
        !p.description.toLowerCase().includes("1 rk") && 
        !p.description.toLowerCase().includes("1rk")
      );
    } else {
      const bedsCount = parseInt(bedrooms);
      listings = listings.filter(p => p.bedrooms === bedsCount);
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Search Listings</h1>
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Properties</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <section className="section">
        <div className="container search-page-grid">
          {/* Sidebar Filter */}
          <aside style={{
            backgroundColor: "#fff",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "var(--shadow-sm)",
            position: "sticky",
            top: "100px"
          }}>
            <h3 className="font-serif" style={{ fontSize: "20px", marginBottom: "20px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
              Filter Properties
            </h3>

            <form action="/properties" method="GET">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                
                {/* Location Search */}
                <div className="form-group">
                  <label htmlFor="location" className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-text-muted)" }}>
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    defaultValue={location}
                    className="form-control"
                    placeholder="City, locality, society"
                  />
                </div>

                {/* Category Selection */}
                <div className="form-group">
                  <label htmlFor="category" className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-text-muted)" }}>
                    Category
                  </label>
                  <select id="category" name="category" defaultValue={category} className="form-control">
                    <option value="">All Categories</option>
                    <option value="Rental Flats">Rental Flats</option>
                    <option value="Rental Row Houses">Rental Row Houses</option>
                    <option value="Rental Bungalows">Rental Bungalows</option>
                    <option value="Lands for Sale">Lands for Sale</option>
                    <option value="Commercial Properties">Commercial Properties</option>
                  </select>
                </div>

                {/* Deal Type (Rent / Sale) */}
                <div className="form-group">
                  <label htmlFor="type" className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-text-muted)" }}>
                    Deal Type
                  </label>
                  <select id="type" name="type" defaultValue={type} className="form-control">
                    <option value="">Rent & Sale</option>
                    <option value="Rent">For Rent</option>
                    <option value="Sale">For Sale</option>
                  </select>
                </div>

                {/* Bedrooms Selection */}
                <div className="form-group">
                  <label htmlFor="bedrooms" className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-text-muted)" }}>
                    Bedrooms
                  </label>
                  <select id="bedrooms" name="bedrooms" defaultValue={bedrooms} className="form-control">
                    <option value="">Any BHK</option>
                    <option value="1RK">1 RK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>

                {/* Budget Selection */}
                <div className="form-group">
                  <label htmlFor="budget" className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-text-muted)" }}>
                    Budget Range
                  </label>
                  <select id="budget" name="budget" defaultValue={budget} className="form-control">
                    <option value="">Any Budget</option>
                    <option value="10000">Under ₹10,000 / mo</option>
                    <option value="11000-16000">₹11,000 - ₹16,000 / mo</option>
                    <option value="17000-22000">₹17,000 - ₹22,000 / mo</option>
                    <option value="23000-30000">₹23,000 - ₹30,000 / mo</option>
                    <option value="50000">Under ₹50,000 / mo</option>
                    <option value="100000">Under ₹1,00,000 / mo</option>
                    <option value="5000000">Under ₹50 Lakhs (Sale)</option>
                    <option value="15000000">Under ₹1.5 Crores (Sale)</option>
                    <option value="30000000">Under ₹3 Crores (Sale)</option>
                  </select>
                </div>

                {/* Status Selection */}
                <div className="form-group">
                  <label htmlFor="status" className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-text-muted)" }}>
                    Property Status
                  </label>
                  <select id="status" name="status" defaultValue={status} className="form-control">
                    <option value="">All Statuses</option>
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }}>
                  Apply Filters
                </button>

                <Link href="/properties" className="btn btn-outline btn-sm" style={{ width: "100%", display: "block", textDecoration: "none" }}>
                  Reset Filters
                </Link>
              </div>
            </form>
          </aside>

          {/* Listings List */}
          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "16px"
            }}>
              <p style={{ color: "var(--color-text-muted)", fontSize: "15px" }}>
                Showing <strong style={{ color: "var(--color-primary)" }}>{listings.length}</strong> matching properties
              </p>
            </div>

            {listings.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "80px 24px",
                backgroundColor: "#fff",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)"
              }}>
                <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}>🔍</span>
                <h3 className="font-serif" style={{ fontSize: "24px", marginBottom: "8px" }}>No Properties Found</h3>
                <p style={{ color: "var(--color-text-muted)", maxWidth: "450px", margin: "0 auto 24px auto", fontSize: "15px" }}>
                  We couldn't find any properties matching your current filter selection. Try adjusting filters or searching for another location.
                </p>
                <Link href="/properties" className="btn btn-primary">
                  View All Listings
                </Link>
              </div>
            ) : (
              <div className="properties-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
                {listings.map((prop) => (
                  <div key={prop.id} className="property-card">
                    <div className="property-img-wrapper" style={{ height: "200px" }}>
                      <div className="property-badges">
                        <span className={`badge ${prop.type === "Rent" ? "badge-rent" : "badge-sale"}`}>
                          For {prop.type}
                        </span>
                        {prop.featured && <span className="badge badge-featured">Featured</span>}
                        <span className={`badge ${prop.status === "Available" ? "badge-available" : prop.status === "Rented" ? "badge-rent" : "badge-sold"}`} style={{ marginTop: "4px" }}>
                          {prop.status}
                        </span>
                      </div>
                      <img
                        src={prop.images?.[0] || "/placeholder.jpg"}
                        alt={prop.title}
                        className="property-img"
                      />
                      <div className="property-price-badge" style={{ fontSize: "16px", padding: "6px 12px" }}>
                        {formatPrice(prop.price, prop.type)}
                      </div>
                    </div>

                    <div className="property-content" style={{ padding: "20px" }}>
                      <span className="property-tag">{prop.category}</span>
                      <h3 className="property-card-title" style={{ fontSize: "18px", height: "50px", marginBottom: "8px" }}>
                        <Link href={`/properties/${prop.id}`}>{prop.title}</Link>
                      </h3>
                      <div className="property-location" style={{ marginBottom: "12px" }}>
                        <span>📍 {prop.locality}, {prop.city}</span>
                      </div>

                      <div className="property-details-strip" style={{ paddingTop: "12px" }}>
                        <div className="property-detail-item">
                          <span>📏 {prop.area}</span> sq.ft
                        </div>
                        {prop.bedrooms > 0 && (
                          <div className="property-detail-item">
                            <span>🛏️ {prop.bedrooms}</span> BHK
                          </div>
                        )}
                        {prop.bathrooms > 0 && (
                          <div className="property-detail-item">
                            <span>🛁 {prop.bathrooms}</span> Baths
                          </div>
                        )}
                      </div>
                      
                      <div style={{ marginTop: "16px" }}>
                        <Link href={`/properties/${prop.id}`} className="btn btn-outline btn-sm" style={{ width: "100%" }}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
