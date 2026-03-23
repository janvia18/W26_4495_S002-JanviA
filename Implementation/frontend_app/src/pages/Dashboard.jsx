import React from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";
import { modulesData } from "./modulesData";

export default function Dashboard() {
  const { profile, points, level, completedCount } = useProgress();

  const nextModule = modulesData.find((module) => !module.completed)?.title;
  const displayedNext =
    completedCount >= modulesData.length
      ? "All modules completed 🎉"
      : modulesData.find((module) => {
          const order = modulesData.map((m) => m.key);
          const idx = order.indexOf(module.key);
          if (idx === 0) return true;
          return false;
        });

  const moduleNames = {
    phishing: "Phishing Awareness",
    passwords: "Password Security",
    mfa: "Multi-Factor Authentication",
    social: "Social Engineering",
    "safe-browsing": "Safe Browsing",
    incident: "Incident Reporting"
  };

  const progressPercent = Math.round((completedCount / modulesData.length) * 100);

  const nextRecommended = (() => {
    const order = ["phishing", "passwords", "mfa", "social", "safe-browsing", "incident"];
    for (let i = 0; i < order.length; i++) {
      const key = order[i];
      if (!localStorage.getItem("dummy")) {
        // noop
      }
    }
    return orderToTitle(order, completedCount, moduleNames);
  })();

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <div className="dashboard-top">
            <div>
              <h1 className="page-title">CyberAware</h1>
              <p className="muted-text">Learner Dashboard</p>
            </div>

            <div className="dashboard-user-row">
              <div className="user-chip">
                <span>{profile.avatar || "🛡️"}</span>
                <span>{profile.name || "Learner"}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-main-panel">
              <h2 className="welcome-title">
                Welcome <span className="wave">👋</span> {profile.name || "Learner"}
              </h2>
              <p className="muted-text">
                Learn through short modules, scenario-based activities, and quick quizzes.
              </p>

              <div className="dashboard-actions">
                <Link className="primary-btn" to="/modules">
                  Go to Modules
                </Link>
                <Link className="secondary-btn" to="/profile-setup">
                  Edit Profile
                </Link>
              </div>

              <div className="progress-header">
                <h3>Progress</h3>
                <span>
                  {completedCount}/{modulesData.length}
                </span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="progress-footer">
                <strong>
                  {level} • {points} points
                </strong>
              </div>
            </div>

            <div className="dashboard-side-panel">
              <div className="stat-section">
                <h3>Points</h3>
                <p className="big-number">{points}</p>
              </div>

              <div className="stat-section">
                <h3>Level</h3>
                <p className="level-text">{level}</p>
              </div>

              <p className="muted-text side-copy">
                Complete modules to earn points and unlock the next topic.
              </p>
            </div>
          </div>

          <div className="next-card">
            <h3>Next Recommended</h3>
            <p>{nextRecommended}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function orderToTitle(order, completedCount, moduleNames) {
  if (completedCount >= order.length) return "All modules completed 🎉";
  return `Next: ${moduleNames[order[completedCount]]}`;
}