import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';

export default function SignupPage() {
  const { signup } = useProgress();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Please complete all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      navigate('/profile-setup');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Create Account</h1>
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
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Already have an account? <Link to="/login" style={{ color: "#6c63ff" }}>Log in</Link>
      </p>
    </div>
  );
}