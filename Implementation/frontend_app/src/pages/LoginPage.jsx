import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanedForm = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    if (!cleanedForm.email || !cleanedForm.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      await loginUser(cleanedForm);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="auth-card">
          <h1 className="page-title">Log In</h1>
          <p className="muted-text">Continue your CyberAware learning journey.</p>

          <div className="subtle-line" />

          <form onSubmit={handleSubmit} className="form-grid">
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <div className="subtle-line" />

          <p className="muted-text">
            Do not have an account?{" "}
            <Link to="/signup" className="nav-link active">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}