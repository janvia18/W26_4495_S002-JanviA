import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';

export default function Dashboard() {
  const { profile, points, level, completedCount, progress } = useProgress();
  const progressPercent = Math.round((completedCount / 6) * 100);

  const modules = [
    { key: 'phishing', title: 'Phishing Awareness' },
    { key: 'passwords', title: 'Password Security' },
    { key: 'mfa', title: 'Multi-Factor Authentication' },
    { key: 'social', title: 'Social Engineering' },
    { key: 'safeBrowsing', title: 'Safe Browsing' },
    { key: 'incident', title: 'Incident Reporting' }
  ];

  const nextModule = modules.find(m => !progress.completed?.[m.key]);
  const nextTitle = nextModule ? nextModule.title : 'All modules completed! 🎉';

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1>CyberAware Dashboard</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px", background: "#f5f5f5", borderRadius: "12px", marginBottom: "30px" }}>
        <div style={{ fontSize: "48px" }}>{profile.avatar || "🛡️"}</div>
        <div>
          <h2 style={{ margin: 0 }}>Welcome, {profile.name || "Learner"}!</h2>
          {profile.organization && <p style={{ margin: "5px 0 0 0", color: "#666" }}>{profile.organization}</p>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
        <div style={{ padding: "20px", background: "white", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h3>Points</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0 0 0", color: "#6c63ff" }}>{points}</p>
        </div>
        <div style={{ padding: "20px", background: "white", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h3>Level</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "10px 0 0 0", color: "#6c63ff" }}>{level}</p>
        </div>
        <div style={{ padding: "20px", background: "white", borderRadius: "12px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h3>Completed</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0 0 0", color: "#6c63ff" }}>{completedCount}/6</p>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <h3>Overall Progress</h3>
          <span>{progressPercent}%</span>
        </div>
        <div style={{ height: "10px", background: "#e0e0e0", borderRadius: "5px", overflow: "hidden" }}>
          <div style={{ width: `${progressPercent}%`, height: "100%", background: "#6c63ff", transition: "width 0.3s" }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
        <Link to="/modules" style={{ padding: "12px 24px", background: "#6c63ff", color: "white", borderRadius: "8px", textDecoration: "none" }}>
          Continue Learning
        </Link>
        <Link to="/profile" style={{ padding: "12px 24px", background: "#f0f0f0", color: "#333", borderRadius: "8px", textDecoration: "none" }}>
          Edit Profile
        </Link>
        <Link to="/achievements" style={{ padding: "12px 24px", background: "#f0f0f0", color: "#333", borderRadius: "8px", textDecoration: "none" }}>
          Achievements
        </Link>
      </div>

      <div style={{ padding: "20px", background: "#f9f9ff", borderRadius: "12px", border: "1px solid #6c63ff" }}>
        <h3 style={{ margin: "0 0 10px 0" }}>🎯 Next Up</h3>
        <p style={{ margin: "0 0 15px 0" }}>{nextTitle}</p>
        {nextModule && (
          <Link to={`/modules/${nextModule.key}`} style={{ padding: "8px 16px", background: "#6c63ff", color: "white", borderRadius: "5px", textDecoration: "none", display: "inline-block" }}>
            Start Module →
          </Link>
        )}
      </div>
    </div>
  );
}