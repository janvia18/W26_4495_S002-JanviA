import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { modulesData } from '../lib/modulesData';

export default function Modules() {
  const { progress, points, completedCount } = useProgress();

  const order = ['phishing', 'passwords', 'mfa', 'social', 'safeBrowsing', 'incident'];

  const isUnlocked = (key) => {
    const index = order.indexOf(key);
    if (index === 0) return true;
    return progress.completed?.[order[index - 1]] || false;
  };

  const getStatus = (key) => {
    if (progress.completed?.[key]) return 'completed';
    if (isUnlocked(key)) return 'available';
    return 'locked';
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ margin: 0 }}>Learning Modules</h1>
          <p style={{ color: "#666", marginTop: "5px" }}>Complete all modules to become CyberAware certified</p>
          <p><strong>Total Points: {points}</strong> | Completed: {completedCount}/6</p>
        </div>
        <Link to="/dashboard" style={{ padding: "8px 16px", background: "#f0f0f0", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
          ← Dashboard
        </Link>
      </div>

      {modulesData.map((module) => {
        const status = getStatus(module.key);
        const isLocked = status === 'locked';
        const isCompleted = status === 'completed';

        return (
          <div key={module.key} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            margin: "15px 0",
            border: `2px solid ${isCompleted ? '#28a745' : isLocked ? '#ddd' : '#6c63ff'}`,
            borderRadius: "12px",
            background: "white",
            opacity: isLocked ? 0.7 : 1
          }}>
            <div>
              <h3 style={{ margin: "0 0 8px 0" }}>
                {isCompleted ? "✅ " : isLocked ? "🔒 " : "📚 "}
                {module.title}
              </h3>
              <p style={{ margin: "0 0 8px 0", color: "#666" }}>{module.description}</p>
              <small>📝 {module.quiz.length} questions • 🎯 {module.points} points</small>
            </div>
            {isCompleted ? (
              <Link to={module.route} style={{ padding: "10px 20px", background: "#f0f0f0", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
                Review Module
              </Link>
            ) : !isLocked ? (
              <Link to={module.route} style={{ padding: "10px 20px", background: "#6c63ff", color: "white", borderRadius: "5px", textDecoration: "none" }}>
                Start Module →
              </Link>
            ) : (
              <button disabled style={{ padding: "10px 20px", background: "#ccc", border: "none", borderRadius: "5px", cursor: "not-allowed" }}>
                Complete previous module first
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}