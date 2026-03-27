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
              ← Back Home
            </Link>
          </div>
          
          <div className="subtle-line">
            <h2>Why CyberAware?</h2>
            <div className="lesson-points-grid">
              <div className="lesson-point-card">
                <strong>🎯 Learn Core Topics</strong>
                <p>Master essential cybersecurity concepts like phishing, password security, MFA, social engineering, safe browsing, and incident reporting.</p>
              </div>
              <div className="lesson-point-card">
                <strong>🎭 Practice with Scenarios</strong>
                <p>Test your knowledge with realistic decision scenarios and receive detailed feedback on your choices.</p>
              </div>
              <div className="lesson-point-card">
                <strong>📝 Test Your Knowledge</strong>
                <p>Each module includes 5 quiz questions with explanations to reinforce learning.</p>
              </div>
              <div className="lesson-point-card">
                <strong>🏆 Track Your Progress</strong>
                <p>Earn points, unlock badges, and monitor your learning journey through a comprehensive dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}