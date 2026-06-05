import Link from "next/link";

export const metadata = {
  title: "About Us | Suyash Real Estate",
  description: "Learn more about Suyash Real Estate, a leading premium real estate agency specializing in rental row houses, bungalows, flats, and plots."
};

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* Main Info Section */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            {/* Left Column Text */}
            <div>
              <span className="section-subtitle" style={{ textAlign: "left" }}>Our Legacy</span>
              <h2 className="font-serif" style={{ fontSize: "36px", marginBottom: "20px", color: "var(--color-primary)" }}>
                Providing Premium Housing Solutions Since 2015
              </h2>
              <p style={{ color: "var(--color-text-dark)", fontSize: "16px", lineHeight: "1.8", marginBottom: "20px" }}>
                Suyash Real Estate was founded with a single mission: to revolutionize local real estate brokering. We saw that clients looking for high-end rental flats, bungalows, row houses, and lands were frustrated by misleading online portals and duplicate, unverified listings.
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "15px", lineHeight: "1.7", marginBottom: "30px" }}>
                We decided to do things differently. We built a direct, broker-led model where every property on our portal is physically visited, verified, photographed, and legal-checked. By cutting out secondary sub-agents and automated loops, we provide transparent, honest advice that helps families and corporate bodies secure their dream properties.
              </p>
              <div style={{ display: "flex", gap: "24px" }}>
                <div>
                  <h3 style={{ fontSize: "32px", color: "var(--color-accent)", marginBottom: "4px" }}>1,200+</h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Happy Families</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "32px", color: "var(--color-accent)", marginBottom: "4px" }}>450+</h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Land & Plot Deals</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "32px", color: "var(--color-accent)", marginBottom: "4px" }}>10+ Yrs</h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: "600" }}>Broker Expertise</p>
                </div>
              </div>
            </div>

            {/* Right Column (Visual Grid representation) */}
            <div style={{
              backgroundColor: "var(--color-accent-light)",
              borderRadius: "var(--radius-lg)",
              padding: "48px",
              border: "1px solid var(--color-accent)",
              boxShadow: "var(--shadow-gold)"
            }}>
              <h3 className="font-serif" style={{ fontSize: "24px", color: "var(--color-primary)", marginBottom: "16px" }}>Our Core Values</h3>
              
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "24px" }}>
                <li>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-primary)", marginBottom: "6px" }}>
                    ⭐ Absolute Transparency
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
                    We share all pricing details, society regulations, and deposits upfront. No surprise maintenance or processing fees.
                  </p>
                </li>
                <li>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-primary)", marginBottom: "6px" }}>
                    ⭐ Quality Over Quantity
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
                    We do not listing thousands of spam properties. We only list verified, well-maintained homes and commercial spaces ready for possession.
                  </p>
                </li>
                <li>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-primary)", marginBottom: "6px" }}>
                    ⭐ Complete Documentation Support
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
                    From police verification to standard registry and water connection transfers, our desk manages all legal and society compliance.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Chief Broker section */}
      <section className="section section-bg-light">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-header">
            <span className="section-subtitle">Leadership</span>
            <h2 className="section-title">Chief Executive Broker</h2>
            <p className="section-desc">
              Get support directly from the founder and key partner.
            </p>
          </div>

          <div style={{
            maxWidth: "650px",
            margin: "0 auto",
            backgroundColor: "#fff",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "40px",
            boxShadow: "var(--shadow-md)"
          }}>
            <div className="testimonial-avatar" style={{ width: "80px", height: "80px", fontSize: "28px", margin: "0 auto 24px auto" }}>
              PB
            </div>
            <h3 className="font-serif" style={{ fontSize: "24px", marginBottom: "4px" }}>Mr. Kunal Shah</h3>
            <p style={{ color: "var(--color-accent)", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px" }}>
              Principal Real Estate Advisor
            </p>
            <p style={{ color: "var(--color-text-muted)", fontSize: "15px", lineHeight: "1.7", marginBottom: "32px" }}>
              "Real estate is not just about square feet and brick-and-mortar; it is about finding a secure shelter or investment space that forms the foundation of your family's future or business growth. I personally inspect all high-value bungalow rentals and land deals to ensure our clients get clean titles and fair rates."
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
              <Link href="tel:+919876543210" className="btn btn-primary">
                Call Chief Broker
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
