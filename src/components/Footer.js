import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company info */}
          <div className="footer-about-col">
            <div className="logo" style={{ marginBottom: "20px" }}>
              <div className="logo-text">
                Suyash <span>Real</span> Estate
              </div>
            </div>
            <p className="footer-about" style={{ marginBottom: "20px" }}>
              Suyash Real Estate is your premium partner for rental properties, row houses, bungalows, plots, and sales. With over a decade of local market expertise, we guarantee verified listings, transparent deals, and fast documentation.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <Link href="tel:+919876543210" className="btn btn-accent btn-sm">
                Call Broker
              </Link>
              <Link href="https://wa.me/919876543210" className="btn btn-whatsapp btn-sm" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="footer-title">Property Types</h3>
            <ul className="footer-links">
              <li>
                <Link href="/properties?category=Rental+Flats">Rental Flats</Link>
              </li>
              <li>
                <Link href="/properties?category=Rental+Row+Houses">Rental Row Houses</Link>
              </li>
              <li>
                <Link href="/properties?category=Rental+Bungalows">Rental Bungalows</Link>
              </li>
              <li>
                <Link href="/properties?category=Lands+for+Sale">Lands for Sale</Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/properties">All Listings</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/admin/login">Broker Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="footer-title">Contact Office</h3>
            <ul className="footer-contact" style={{ listStyle: "none" }}>
              <li>
                <span style={{ fontWeight: "600", color: "#fff" }}>Phone:</span>
                <Link href="tel:+919876543210" style={{ color: "rgba(255, 255, 255, 0.7)" }}>+91 98765 43210</Link>
              </li>
              <li>
                <span style={{ fontWeight: "600", color: "#fff" }}>Email:</span>
                <Link href="mailto:info@suyashrealestate.com" style={{ color: "rgba(255, 255, 255, 0.7)" }}>info@suyashrealestate.com</Link>
              </li>
              <li>
                <span style={{ fontWeight: "600", color: "#fff" }}>Address:</span>
                <span>
                  102, Gold Crest Plaza, Main High Street, Sector 4, Bandra West, Mumbai - 400050
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {currentYear} Suyash Real Estate. All Rights Reserved.
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/sitemap.xml" style={{ hover: "color: var(--color-accent)" }}>Sitemap</Link>
            <span>Managed by Authorized Local Broker</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
