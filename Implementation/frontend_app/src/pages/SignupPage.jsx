import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function SignupPage() {
  const { login } = useProgress();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
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
      <div className="card auth-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
          {error ? <p className="error-text">{error}</p> : null}
          <button className="primary-btn" type="submit">
            Sign up
          </button>
        </form>
        <p>
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}