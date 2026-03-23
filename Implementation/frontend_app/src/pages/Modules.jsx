import React from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";
import { modulesData } from "./modulesData";

export default function Modules() {
  const { progress } = useProgress();

  const order = ["phishing", "passwords", "mfa", "social", "incident"];

  const isUnlocked = (key) => {
    const index = order.indexOf(key);
    if (index === 0) return true;
    const previousKey = order[index - 1];
    return progress.completed[previousKey];
  };

  return (
    <div className="page-shell">
      <div className="card">
        <h1>Training Modules</h1>
        <p>Complete each module to unlock the next one and earn points.</p>
      </div>

      <div className="module-grid">
        {modulesData.map((module) => {
          const unlocked = isUnlocked(module.key);
          const completed = progress.completed[module.key];

          return (
            <div key={module.key} className="card module-card">
              <h2>{module.title}</h2>
              <p>{module.description}</p>
              <p className="muted-text">Reward: {module.points} points</p>
              <div className="status-row">
                <span className={`status-pill ${completed ? "done" : unlocked ? "open" : "locked"}`}>
                  {completed ? "Completed" : unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
              {unlocked ? (
                <Link className="primary-btn" to={module.route}>
                  Open module
                </Link>
              ) : (
                <button className="secondary-btn" disabled>
                  Complete previous module first
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}