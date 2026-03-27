import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';

export default function LoginPage() {
  const { login } = useProgress();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Welcome Back</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
            required
          />
        </div>
        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "12px", background: "#6c63ff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Don't have an account? <Link to="/signup" style={{ color: "#6c63ff" }}>Sign up</Link>
      </p>
    </div>
  );
}