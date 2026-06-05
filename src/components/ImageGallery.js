"use client";

import { useState } from "react";

export default function ImageGallery({ images = [], title = "" }) {
  const [activeImage, setActiveImage] = useState(images[0] || "/placeholder.jpg");

  if (!images || images.length === 0) {
    return (
      <div style={{
        height: "400px",
        backgroundColor: "var(--color-primary-dark)",
        color: "rgba(255,255,255,0.4)",
        borderRadius: "var(--radius-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px"
      }}>
        No Images Available
      </div>
    );
  }

  return (
    <div>
      {/* Active Big Image */}
      <div style={{
        height: "450px",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        backgroundColor: "var(--color-primary-dark)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-md)",
        position: "relative"
      }}>
        <img
          src={activeImage}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 0.3s ease"
          }}
        />
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
          overflowX: "auto",
          paddingBottom: "8px"
        }}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              style={{
                width: "90px",
                height: "65px",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: activeImage === img ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                cursor: "pointer",
                padding: 0,
                backgroundColor: "transparent",
                transition: "var(--transition-fast)",
                opacity: activeImage === img ? 1 : 0.7
              }}
              onMouseEnter={(e) => {
                if (activeImage !== img) e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                if (activeImage !== img) e.currentTarget.style.opacity = "0.7";
              }}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
