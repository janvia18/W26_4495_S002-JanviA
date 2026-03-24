import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const highlights = [
    {
      title: "Interactive Learning",
      text: "Study cybersecurity concepts through simple notes, guided explanations, and realistic examples.",
      icon: "📘",
    },
    {
      title: "Real-World Scenarios",
      text: "Practice spotting phishing, unsafe behavior, and social engineering attacks in everyday situations.",
      icon: "🛡️",
    },
    {
      title: "Track Your Progress",
      text: "Earn badges, monitor learning progress, and build confidence as you complete each module.",
      icon: "📈",
    },
  ];

  const modules = [
    "Phishing Awareness",
    "Password Security",
    "Multi-Factor Authentication",
    "Social Engineering",
    "Safe Browsing",
    "Incident Reporting",
  ];

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="hero-box">
          <p className="eyebrow">Cybersecurity Training Portal</p>
          <h1 className="hero-title">CyberAware</h1>
          <p className="hero-text">
            CyberAware is a professional cybersecurity awareness platform
            designed to help learners build safer online habits through guided
            modules, realistic scenarios, quizzes, badges, and progress
            tracking.
          </p>

          <div className="hero-actions">
            <Link className="primary-btn" to="/signup">
              Get Started
            </Link>
            <Link className="secondary-btn" to="/login">
              Log In
            </Link>
            <Link className="secondary-btn" to="/about">
              About
            </Link>
          </div>
        </div>

        <div className="main-card" style={{ marginTop: "24px" }}>
          <div className="page-header-row">
            <div>
              <h2 className="page-title">Why CyberAware?</h2>
              <p className="muted-text">
                Cyber threats are becoming more common in everyday life. This
                platform helps learners understand how to recognize risks,
                respond correctly, and develop secure digital habits.
              </p>
            </div>
          </div>

          <div className="stats-row">
            {highlights.map((item, index) => (
              <div className="stat-box" key={index}>
                <h3>
                  {item.icon} {item.title}
                </h3>
                <p className="muted-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="main-card" style={{ marginTop: "24px" }}>
          <div className="page-header-row">
            <div>
              <h2 className="page-title">What You Will Learn</h2>
              <p className="muted-text">
                The platform includes focused training modules that cover
                important cybersecurity topics for everyday users.
              </p>
            </div>
          </div>

          <div className="module-list">
            {modules.map((module, index) => (
              <div className="module-item" key={index}>
                <div className="module-left">
                  <div className="module-title">{module}</div>
                  <p className="module-desc">
                    Learn core concepts, review practical examples, and test
                    your understanding with interactive questions.
                  </p>
                </div>
                <div className="module-right">
                  <span className="module-status">Module {index + 1}</span>
                  <span className="module-emoji">🎯</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-card" style={{ marginTop: "24px" }}>
          <div className="page-header-row">
            <div>
              <h2 className="page-title">Start Building Safer Habits</h2>
              <p className="muted-text">
                Join CyberAware to explore training modules, complete quizzes,
                and improve your confidence in identifying online threats.
              </p>
            </div>
          </div>

          <div className="hero-actions">
            <Link className="primary-btn" to="/signup">
              Create an Account
            </Link>
            <Link className="ghost-btn" to="/login">
              Continue Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}