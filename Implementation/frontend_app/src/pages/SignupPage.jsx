import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useProgress();

  const [form, setForm] = useState({
    name: "",
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

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      navigate("/profile-setup");
    } catch (err) {
      setError(err.message || "Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="auth-card">
          <h1 className="page-title">Create Your Account</h1>
          <p className="muted-text">
            Sign up to start learning cybersecurity concepts through modules,
            scenarios, and quizzes.
          </p>

          <div className="subtle-line" />

          <form onSubmit={handleSubmit} className="form-grid">
            <div>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="subtle-line" />

          <p className="muted-text">
            Already have an account?{" "}
            <Link to="/login" className="nav-link active">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}