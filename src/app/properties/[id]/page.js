import Link from "next/link";
import { notFound } from "next/navigation";
import { propertiesDb } from "@/lib/db";
import ImageGallery from "@/components/ImageGallery";
import LeadForm from "@/components/LeadForm";

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = propertiesDb.getById(id);
  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} | Suyash Real Estate`,
    description: `Price: ${property.price.toLocaleString("en-IN")}. ${property.description.substring(0, 150)}...`,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [{ url: property.images?.[0] || "/placeholder.jpg" }]
    }
  };
}

// Price formatting helper
function formatPrice(price, type) {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString("en-IN")}${type === "Rent" ? "/mo" : ""}`;
}

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  const property = propertiesDb.getById(id);

  if (!property) {
    notFound();
  }

  // Pre-formatted WhatsApp deep link message
  const whatsappMsg = `Hello, I am interested in the property: ${property.title}. Please share more details.`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`;

  // JSON-LD Schema Markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    "name": property.title,
    "description": property.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address,
      "addressLocality": property.locality,
      "addressRegion": property.city,
      "addressCountry": "IN"
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "INR",
      "availability": property.status === "Available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <div>
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 style={{ fontSize: "28px", lineHeight: "1.3" }}>{property.title}</h1>
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/properties">Properties</Link>
            <span>/</span>
            <span>Details</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "40px", alignItems: "start" }}>
          
          {/* Main Details (Left Column) */}
          <div>
            <ImageGallery images={property.images} title={property.title} />

            <div style={{ marginTop: "40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--color-border)", paddingBottom: "20px", marginBottom: "30px" }}>
                <div>
                  <span className="property-tag" style={{ fontSize: "14px" }}>{property.category}</span>
                  <h2 className="font-serif" style={{ fontSize: "32px", marginTop: "4px" }}>
                    {formatPrice(property.price, property.type)}
                  </h2>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "16px", marginTop: "6px" }}>
                    📍 {property.address}, {property.locality}, {property.city}
                  </p>
                </div>
                <div>
                  <span className={`badge ${property.status === "Available" ? "badge-available" : property.status === "Rented" ? "badge-rent" : "badge-sold"}`} style={{ fontSize: "14px", padding: "6px 16px" }}>
                    {property.status}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
                backgroundColor: "var(--color-bg-light)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                marginBottom: "40px",
                border: "1px solid var(--color-border)",
                textAlign: "center"
              }}>
                <div>
                  <span style={{ fontSize: "24px", display: "block", marginBottom: "4px" }}>📏</span>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase", display: "block" }}>Area</span>
                  <strong style={{ fontSize: "16px", color: "var(--color-primary)" }}>{property.area} sq.ft</strong>
                </div>
                <div>
                  <span style={{ fontSize: "24px", display: "block", marginBottom: "4px" }}>🛏️</span>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase", display: "block" }}>Bedrooms</span>
                  <strong style={{ fontSize: "16px", color: "var(--color-primary)" }}>{property.bedrooms > 0 ? `${property.bedrooms} BHK` : "NA"}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "24px", display: "block", marginBottom: "4px" }}>🛁</span>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase", display: "block" }}>Bathrooms</span>
                  <strong style={{ fontSize: "16px", color: "var(--color-primary)" }}>{property.bathrooms > 0 ? `${property.bathrooms} Baths` : "NA"}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "24px", display: "block", marginBottom: "4px" }}>🚗</span>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase", display: "block" }}>Parking</span>
                  <strong style={{ fontSize: "16px", color: "var(--color-primary)", overflow: "hidden", textOverflow: "ellipsis", display: "block", whiteSpace: "nowrap" }}>{property.parking}</strong>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: "40px" }}>
                <h3 className="font-serif" style={{ fontSize: "22px", marginBottom: "16px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
                  Description
                </h3>
                <p style={{ color: "var(--color-text-dark)", lineHeight: "1.8", fontSize: "16px", whiteSpace: "pre-line" }}>
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div style={{ marginBottom: "40px" }}>
                  <h3 className="font-serif" style={{ fontSize: "22px", marginBottom: "16px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
                    Amenities & Features
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    {property.amenities.map((amenity, idx) => (
                      <span key={idx} style={{
                        padding: "8px 16px",
                        backgroundColor: "var(--color-bg-light)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "50px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "var(--color-primary)"
                      }}>
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Map */}
              {property.googleMapLocation && (
                <div>
                  <h3 className="font-serif" style={{ fontSize: "22px", marginBottom: "16px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
                    Property Location
                  </h3>
                  <div className="map-wrapper" style={{ height: "350px" }}>
                    {property.googleMapLocation.startsWith("https://") ? (
                      <iframe
                        src={property.googleMapLocation}
                        className="map-iframe"
                        style={{ height: "350px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    ) : (
                      <div className="flex-center" style={{ height: "100%", backgroundColor: "var(--color-bg-light)", color: "var(--color-text-muted)" }}>
                        Map location reference: {property.googleMapLocation}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Contact (Right Column) */}
          <aside style={{
            backgroundColor: "#fff",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "30px 24px",
            boxShadow: "var(--shadow-sm)",
            position: "sticky",
            top: "100px"
          }}>
            <h3 className="font-serif" style={{ fontSize: "22px", marginBottom: "20px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
              Enquire About Property
            </h3>

            {/* Direct Broker Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
              <Link href={whatsappUrl} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
                💬 Enquire on WhatsApp
              </Link>
              <Link href="tel:+919876543210" className="btn btn-outline" style={{ width: "100%" }}>
                📞 Call Broker Now
              </Link>
            </div>

            <div style={{
              position: "relative",
              textAlign: "center",
              margin: "24px 0",
              borderBottom: "1px solid var(--color-border)",
              lineHeight: "0.1em"
            }}>
              <span style={{ background: "#fff", padding: "0 10px", color: "var(--color-text-muted)", fontSize: "14px" }}>
                OR WRITE TO US
              </span>
            </div>

            {/* Lead capture form */}
            <LeadForm propertyId={property.id} propertyTitle={property.title} />

            {/* Broker profile info */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "1px solid var(--color-border)"
            }}>
              <div className="testimonial-avatar" style={{ width: "40px", height: "40px", fontSize: "14px" }}>PB</div>
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "600", color: "var(--color-primary)" }}>Suyash Real Estate</h4>
                <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Chief Relationship Executive</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

// Enable dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;
