import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      id: 1,
      title: "Modules",
      value: "5",
      description: "Cybersecurity training topics available",
    },
    {
      id: 2,
      title: "Quizzes",
      value: "Interactive",
      description: "Practice what you learn with questions",
    },
    {
      id: 3,
      title: "Achievements",
      value: "6",
      description: "Badges you can unlock as you progress",
    },
  ];

  return (
    <div className="page-container">
      <h1>Dashboard 📊</h1>
      <p>
        Welcome to CyberAware. Track your training journey and continue building
        safer online habits.
      </p>

      <div className="modules-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="card">
            <h2>{stat.title}</h2>
            <h3>{stat.value}</h3>
            <p>{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Quick Actions</h2>
        <p>Choose where you want to go next.</p>

        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button className="primary-btn" onClick={() => navigate("/modules")}>
            Go to Modules
          </button>

          <button className="secondary-btn" onClick={() => navigate("/progress")}>
            View Progress
          </button>

          <button className="secondary-btn" onClick={() => navigate("/achievements")}>
            View Achievements
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Why This Matters</h2>
        <p>
          Cybersecurity is not only about tools and software. Many attacks
          succeed because people are rushed, distracted, or tricked. Training
          helps users recognize warning signs before mistakes happen.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;