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
      setError("Please fill in both email and password.");
      return;
    }

    login({ email: form.email });
    navigate("/dashboard");
  };

  return (
    <div className="page-shell">
      <div className="card auth-card">
        <h1>Log In</h1>
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
          {error ? <p className="error-text">{error}</p> : null}
          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>
        <p>
          No account yet? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}