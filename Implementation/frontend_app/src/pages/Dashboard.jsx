import React from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function Dashboard() {
  const { profile, points, level, completedCount, logout } = useProgress();

  return (
    <div className="page-shell">
      <div className="card">
        <div className="page-header-row">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1>
              {profile.avatar} {profile.name || "Cyber learner"}
            </h1>
            <p>
              {profile.role || "Learner"}
              {profile.organization ? ` • ${profile.organization}` : ""}
            </p>
          </div>
          <button className="secondary-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <h3>Points</h3>
          <p className="big-number">{points}</p>
        </div>
        <div className="card stat-card">
          <h3>Level</h3>
          <p className="big-number">{level}</p>
        </div>
        <div className="card stat-card">
          <h3>Completed</h3>
          <p className="big-number">{completedCount}/5</p>
        </div>
      </div>

      <div className="card quick-links">
        <h2>Quick Links</h2>
        <div className="button-row">
          <Link className="primary-btn" to="/modules">
            View modules
          </Link>
          <Link className="secondary-btn" to="/progress">
            Progress
          </Link>
          <Link className="secondary-btn" to="/achievements">
            Achievements
          </Link>
        </div>
      </div>
    </div>
  );
}