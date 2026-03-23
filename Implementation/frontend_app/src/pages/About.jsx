import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="page-shell">
      <div className="card">
        <h1>About CyberAware</h1>
        <p>
          CyberAware helps learners build safer online habits through short modules, quizzes,
          points, and badge milestones.
        </p>
        <p>
          The app covers phishing, password hygiene, MFA, social engineering, and incident reporting.
        </p>
        <Link className="primary-btn" to="/">
          Back home
        </Link>
      </div>
    </div>
  );
}