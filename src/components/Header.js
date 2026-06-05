"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Active check helper
  const isActive = (href, categoryVal, typeVal) => {
    if (pathname !== href) return false;
    
    if (categoryVal) {
      return searchParams.get("category") === categoryVal;
    }
    if (typeVal) {
      return searchParams.get("type") === typeVal;
    }
    
    // Default Home/About/Contact
    return !searchParams.get("category") && !searchParams.get("type");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Rental Flats", href: "/properties", category: "Rental Flats" },
    { label: "Rental Row Houses", href: "/properties", category: "Rental Row Houses" },
    { label: "Rental Bungalows", href: "/properties", category: "Rental Bungalows" },
    { label: "Lands for Sale", href: "/properties", category: "Lands for Sale" },
    { label: "Properties for Sale", href: "/properties", type: "Sale" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header-wrapper">
      <div className="container header-container">
        <Link href="/" className="logo">
          <div className="logo-text">
            Suyash <span>Real</span> Estate
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          {navLinks.map((link, idx) => {
            let hrefWithParams = link.href;
            if (link.category) {
              hrefWithParams += `?category=${encodeURIComponent(link.category)}`;
            } else if (link.type) {
              hrefWithParams += `?type=${encodeURIComponent(link.type)}`;
            }

            const active = isActive(link.href, link.category, link.type);

            return (
              <Link
                key={idx}
                href={hrefWithParams}
                className={`nav-link ${active ? "active" : ""}`}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* Admin link for easy broker access */}
          <Link
            href="/admin/dashboard"
            className="btn btn-accent btn-sm"
            style={{ marginLeft: "8px" }}
            onClick={handleLinkClick}
          >
            Broker Panel
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button
          className="nav-btn"
          aria-label="Toggle Navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span style={{ transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 6px)" : "none" }}></span>
          <span style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
          <span style={{ transform: isMobileMenuOpen ? "rotate(-45deg) translate(5px, -6px)" : "none" }}></span>
        </button>
      </div>
    </header>
  );
}
