import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { useBadges } from '../lib/BadgeContext';

export default function Achievements() {
  const { points, completedCount } = useProgress();
  const { earnedBadges } = useBadges();

  const allBadges = [
    { id: 'first_module', title: 'First Win', description: 'Completed your first module', icon: '🏆', requirement: 'Complete 1 module', check: () => completedCount >= 1 },
    { id: 'halfway_hero', title: 'Halfway Hero', description: 'Completed 3 modules', icon: '⚡', requirement: 'Complete 3 modules', check: () => completedCount >= 3 },
    { id: 'champion', title: 'CyberAware Champion', description: 'Completed all 6 modules', icon: '👑', requirement: 'Complete all modules', check: () => completedCount >= 6 },
    { id: 'expert', title: 'Security Expert', description: 'Earned 120+ points', icon: '🎓', requirement: 'Reach 120 points', check: () => points >= 120 }
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>🏆 Achievements</h1>
        <Link to="/dashboard" style={{ padding: "8px 16px", background: "#f0f0f0", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
          ← Dashboard
        </Link>
      </div>

      <p style={{ color: "#666", marginBottom: "30px" }}>Badges you unlock as you progress through the platform</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {allBadges.map(badge => {
          const isEarned = earnedBadges.some(b => b.id === badge.id);

          return (
            <div key={badge.id} style={{
              padding: "20px",
              border: `2px solid ${isEarned ? '#28a745' : '#e0e0e0'}`,
              borderRadius: "12px",
              background: isEarned ? '#f0fff4' : 'white',
              transition: "all 0.2s"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>{badge.icon}</div>
              <h3 style={{ margin: "0 0 5px 0" }}>
                {badge.title} {isEarned && "✓"}
              </h3>
              <p style={{ margin: "0 0 10px 0", color: "#666" }}>{badge.description}</p>
              <small style={{ color: isEarned ? '#28a745' : '#999' }}>
                {isEarned ? "Earned!" : `Requirement: ${badge.requirement}`}
              </small>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "30px", padding: "20px", background: "#f5f5f5", borderRadius: "12px", textAlign: "center" }}>
        <h3>Your Stats</h3>
        <p>📊 Modules Completed: {completedCount}/6</p>
        <p>⭐ Total Points: {points}/120</p>
        <p>🏅 Badges Earned: {earnedBadges.length}/{allBadges.length}</p>
      </div>
    </div>
  );
}