import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">About CyberAware</h1>
              <p className="muted-text">
                A simple cybersecurity learning platform designed to help users
                build safer online habits through short lessons, quizzes, module
                progression, and achievement tracking.
              </p>
            </div>

            <Link className="ghost-btn" to="/">
              Back Home
            </Link>
          </div>

          <div className="subtle-line" />

          <div style={{ display: "grid", gap: "16px" }}>
            <div className="quiz-card">
              <h3>Purpose</h3>
              <p className="muted-text">
                CyberAware helps learners improve practical cybersecurity
                awareness in a simple, approachable, and structured way.
              </p>
            </div>

            <div className="quiz-card">
              <h3>Topics Covered</h3>
              <p className="muted-text">
                The app covers phishing awareness, password hygiene,
                multi-factor authentication, social engineering, safe browsing,
                and incident reporting.
              </p>
            </div>

            <div className="quiz-card">
              <h3>Learning Model</h3>
              <p className="muted-text">
                Users complete modules in sequence, earn points, unlock badges,
                and track their progress through the dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}