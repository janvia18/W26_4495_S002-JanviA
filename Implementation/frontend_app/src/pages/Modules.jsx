import React from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";
import { modulesData } from "./modulesData";

export default function Modules() {
  const { progress, points } = useProgress();

  const order = ["phishing", "passwords", "mfa", "social", "safe-browsing", "incident"];
  const timeMap = {
    phishing: "10 min",
    passwords: "8 min",
    mfa: "7 min",
    social: "9 min",
    "safe-browsing": "8 min",
    incident: "6 min"
  };
  const emojiMap = {
    phishing: "📨",
    passwords: "🔐",
    mfa: "📱",
    social: "🕵️",
    "safe-browsing": "🌐",
    incident: "🚨"
  };

  const isUnlocked = (key) => {
    const index = order.indexOf(key);
    if (index === 0) return true;
    return progress.completed[order[index - 1]];
  };

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">Modules</h1>
              <p className="muted-text">Points: {points}</p>
            </div>

            <Link className="ghost-btn" to="/dashboard">
              Back to Dashboard
            </Link>
          </div>

          <div className="subtle-line" />

          <div className="module-list">
            {modulesData.map((module) => {
              const unlocked = isUnlocked(module.key);
              const completed = progress.completed[module.key];

              return (
                <div key={module.key} className="module-item">
                  <div className="module-left">
                    <div className="module-title">
                      {module.title} <span className="module-emoji">{emojiMap[module.key]}</span>
                    </div>
                    <div className="module-desc">{module.description}</div>
                    <div className="module-time">Time: {timeMap[module.key]}</div>
                    <div className="module-time">Reward: {module.points} points</div>
                  </div>

                  <div className="module-right">
                    <div className="module-status">
                      {completed ? "Completed ✅" : unlocked ? "Not Started" : "Locked"}
                    </div>

                    {completed ? (
                      <Link className="ghost-btn" to={module.route}>
                        Review
                      </Link>
                    ) : unlocked ? (
                      <Link className="primary-btn" to={module.route}>
                        Open Module
                      </Link>
                    ) : (
                      <button className="ghost-btn" disabled>
                        Finish previous module
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="modules-note">
            Progress is saved locally for this prototype. Server sync can be added later.
          </p>
        </div>
      </div>
    </div>
  );
}