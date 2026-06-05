import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Contact Us | Suyash Real Estate",
  description: "Get in touch with Suyash Real Estate. Fill out the contact form, give us a call, or visit our Bandra office."
};

export default function ContactPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px", alignItems: "start" }}>
          
          {/* Left Column (Contact details) */}
          <div>
            <span className="section-subtitle" style={{ textAlign: "left" }}>Connect Now</span>
            <h2 className="font-serif" style={{ fontSize: "36px", marginBottom: "20px" }}>
              Get in Touch With Our Broker Desk
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "16px", marginBottom: "40px", lineHeight: "1.7" }}>
              Whether you are a tenant looking to lease a flat, an investor searching for premium plots, or a property owner wanting to list your bungalow for rent, we are here to support you at every stage.
            </p>

            <ul className="contact-info-list" style={{ margin: 0 }}>
              <li className="contact-info-item">
                <div className="contact-info-icon">📞</div>
                <div className="contact-info-text">
                  <h4 style={{ color: "var(--color-primary)" }}>Direct Hotline</h4>
                  <p style={{ fontSize: "15px", marginTop: "4px" }}>
                    <Link href="tel:+919876543210" style={{ color: "var(--color-text-dark)", fontWeight: "600" }}>+91 98765 43210</Link>
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "2px" }}>Available 9:00 AM - 8:00 PM (Daily)</p>
                </div>
              </li>

              <li className="contact-info-item">
                <div className="contact-info-icon">💬</div>
                <div className="contact-info-text">
                  <h4 style={{ color: "var(--color-primary)" }}>WhatsApp Support</h4>
                  <p style={{ fontSize: "15px", marginTop: "4px" }}>
                    <Link href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-dark)", fontWeight: "600" }}>
                      Click to Chat on WhatsApp
                    </Link>
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "2px" }}>Instant replies for property listings</p>
                </div>
              </li>

              <li className="contact-info-item">
                <div className="contact-info-icon">✉</div>
                <div className="contact-info-text">
                  <h4 style={{ color: "var(--color-primary)" }}>Official Email</h4>
                  <p style={{ fontSize: "15px", marginTop: "4px" }}>
                    <Link href="mailto:info@suyashrealestate.com" style={{ color: "var(--color-text-dark)", fontWeight: "600" }}>info@suyashrealestate.com</Link>
                  </p>
                </div>
              </li>

              <li className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div className="contact-info-text">
                  <h4 style={{ color: "var(--color-primary)" }}>Broker Office</h4>
                  <p style={{ fontSize: "15px", marginTop: "4px", color: "var(--color-text-dark)", lineHeight: "1.5" }}>
                    102, Gold Crest Plaza, Main High Street, Sector 4, Bandra West, Mumbai - 400050
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column (Contact Form & Map) */}
          <div style={{
            backgroundColor: "#fff",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "40px",
            boxShadow: "var(--shadow-md)"
          }}>
            <h3 className="font-serif" style={{ fontSize: "24px", color: "var(--color-primary)", marginBottom: "24px" }}>
              Send a Secure Message
            </h3>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Full width Map Embed */}
      <section style={{ height: "450px", borderTop: "1px solid var(--color-border)" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8027734162464!2d72.82524427507421!3d19.028400082168925!2m3!1f0!2f0!3f0!3m2!1i1024!2i769!2f49.3!3m3!1m2!1s0x3be7cec13233e721%3A0x86617a20c3b0f5b9!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717618000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
