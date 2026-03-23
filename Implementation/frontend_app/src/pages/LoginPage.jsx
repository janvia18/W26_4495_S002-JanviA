import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";
export default function LoginPage() {
  const { login } = useProgress();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    login({ email: form.email });
    navigate("/dashboard");
  };
  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="auth-card">
          <h1 className="page-title">Log In</h1>
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
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            {error ? <p className="error-text">{error}</p> : null}
            <button className="primary-btn" type="submit">
              Log In
            </button>
          </form>
          <p className="muted-text" style={{ marginTop: 16 }}>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}