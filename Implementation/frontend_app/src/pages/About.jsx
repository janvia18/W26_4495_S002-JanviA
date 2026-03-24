import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  const sections = [
    {
      title: "Project Purpose",
      text: "CyberAware was developed to improve cybersecurity awareness by teaching users how to recognize common online threats and respond to them responsibly. The platform focuses on practical skills that learners can apply in real digital environments.",
      icon: "🎯",
    },
    {
      title: "What the Platform Covers",
      text: "The application includes modules on phishing awareness, password security, multi-factor authentication, social engineering, safe browsing, and incident reporting. Each topic is presented with notes, examples, scenarios, and quizzes.",
      icon: "📚",
    },
    {
      title: "Interactive Learning Experience",
      text: "CyberAware is designed to make learning more engaging through realistic situations, immediate feedback on answers, badge rewards, and progress tracking. This helps users stay motivated while improving their cybersecurity habits.",
      icon: "💡",
    },
    {
      title: "Why It Matters",
      text: "Cybersecurity threats affect students, employees, and everyday internet users. By promoting awareness and safe online behavior, CyberAware helps reduce risks such as phishing attacks, weak passwords, unsafe browsing, and delayed incident reporting.",
      icon: "🛡️",
    },
  ];

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">About CyberAware</h1>
              <p className="muted-text">
                CyberAware is a cybersecurity awareness learning application
                built to help users understand practical digital safety in a
                simple, interactive, and professional way.
              </p>
            </div>

            <Link className="ghost-btn" to="/">
              Back Home
            </Link>
          </div>

          <div className="subtle-line" />

          <div className="lesson-points-grid">
            {sections.map((section, index) => (
              <div className="lesson-point-card" key={index}>
                <h3>
                  {section.icon} {section.title}
                </h3>
                <p className="muted-text">{section.text}</p>
              </div>
            ))}
          </div>

          <div className="subtle-line" />

          <div className="page-header-row">
            <div>
              <h2 className="page-title" style={{ fontSize: "1.5rem" }}>
                Learning Goals
              </h2>
              <p className="muted-text">
                The main goal of CyberAware is to help learners:
              </p>
            </div>
          </div>

          <div className="lesson-points-grid">
            <div className="lesson-point-card">
              Identify suspicious emails, websites, and messages more
              confidently.
            </div>
            <div className="lesson-point-card">
              Understand the value of strong passwords and multi-factor
              authentication.
            </div>
            <div className="lesson-point-card">
              Respond appropriately to unsafe situations and security
              incidents.
            </div>
            <div className="lesson-point-card">
              Build long-term safe online habits through regular practice.
            </div>
          </div>

          <div style={{ marginTop: "24px" }} className="hero-actions">
            <Link className="primary-btn" to="/signup">
              Get Started
            </Link>
            <Link className="secondary-btn" to="/login">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}