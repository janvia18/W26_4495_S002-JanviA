import React, { useMemo } from "react";

function safeJson(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function Progress() {
  const profile = safeJson(localStorage.getItem("profile"), {
    name: "User",
    avatar: "cat",
  });

  const progressData = safeJson(localStorage.getItem("progress"), {
    completed: {
      phishing: false,
      password: false,
      mfa: false,
      social: false,
      incident: false,
    },
  });

  const points = Number(localStorage.getItem("points") || 0);

  const avatarEmoji = {
    bear: "🐻",
    horse: "🐴",
    cat: "🐱",
    dog: "🐶",
    fox: "🦊",
    panda: "🐼",
    rabbit: "🐰",
    tiger: "🐯",
    lion: "🦁",
    monkey: "🐵",
    koala: "🐨",
    penguin: "🐧",
    frog: "🐸",
    owl: "🦉",
    unicorn: "🦄",
    dragon: "🐲",
  };

  const modules = [
    { key: "phishing", title: "Phishing Awareness 📧" },
    { key: "password", title: "Password Security 🔐" },
    { key: "mfa", title: "Multi-Factor Authentication 🛡️" },
    { key: "social", title: "Social Engineering 🕵️" },
    { key: "incident", title: "Incident Response 🚨" },
  ];

  const completedCount = useMemo(() => {
    return modules.filter((module) => progressData.completed?.[module.key]).length;
  }, [modules, progressData]);

  const completionPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="page-container">
      <h1>Progress Tracker 📈</h1>
      <p>
        Track your learning journey and see how far you have come in CyberAware.
      </p>

      <div className="card">
        <h2>
          {avatarEmoji[profile.avatar] || "👤"} {profile.name || "User"}
        </h2>
        <p><strong>Points:</strong> {points}</p>
        <p><strong>Completed Modules:</strong> {completedCount} / {modules.length}</p>
        <p><strong>Overall Progress:</strong> {completionPercent}%</p>
      </div>

      <div className="card">
        <h2>Module Completion</h2>

        <div style={{ marginTop: "1rem" }}>
          {modules.map((module) => {
            const done = progressData.completed?.[module.key];

            return (
              <div
                key={module.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.85rem 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>{module.title}</span>
                <span
                  style={{
                    fontWeight: "600",
                    color: done ? "#28a745" : "#dc3545",
                  }}
                >
                  {done ? "Completed" : "Not Completed"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h2>Learning Note</h2>
        <p>
          Progress is saved locally in this prototype. As you complete more
          modules, your completion count and points can grow like a little
          cybersecurity garden with fewer weeds and more shields.
        </p>
      </div>
    </div>
  );
}

export default Progress;