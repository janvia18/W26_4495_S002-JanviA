/**
 * Progress summary page: completion %, per-module checklist from modulesData, and XP/level readout.
 */
import React from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";
import { modulesData } from "../lib/modulesData";

export default function ProgressPage() {
  const { progress, completedCount, points, level, resetProgress } = useProgress();

  const totalModules = modulesData.length;
  const percent = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">Progress</h1>
              <p className="muted-text">
                Track your learning progress across all cybersecurity modules.
              </p>
            </div>

            <Link className="ghost-btn" to="/dashboard">
              Back to Dashboard
            </Link>
          </div>

          <div className="subtle-line" />

          <div className="stats-row">
            <div className="stat-box">
              <h3>Overall Completion</h3>
              <p className="big-number">{percent}%</p>
            </div>

            <div className="stat-box">
              <h3>Total Points</h3>
              <p className="big-number">{points}</p>
            </div>

            <div className="stat-box">
              <h3>Current Level</h3>
              <p className="big-number" style={{ fontSize: "1.3rem" }}>
                {level}
              </p>
            </div>
          </div>

          <div className="subtle-line" />

          <div className="module-list">
            {modulesData.map((module, index) => {
              const done = progress.completed[module.key];

              return (
                <div key={module.key} className="module-item">
                  <div className="module-left">
                    <div className="module-title">
                      Module {index + 1}: {module.title}
                    </div>
                    <div className="module-desc">{module.description}</div>
                  </div>

                  <div className="module-right">
                    <div className="module-status">
                      {done ? "Completed ✅" : "Not Completed"}
                    </div>

                    <Link className="ghost-btn" to={module.route}>
                      View Module
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 20 }} className="hero-actions">
            <button className="ghost-btn" onClick={resetProgress}>
              Reset Progress
            </button>

            <Link className="primary-btn" to="/modules">
              Continue Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}