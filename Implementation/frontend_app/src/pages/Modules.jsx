import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readPoints, readProgress } from "../lib/storage";
import { MODULES } from "./modulesData";

export default function Modules() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState({ completed: {} });

  useEffect(() => {
    setPoints(readPoints());
    setProgress(readProgress());
  }, []);

  const phishingDone = !!progress.completed?.phishing;
  const passwordDone = !!progress.completed?.password;
  const socialDone = !!progress.completed?.social;
  const mfaDone = !!progress.completed?.mfa;
  const browsingDone = !!progress.completed?.browsing;
  if (!c.phishing) return "Start with Phishing Awareness";
if (!c.password) return "Next: Password Security";
if (!c.social) return "Next: Social Engineering";
if (!c.mfa) return "Next: Multi-Factor Authentication";
if (!c.browsing) return "Next: Safe Browsing";
return "All modules completed. Review any module to refresh your skills.";
  function isLocked(moduleKey) {
    if (moduleKey === "phishing") return false;
    if (moduleKey === "password") return !phishingDone;
    if (moduleKey === "social") return !passwordDone;
    if (moduleKey === "mfa") return !socialDone;
    if (moduleKey === "browsing") return !mfaDone;
    if (moduleKey === "incident_response") return !browsingDone;
    return true;
  }

  function getStatus(moduleKey) {
    if (moduleKey === "phishing") return phishingDone ? "Completed ✅" : "Ready to Start";
    if (moduleKey === "password") return passwordDone ? "Completed ✅" : isLocked(moduleKey) ? "Locked" : "Unlocked ✅";
    if (moduleKey === "social") return socialDone ? "Completed ✅" : isLocked(moduleKey) ? "Locked" : "Unlocked ✅";
    if (moduleKey === "mfa") return mfaDone ? "Completed ✅" : isLocked(moduleKey) ? "Locked" : "Unlocked ✅";
    if (moduleKey === "browsing") return browsingDone ? "Completed ✅" : isLocked(moduleKey) ? "Locked" : "Unlocked ✅";
    if (moduleKey === "incident_response") return incidentResponseDone ? "Completed ✅" : isLocked(moduleKey) ? "Locked" : "Unlocked ✅";
    return "Locked";
  }

  function getButtonText(moduleKey) {
    if (moduleKey === "phishing") return phishingDone ? "Review Module" : "Start Module";
    if (moduleKey === "password") return passwordDone ? "Review Module" : "Start Module";
    if (moduleKey === "social") return socialDone ? "Review Module" : "Start Module";
    if (moduleKey === "mfa") return mfaDone ? "Review Module" : "Start Module";
    if (moduleKey === "browsing") return browsingDone ? "Review Module" : "Start Module";
    return "Start Module";
  }

  function getLockedText(moduleKey) {
    if (moduleKey === "password") return "Complete Phishing First";
    if (moduleKey === "social") return "Complete Password First";
    if (moduleKey === "mfa") return "Complete Social First";
    if (moduleKey === "browsing") return "Complete MFA First";
    if (moduleKey === "incident_response") return "Complete Browsing First";
    return "Locked";
  }

  return (
    <div style={{ padding: "40px 20px" }}>
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          background: "rgba(255,255,255,0.92)",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0 }}>Modules</h1>
            <div style={{ marginTop: 8, color: "#444" }}>Points: {points}</div>
          </div>

          <button type="button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>

        <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
          {MODULES.map((module) => {
            const locked = isLocked(module.key);

            return (
              <div
                key={module.key}
                style={{
                  background: "rgba(255,255,255,0.85)",
                  borderRadius: 16,
                  padding: 18,
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: "1 1 320px" }}>
                  <h3 style={{ margin: 0 }}>{module.title}</h3>
                  <p style={{ margin: "8px 0 0", color: "#444", lineHeight: 1.5 }}>{module.desc}</p>
                  <div style={{ marginTop: 8, color: "#666", fontSize: 14 }}>Estimated Time: {module.time}</div>
                </div>

                <div style={{ textAlign: "right", minWidth: 180 }}>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>{getStatus(module.key)}</div>
                  <button
                    type="button"
                    onClick={() => navigate(module.route)}
                    disabled={locked}
                    style={locked ? { opacity: 0.6, cursor: "not-allowed" } : {}}
                  >
                    {locked ? getLockedText(module.key) : getButtonText(module.key)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: 16, color: "#666" }}>
          Progress is saved locally for this prototype. Server sync is planned.
        </p>
      </div>
    </div>
  );
}