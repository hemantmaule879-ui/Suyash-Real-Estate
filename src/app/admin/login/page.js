"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAdminAction } from "@/app/actions";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);
    startTransition(async () => {
      try {
        const res = await loginAdminAction(null, formData);
        if (res.success) {
          router.push("/admin/dashboard");
          router.refresh();
        } else {
          setError(res.error);
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--color-bg-light)",
      padding: "40px 24px"
    }}>
      <div style={{
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "#fff",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "40px 30px",
        boxShadow: "var(--shadow-lg)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2 className="font-serif" style={{ fontSize: "28px", color: "var(--color-primary)" }}>
            Broker Admin
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "14px", marginTop: "4px" }}>
            Log in to manage listings and customer leads
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ padding: "12px 16px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Admin Password (Optional)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Bypassed - Leave empty or type anything"
              style={{ letterSpacing: "2px" }}
            />
          </div>

          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "24px" }}>
            🔒 <strong>Development Mode</strong>: Password check is bypassed. Click <em>Access Dashboard</em> to log in.
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
            style={{ width: "100%", opacity: isPending ? 0.7 : 1 }}
          >
            {isPending ? "Logging in..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
