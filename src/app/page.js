import Link from "next/link";
import { propertiesDb } from "@/lib/db";

export const metadata = {
  title: "Suyash Real Estate | Premium Real Estate Listings",
  description: "Find flats, row houses, bungalows, and land plots for rent or sale. Verified listings, local market expertise, direct broker support, and fast documentation."
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

export default function Home() {
  const properties = propertiesDb.getAll();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  // Dynamic counts for each category
  const categories = [
    {
      title: "Rental Flats",
      count: properties.filter(p => p.category === "Rental Flats").length,
      image: "/uploads/flat1_1.jpg",
      href: "/properties?category=Rental+Flats"
    },
    {
      title: "Rental Row Houses",
      count: properties.filter(p => p.category === "Rental Row Houses").length,
      image: "/uploads/rowhouse1_1.jpg",
      href: "/properties?category=Rental+Row+Houses"
    },
    {
      title: "Rental Bungalows",
      count: properties.filter(p => p.category === "Rental Bungalows").length,
      image: "/uploads/bungalow1_1.jpg",
      href: "/properties?category=Rental+Bungalows"
    },
    {
      title: "Lands for Sale",
      count: properties.filter(p => p.category === "Lands for Sale").length,
      image: "/uploads/plot1_1.jpg",
      href: "/properties?category=Lands+for+Sale"
    },
    {
      title: "Residential Properties",
      count: properties.filter(p => p.category !== "Commercial Properties" && p.category !== "Lands for Sale").length,
      image: "/uploads/flat1_2.jpg",
      href: "/properties?type=Rent"
    },
    {
      title: "Commercial Properties",
      count: properties.filter(p => p.category === "Commercial Properties").length,
      image: "/uploads/office1_1.jpg",
      href: "/properties?category=Commercial+Properties"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-overlay"></div>
        <div className="container hero-container">
          <div>
            <span className="hero-subtitle">Trusted Local Property Experts</span>
            <h1 className="hero-title">Find Your <span>Premium</span> Property Seamlessly</h1>
            <p className="hero-desc">
              Discover verified rental apartments, premium row houses, luxury bungalows, and investment plots with zero hassle. We handle the documentation so you can focus on moving in.
            </p>
            <div className="hero-ctas">
              <Link href="/properties" className="btn btn-accent btn-lg">
                Find Property
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg" style={{ color: "#fff", borderColor: "#fff" }}>
                Contact Broker
              </Link>
            </div>
          </div>

          {/* Quick Search Card */}
          <div className="hero-search-wrapper">
            <h3 className="search-title">
              Search Property
            </h3>
            <form action="/properties" method="GET" className="search-form">
              <div className="search-grid">
                <div className="search-input-group">
                  <label htmlFor="location">City or Locality</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="search-input"
                    placeholder="e.g. Bandra, Pune, Koregaon Park"
                  />
                </div>

                <div className="search-input-group">
                  <label htmlFor="category">Property Category</label>
                  <select id="category" name="category" className="search-select">
                    <option value="">All Categories</option>
                    <option value="Rental Flats">Rental Flats</option>
                    <option value="Rental Row Houses">Rental Row Houses</option>
                    <option value="Rental Bungalows">Rental Bungalows</option>
                    <option value="Lands for Sale">Lands for Sale</option>
                    <option value="Commercial Properties">Commercial Properties</option>
                  </select>
                </div>

                <div className="search-input-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select id="budget" name="budget" className="search-select">
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

                <div className="search-input-group">
                  <label htmlFor="bedrooms">Bedrooms</label>
                  <select id="bedrooms" name="bedrooms" className="search-select">
                    <option value="">Any BHK</option>
                    <option value="1RK">1 RK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }}>
                  Search Listings
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Categories</span>
            <h2 className="section-title">Explore Property Categories</h2>
            <p className="section-desc">
              Browse through our premium selection of curated real estate listings, tailored to fit your lifestyle and investment goals.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <Link href={cat.href} key={idx} className="category-card">
                <img src={cat.image} alt={cat.title} className="category-bg-img" />
                <div className="category-content">
                  <h3 className="category-title">{cat.title}</h3>
                  <span className="category-count">{cat.count} Listings</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Premium Listings</span>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-desc">
              Handpicked hand-verified listings. Explore our most exclusive flats, villas, and commercial hubs.
            </p>
          </div>

          <div className="properties-grid">
            {featuredProperties.map((prop) => (
              <div key={prop.id} className="property-card">
                <div className="property-img-wrapper">
                  <div className="property-badges">
                    <span className={`badge ${prop.type === "Rent" ? "badge-rent" : "badge-sale"}`}>
                      For {prop.type}
                    </span>
                    {prop.featured && <span className="badge badge-featured">Featured</span>}
                  </div>
                  <img
                    src={prop.images?.[0] || "/placeholder.jpg"}
                    alt={prop.title}
                    className="property-img"
                  />
                  <div className="property-price-badge">
                    {formatPrice(prop.price, prop.type)}
                  </div>
                </div>

                <div className="property-content">
                  <span className="property-tag">{prop.category}</span>
                  <h3 className="property-card-title">
                    <Link href={`/properties/${prop.id}`}>{prop.title}</Link>
                  </h3>
                  <div className="property-location">
                    <span>📍 {prop.locality}, {prop.city}</span>
                  </div>

                  <div className="property-details-strip">
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
                  
                  <div style={{ marginTop: "20px" }}>
                    <Link href={`/properties/${prop.id}`} className="btn btn-outline" style={{ width: "100%" }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: "48px" }}>
            <Link href="/properties" className="btn btn-primary btn-lg">
              View All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Promise</span>
            <h2 className="section-title">Why Choose Suyash Real Estate</h2>
            <p className="section-desc">
              We bridge the gap between properties and buyers, providing absolute security and support.
            </p>
          </div>

          <div className="usps-grid">
            <div className="usp-card">
              <div className="usp-icon-wrapper">✓</div>
              <h3 className="usp-title">Verified Properties</h3>
              <p className="usp-desc">
                Every single property listing on our portal is physically visited and verified by our brokers. No fake pictures or spam.
              </p>
            </div>
            
            <div className="usp-card">
              <div className="usp-icon-wrapper">👤</div>
              <h3 className="usp-title">Direct Broker Support</h3>
              <p className="usp-desc">
                Enjoy transparent communication directly with an experienced local broker. No hidden agents or automated chat systems.
              </p>
            </div>

            <div className="usp-card">
              <div className="usp-icon-wrapper">📄</div>
              <h3 className="usp-title">Fast Documentation</h3>
              <p className="usp-desc">
                We assist you completely with Rent Agreements, Police Verification, Registry procedures, and society paperwork.
              </p>
            </div>

            <div className="usp-card">
              <div className="usp-icon-wrapper">⭐</div>
              <h3 className="usp-title">Trusted Property Deals</h3>
              <p className="usp-desc">
                We possess a high closing rate with 100% legal compliance, helping you lock the best properties at honest market rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Reviews</span>
            <h2 className="section-title">Client Success Stories</h2>
            <p className="section-desc">
              Hear from families, investors, and business owners who found their properties through us.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote-icon">“</div>
              <p className="testimonial-text">
                Finding a flat in Bandra can be incredibly hectic. Suyash Real Estate found us a beautiful 3 BHK apartment in Skyline Towers and managed the entire society approval and agreement in just 3 days!
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>
                <div>
                  <div className="testimonial-author-name">Amit Malhotra</div>
                  <div className="testimonial-author-title">IT Executive, Bandra</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote-icon">“</div>
              <p className="testimonial-text">
                I was looking for a clear title land parcel in Mulshi for development. The broker was extremely transparent, showing me all chain deeds and arranging meetings with the land owner. Highly trusted!
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">S</div>
                <div>
                  <div className="testimonial-author-name">Sanjay Kulkarni</div>
                  <div className="testimonial-author-title">Real Estate Investor, Pune</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote-icon">“</div>
              <p className="testimonial-text">
                Renting a commercial warehouse through their team was seamless. They negotiated a great deposit and lease terms for our logistics startup. Direct broker support makes a massive difference!
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">N</div>
                <div>
                  <div className="testimonial-author-name">Neha Singhal</div>
                  <div className="testimonial-author-title">Founder, LogiCorp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Reach Us</span>
            <h2 className="section-title">Get In Touch With Us</h2>
            <p className="section-desc">
              Have questions about a property or want to list your property? Talk to our chief property broker today.
            </p>
          </div>

          <div className="contact-section-grid">
            <div>
              <h3 className="font-serif" style={{ fontSize: "28px", marginBottom: "16px" }}>Connect Directly</h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "32px" }}>
                Reach out via call, email, or drop by our office. Our team is available 7 days a week from 9:00 AM to 8:00 PM.
              </p>
              
              <ul className="contact-info-list">
                <li className="contact-info-item">
                  <div className="contact-info-icon">📞</div>
                  <div className="contact-info-text">
                    <h4>Direct Call</h4>
                    <Link href="tel:+919876543210">+91 98765 43210</Link>
                  </div>
                </li>
                
                <li className="contact-info-item">
                  <div className="contact-info-icon">💬</div>
                  <div className="contact-info-text">
                    <h4>WhatsApp Live Support</h4>
                    <Link href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                      Click to Chat on WhatsApp
                    </Link>
                  </div>
                </li>

                <li className="contact-info-item">
                  <div className="contact-info-icon">✉</div>
                  <div className="contact-info-text">
                    <h4>Email Address</h4>
                    <Link href="mailto:info@suyashrealestate.com">info@suyashrealestate.com</Link>
                  </div>
                </li>

                <li className="contact-info-item">
                  <div className="contact-info-icon">📍</div>
                  <div className="contact-info-text">
                    <h4>Head Office</h4>
                    <p>102, Gold Crest Plaza, Main High Street, Sector 4, Bandra West, Mumbai - 400050</p>
                  </div>
                </li>
              </ul>
              
              <div style={{ display: "flex", gap: "16px" }}>
                <Link href="tel:+919876543210" className="btn btn-primary">
                  Call Now
                </Link>
                <Link href="https://wa.me/919876543210?text=Hello,%20I%20am%20interested%20in%20buying/renting%20a%20property.%20Please%20share%20details." className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                  Enquire on WhatsApp
                </Link>
              </div>
            </div>

            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8027734162464!2d72.82524427507421!3d19.028400082168925!2m3!1f0!2f0!3f0!3m2!1i1024!2i769!2f49.3!3m3!1m2!1s0x3be7cec13233e721%3A0x86617a20c3b0f5b9!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717618000000!5m2!1sen!2sin"
                className="map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
