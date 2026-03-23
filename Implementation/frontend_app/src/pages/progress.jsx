import React from "react";
import { useProgress } from "../lib/ProgressContext";

export default function ProgressPage() {
  const { progress, completedCount, points, level, resetProgress } = useProgress();

  const items = Object.entries(progress.completed);
  const percent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">Progress</h1>
              <p className="muted-text">Track your learning progress across all modules.</p>
            </div>
          </div>

          <div className="subtle-line" />

          <div className="stat-box" style={{ marginBottom: 20 }}>
            <h3>Overall Completion</h3>
            <p className="big-number">{percent}%</p>
            <p className="muted-text">
              Points: {points} • Level: {level}
            </p>
          </div>

          <div className="module-list">
            {items.map(([key, done]) => (
              <div key={key} className="module-item">
                <div className="module-left">
                  <div className="module-title">{key}</div>
                </div>
                <div className="module-right">
                  <div className="module-status">{done ? "Completed ✅" : "Not Completed"}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <button className="ghost-btn" onClick={resetProgress}>
              Reset Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}