import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="hero-box">
          <p className="eyebrow">Cybersecurity Training Portal</p>
          <h1 className="hero-title">CyberAware</h1>
          <p className="hero-text">
            A gamified cybersecurity learning app for community organizations.
            Learn practical safety, complete modules, and grow your awareness level
            step by step.
          </p>

          <div className="hero-actions">
            <Link className="primary-btn" to="/signup">Get Started</Link>
            <Link className="secondary-btn" to="/login">Log In</Link>
            <Link className="secondary-btn" to="/about">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
}