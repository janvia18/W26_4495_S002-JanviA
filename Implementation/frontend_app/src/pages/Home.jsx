import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page-container">
      <h1>CyberAware Dashboard 🛡️</h1>

      <p>
        CyberAware is a gamified cybersecurity training platform designed to
        help people recognize online threats and build safer digital habits.
      </p>

      <div className="card">
        <h2>What You Will Learn</h2>
        <ul>
          <li>How to detect phishing emails and scam messages</li>
          <li>How to create strong and secure passwords</li>
          <li>Why Multi-Factor Authentication protects your accounts</li>
          <li>How social engineering attacks manipulate people</li>
          <li>What to do during a cybersecurity incident</li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/login">
          <button className="primary-btn">Login</button>
        </Link>

        <Link to="/signup" style={{ marginLeft: "1rem" }}>
          <button className="secondary-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;