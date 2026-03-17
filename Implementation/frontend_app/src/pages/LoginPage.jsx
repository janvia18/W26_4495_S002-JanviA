import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please enter both email and password.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("cyberaware_user"));

    if (
      savedUser &&
      savedUser.email === formData.email &&
      savedUser.password === formData.password
    ) {
      localStorage.setItem("cyberaware_logged_in", "true");
      setMessage("Login successful.");
      navigate("/dashboard");
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Login</h1>
        <p>Welcome back to CyberAware.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}

        <p style={{ marginTop: "1rem" }}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;