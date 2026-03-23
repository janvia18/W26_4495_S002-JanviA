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
                CyberAware is a cybersecurity awareness learning app built to help users understand
                practical digital safety in a simple, engaging, and professional way.
              </p>
            </div>
            <Link className="ghost-btn" to="/">
              Back Home
            </Link>
          </div>
          <div className="subtle-line" />
          <div className="lesson-points-grid">
            <div className="lesson-point-card">
              Learn core topics like phishing, password security, MFA, social engineering,
              safe browsing, and incident reporting.
            </div>
            <div className="lesson-point-card">
              Practice with realistic decision scenarios and short quizzes after every lesson.
            </div>
            <div className="lesson-point-card">
              Earn points, unlock badges, and track your progress through a clean learner dashboard.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}