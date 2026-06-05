"use client";

import { useState } from "react";
import { submitLeadAction } from "@/app/actions";

export default function LeadForm({ propertyId = "", propertyTitle = "" }) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState({ success: null, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setStatus({ success: null, error: null });

    const formData = new FormData(e.target);
    try {
      const res = await submitLeadAction(null, formData);
      if (res.success) {
        setStatus({ success: res.message, error: null });
        e.target.reset(); // clear form inputs
      } else {
        setStatus({ success: null, error: res.error });
      }
    } catch (err) {
      setStatus({ success: null, error: "An unexpected error occurred. Please try again." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Hidden inputs to link this lead to the property */}
      <input type="hidden" name="propertyId" value={propertyId} />
      <input type="hidden" name="propertyTitle" value={propertyTitle} />

      {status.success && (
        <div className="alert alert-success">
          {status.success}
        </div>
      )}

      {status.error && (
        <div className="alert alert-danger">
          {status.error}
        </div>
      )}

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="form-label">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="form-control"
          placeholder="e.g. Rahul Sharma"
        />
      </div>

      {/* Mobile Input */}
      <div>
        <label htmlFor="mobile" className="form-label">Mobile Number *</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          pattern="[0-9]{10}"
          title="Please enter a valid 10-digit mobile number."
          className="form-control"
          placeholder="e.g. 9876543210"
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          placeholder="e.g. rahul@example.com"
        />
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          id="message"
          name="message"
          className="form-control"
          placeholder="I am interested in this listing. Please call me back."
          defaultValue={propertyTitle ? `Hello, I am interested in the property: "${propertyTitle}". Please share more details.` : ""}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary"
        style={{ width: "100%", opacity: isPending ? 0.7 : 1 }}
      >
        {isPending ? "Submitting Enquire..." : "Send Enquiry / Message"}
      </button>
    </form>
  );
}
