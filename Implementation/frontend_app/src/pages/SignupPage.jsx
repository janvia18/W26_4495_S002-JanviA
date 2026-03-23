import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";
export default function SignupPage() {
  const { login } = useProgress();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password || !form.confirmPassword) {
      setError("Please complete all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    login({ email: form.email });
    navigate("/profile-setup");
  };
  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="auth-card">
          <h1 className="page-title">Create Account</h1>
          <form onSubmit={handleSubmit} className="form-grid">
            <div>
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                placeholder="Create your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                placeholder="Confirm your password"
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              />
            </div>
            {error ? <p className="error-text">{error}</p> : null}
            <button className="primary-btn" type="submit">
              Sign Up
            </button>
          </form>
          <p className="muted-text" style={{ marginTop: 16 }}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
