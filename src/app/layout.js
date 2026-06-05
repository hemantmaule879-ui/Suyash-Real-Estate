import { Outfit, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Suyash Real Estate | Premium Real Estate Listings",
    template: "%s | Suyash Real Estate"
  },
  description: "Explore verified rental flats, row houses, bungalows, and lands/plots for sale with Suyash Real Estate. High-end real estate service with direct broker support and fast documentation.",
  keywords: ["real estate broker", "rental flats", "bungalows for rent", "row houses for rent", "plots for sale", "suyash real estate"],
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Suspense fallback={<div style={{ height: "80px", backgroundColor: "#0B1E3F" }}></div>}>
          <Header />
        </Suspense>
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
