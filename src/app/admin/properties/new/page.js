"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addPropertyAction } from "@/app/actions";

export default function NewPropertyPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);

    // Validate images
    const images = formData.getAll("propertyImages");
    if (images.length === 1 && images[0].size === 0) {
      // No images selected
    }

    startTransition(async () => {
      try {
        await addPropertyAction(formData);
        router.push("/admin/dashboard");
        router.refresh();
      } catch (err) {
        setError(err.message || "Failed to add property listing. Please verify inputs.");
      }
    });
  };

  return (
    <div className="container" style={{ padding: "40px 24px", maxWidth: "800px" }}>
      <div style={{ marginBottom: "30px" }}>
        <Link href="/admin/dashboard" style={{ color: "var(--color-accent)", fontWeight: "600", fontSize: "14px" }}>
          ← Back to Dashboard
        </Link>
        <h1 className="font-serif" style={{ fontSize: "32px", marginTop: "12px" }}>
          Add New Property Listing
        </h1>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: "24px" }}>
          {error}
        </div>
      )}

      <div className="admin-card">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            
            {/* Title */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="title" className="form-label">Property Title *</label>
              <input type="text" id="title" name="title" required className="form-control" placeholder="e.g. Spacious 3 BHK Flat in Skyline Society" />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category *</label>
              <select id="category" name="category" required className="form-control">
                <option value="Rental Flats">Rental Flats</option>
                <option value="Rental Row Houses">Rental Row Houses</option>
                <option value="Rental Bungalows">Rental Bungalows</option>
                <option value="Lands for Sale">Lands for Sale</option>
                <option value="Commercial Properties">Commercial Properties</option>
              </select>
            </div>

            {/* Deal Type */}
            <div className="form-group">
              <label htmlFor="type" className="form-label">Deal Type *</label>
              <select id="type" name="type" required className="form-control">
                <option value="Rent">For Rent</option>
                <option value="Sale">For Sale</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-group">
              <label htmlFor="price" className="form-label">Price (INR) *</label>
              <input type="number" id="price" name="price" required className="form-control" placeholder="e.g. 45000 or 15000000" />
            </div>

            {/* Area */}
            <div className="form-group">
              <label htmlFor="area" className="form-label">Area (sq.ft) *</label>
              <input type="number" id="area" name="area" required className="form-control" placeholder="e.g. 1200" />
            </div>

            {/* Bedrooms */}
            <div className="form-group">
              <label htmlFor="bedrooms" className="form-label">Bedrooms (BHK Count)</label>
              <input type="number" id="bedrooms" name="bedrooms" defaultValue="0" min="0" className="form-control" placeholder="e.g. 3 (Set 0 for commercial/land)" />
            </div>

            {/* Bathrooms */}
            <div className="form-group">
              <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
              <input type="number" id="bathrooms" name="bathrooms" defaultValue="0" min="0" className="form-control" placeholder="e.g. 2" />
            </div>

            {/* Parking */}
            <div className="form-group">
              <label htmlFor="parking" className="form-label">Parking Detail</label>
              <input type="text" id="parking" name="parking" className="form-control" placeholder="e.g. 1 Reserved, 2 Covered" />
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status" className="form-label">Availability Status</label>
              <select id="status" name="status" className="form-control">
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            {/* Locality */}
            <div className="form-group">
              <label htmlFor="locality" className="form-label">Locality *</label>
              <input type="text" id="locality" name="locality" required className="form-control" placeholder="e.g. Bandra West" />
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city" className="form-label">City *</label>
              <input type="text" id="city" name="city" required className="form-control" placeholder="e.g. Mumbai" />
            </div>

            {/* Address */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="address" className="form-label">Full Address *</label>
              <input type="text" id="address" name="address" required className="form-control" placeholder="Flat number, building name, society road" />
            </div>

            {/* Amenities */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="amenities" className="form-label">Amenities (Comma separated)</label>
              <input type="text" id="amenities" name="amenities" className="form-control" placeholder="e.g. Swimming Pool, Gymnasium, Power Backup, 24/7 Security" />
            </div>

            {/* Google Maps Location */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="googleMapLocation" className="form-label">Google Maps Embed URL</label>
              <input type="text" id="googleMapLocation" name="googleMapLocation" className="form-control" placeholder="e.g. https://www.google.com/maps/embed?pb=..." />
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px", display: "block" }}>
                Copy the iframe src URL from Google Maps share options.
              </span>
            </div>

            {/* Description */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="description" className="form-label">Description *</label>
              <textarea id="description" name="description" required className="form-control" placeholder="Enter detailed description of the property, structural features, lease terms..."></textarea>
            </div>

            {/* Images */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="propertyImages" className="form-label">Property Photos (Select Multiple) *</label>
              <input type="file" id="propertyImages" name="propertyImages" multiple accept="image/*" required className="form-control" />
            </div>

            {/* Featured */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-checkbox">
                <input type="checkbox" id="featured" name="featured" />
                <span>Mark as Featured Property (Promote on Homepage)</span>
              </label>
            </div>

          </div>

          <div style={{ marginTop: "32px", display: "flex", gap: "16px", justifyContent: "flex-end" }}>
            <Link href="/admin/dashboard" className="btn btn-outline">
              Cancel
            </Link>
            <button type="submit" disabled={isPending} className="btn btn-primary" style={{ opacity: isPending ? 0.7 : 1 }}>
              {isPending ? "Saving Listing..." : "Save Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
