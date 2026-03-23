import React from "react";
import { useProgress } from "../lib/ProgressContext";

export default function Progress() {
  const { progress, completedCount, points, level, resetProgress } = useProgress();

  const items = Object.entries(progress.completed);
  const percent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="page-shell">
      <div className="card">
        <h1>My Progress</h1>
        <p>Track your training journey and see how far you have come.</p>
      </div>

      <div className="card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <p>
          <strong>{percent}% complete</strong>
        </p>
        <p>
          Points: {points} • Level: {level}
        </p>
      </div>

      <div className="module-grid">
        {items.map(([key, done]) => (
          <div key={key} className="card module-card">
            <h2>{key}</h2>
            <p>{done ? "Completed" : "Not completed yet"}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <button className="secondary-btn" onClick={resetProgress}>
          Reset progress
        </button>
      </div>
    </div>
  );
}