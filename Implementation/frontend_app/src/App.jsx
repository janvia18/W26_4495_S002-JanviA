import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModulePhishing from "./pages/ModulePhishing";
import ModulePasswords from "./pages/ModulePasswords";
import ModuleSocial from "./pages/ModuleSocial";
import ProfileSetup from "./pages/ProfileSetup";
import Login from "./pages/LoginPage";
import ModuleMFA from "./pages/ModuleMFA";
import ModuleBrowsing from "./pages/ModuleBrowsing";
import ModuleIncident from "./pages/ModuleIncident";

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

export default function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem("profile");
      setProfile(saved ? JSON.parse(saved) : null);
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  return (
    <div className="page">
      <nav className="nav">
        <div className="navLeft">
          <div
            style={{
              fontWeight: 900,
              padding: "8px 12px",
              borderRadius: 14,
              background: "linear-gradient(135deg, rgba(108,99,255,0.20), rgba(63,182,255,0.14))",
              border: "1px solid rgba(108,99,255,0.18)",
            }}
          >
            <div className="brand">CyberAware ✨</div>
          </div>

          <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "link active" : "link")}>About</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "link active" : "link")}>Dashboard</NavLink>
          <NavLink to="/modules" className={({ isActive }) => (isActive ? "link active" : "link")}>Modules</NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "link active" : "link")}>Profile</NavLink>
        </div>

        <div className="navRight" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {profile?.name ? (
            <div className="profileChip">
              <span className="chipEmoji">{avatarEmoji[profile.avatar] || "🙂"}</span>
              <span>Hi, {profile.name}</span>
            </div>
          ) : (
            <div className="profileChip muted">No profile yet</div>
          )}

          <NavLink to="/login" className={({ isActive }) => (isActive ? "link active" : "link")}>Login</NavLink>
        </div>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProfileSetup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/phishing" element={<ModulePhishing />} />
          <Route path="/modules/password" element={<ModulePasswords />} />
          <Route path="/modules/social" element={<ModuleSocial />} />
          <Route path="/modules/mfa" element={<ModuleMFA />} />
          <Route path="/modules/browsing" element={<ModuleBrowsing />} />
          <Route path="/modules/incident_response" element={<ModuleIncident />} />
        </Routes>
      </div>
    </div>
  );
}