"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updatePropertyAction } from "@/app/actions";

export default function EditPropertyClient({ property }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [images, setImages] = useState(property.images || []);
  const [deleteImages, setDeleteImages] = useState([]);

  const handleMarkForDeletion = (img) => {
    setDeleteImages(prev => [...prev, img]);
    setImages(prev => prev.filter(i => i !== img));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);
    // Append images to delete
    deleteImages.forEach(img => {
      formData.append("deleteImages", img);
    });

    startTransition(async () => {
      try {
        await updatePropertyAction(property.id, formData);
        router.push("/admin/dashboard");
        router.refresh();
      } catch (err) {
        setError(err.message || "Failed to update property listing. Please verify inputs.");
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
          Edit Property Listing: "{property.title}"
        </h1>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: "24px" }}>
          {error}
        </div>
      )}

      <div className="admin-card">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-grid">
            
            {/* Title */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="title" className="form-label">Property Title *</label>
              <input type="text" id="title" name="title" defaultValue={property.title} required className="form-control" />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category *</label>
              <select id="category" name="category" defaultValue={property.category} required className="form-control">
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
              <select id="type" name="type" defaultValue={property.type} required className="form-control">
                <option value="Rent">For Rent</option>
                <option value="Sale">For Sale</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-group">
              <label htmlFor="price" className="form-label">Price (INR) *</label>
              <input type="number" id="price" name="price" defaultValue={property.price} required className="form-control" />
            </div>

            {/* Area */}
            <div className="form-group">
              <label htmlFor="area" className="form-label">Area (sq.ft) *</label>
              <input type="number" id="area" name="area" defaultValue={property.area} required className="form-control" />
            </div>

            {/* Bedrooms */}
            <div className="form-group">
              <label htmlFor="bedrooms" className="form-label">Bedrooms (BHK Count)</label>
              <input type="number" id="bedrooms" name="bedrooms" defaultValue={property.bedrooms} min="0" className="form-control" />
            </div>

            {/* Bathrooms */}
            <div className="form-group">
              <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
              <input type="number" id="bathrooms" name="bathrooms" defaultValue={property.bathrooms} min="0" className="form-control" />
            </div>

            {/* Parking */}
            <div className="form-group">
              <label htmlFor="parking" className="form-label">Parking Detail</label>
              <input type="text" id="parking" name="parking" defaultValue={property.parking} className="form-control" />
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status" className="form-label">Availability Status</label>
              <select id="status" name="status" defaultValue={property.status} className="form-control">
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            {/* Locality */}
            <div className="form-group">
              <label htmlFor="locality" className="form-label">Locality *</label>
              <input type="text" id="locality" name="locality" defaultValue={property.locality} required className="form-control" />
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city" className="form-label">City *</label>
              <input type="text" id="city" name="city" defaultValue={property.city} required className="form-control" />
            </div>

            {/* Address */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="address" className="form-label">Full Address *</label>
              <input type="text" id="address" name="address" defaultValue={property.address} required className="form-control" />
            </div>

            {/* Amenities */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="amenities" className="form-label">Amenities (Comma separated)</label>
              <input type="text" id="amenities" name="amenities" defaultValue={property.amenities?.join(", ")} className="form-control" />
            </div>

            {/* Google Maps Location */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="googleMapLocation" className="form-label">Google Maps Embed URL</label>
              <input type="text" id="googleMapLocation" name="googleMapLocation" defaultValue={property.googleMapLocation} className="form-control" />
            </div>

            {/* Description */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="description" className="form-label">Description *</label>
              <textarea id="description" name="description" defaultValue={property.description} required className="form-control"></textarea>
            </div>

            {/* Current Photos */}
            {images.length > 0 && (
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label className="form-label">Current Photos (Click to Remove)</label>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {images.map((img, idx) => (
                    <div key={idx} style={{ position: "relative", width: "100px", height: "75px", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                      <img src={img} alt="listing" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button
                        type="button"
                        onClick={() => handleMarkForDeletion(img)}
                        style={{
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                          backgroundColor: "var(--color-danger)",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                        title="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label htmlFor="propertyImages" className="form-label">Add More Photos (Select Multiple)</label>
              <input type="file" id="propertyImages" name="propertyImages" multiple accept="image/*" className="form-control" />
            </div>

            {/* Featured */}
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-checkbox">
                <input type="checkbox" id="featured" name="featured" defaultChecked={property.featured} />
                <span>Mark as Featured Property (Promote on Homepage)</span>
              </label>
            </div>

          </div>

          <div style={{ marginTop: "32px", display: "flex", gap: "16px", justifyContent: "flex-end" }}>
            <Link href="/admin/dashboard" className="btn btn-outline">
              Cancel
            </Link>
            <button type="submit" disabled={isPending} className="btn btn-primary" style={{ opacity: isPending ? 0.7 : 1 }}>
              {isPending ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
