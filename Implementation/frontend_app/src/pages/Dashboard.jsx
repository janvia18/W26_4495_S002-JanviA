import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readProfile, readPoints, readProgress, writePoints, writeProgress } from "../lib/storage";

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

function calcLevel(points) {
  if (points >= 400) return 3;
  if (points >= 200) return 2;
  return 1;
}

function calcCompletedCount(progress) {
  const completed = progress?.completed || {};
  return Object.values(completed).filter(Boolean).length;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(readProfile());
  const [points, setPoints] = useState(readPoints());
  const [progress, setProgress] = useState(readProgress());

  useEffect(() => {
    setProfile(readProfile());
    setPoints(readPoints());
    setProgress(readProgress());
  }, []);

  const totalModules = 3;

  const completedCount = useMemo(() => calcCompletedCount(progress), [progress]);
  const progressText = `${completedCount}/${totalModules}`;
  const progressPct = useMemo(() => Math.round((completedCount / totalModules) * 100), [completedCount]);

  const level = useMemo(() => calcLevel(points), [points]);

  const nextRecommended = useMemo(() => {
    const c = progress?.completed || {};
    if (!c.phishing) return "Start with Phishing Awareness";
    if (!c.password) return "Next: Password Security";
    if (!c.social) return "Next: Social Engineering";
    return "All modules completed. Review any module to refresh your skills.";
  }, [progress]);

  function resetProgress() {
    const next = { completed: { phishing: false, password: false, social: false } };
    writeProgress(next);
    setProgress(next);
  }

  function resetProfile() {
    localStorage.removeItem("profile");
    setProfile(readProfile());
    navigate("/profile");
  }

  function resetPoints() {
    writePoints(0);
    setPoints(0);
  }

  const emoji = avatarEmoji[profile?.avatar] || "👤";

  return (
    <div style={{ padding: "40px 20px" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: 24,
          background: "rgba(255,255,255,0.92)",
          borderRadius: 18,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0 }}>CyberAware</h1>
            <div style={{ marginTop: 8, color: "#555" }}>Learner Dashboard</div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontWeight: 700 }}>{emoji}</span>
              <span style={{ fontWeight: 700 }}>{profile?.name || "Learner"}</span>
            </div>

            <button onClick={resetProfile}>Reset Profile</button>
          </div>
        </div>

        <div style={{ display: "grid", gap: 16, marginTop: 18, gridTemplateColumns: "1.6fr 1fr" }}>
          <div
            style={{
              padding: 18,
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.06)",
              background: "rgba(255,255,255,0.85)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Welcome {profile?.name ? `👋 ${profile.name}` : "👋"}</h2>
            <div style={{ color: "#444", marginTop: 8 }}>
              Learn through short modules, quick activities, and mini quizzes.
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              <button onClick={() => navigate("/modules")}>Go to Modules</button>
              <button disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>Quick Quiz (soon)</button>
            </div>

            <div style={{ marginTop: 18, color: "#555", display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 700 }}>Progress</div>
              <div style={{ color: "#666" }}>{progressText}</div>
            </div>

            <div
              style={{
                marginTop: 8,
                height: 12,
                borderRadius: 999,
                background: "rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progressPct}%`,
                  height: "100%",
                  background: "rgba(70,130,255,0.9)",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontWeight: 700 }}>
                Level {level} · {points} points
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={resetProgress}>Reset Progress</button>
                <button onClick={resetPoints}>Reset Points</button>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.06)",
              background: "rgba(255,255,255,0.85)",
            }}
          >
            <div style={{ fontWeight: 800, color: "#444" }}>Points</div>
            <div style={{ fontSize: 36, fontWeight: 900, marginTop: 8 }}>{points}</div>

            <div style={{ marginTop: 14, fontWeight: 800, color: "#444" }}>Level</div>
            <div style={{ fontSize: 28, fontWeight: 900, marginTop: 6 }}>Level {level}</div>

            <div style={{ marginTop: 16, color: "#666" }}>
              Complete modules to earn points and unlock the next topic.
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.06)",
            background: "rgba(255,255,255,0.85)",
          }}
        >
          <div style={{ fontWeight: 800, color: "#444" }}>Next Recommended</div>
          <div style={{ marginTop: 6, color: "#444" }}>{nextRecommended}</div>
        </div>
      </div>
    </div>
  );
}