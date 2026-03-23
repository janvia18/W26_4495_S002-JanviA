import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

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

export default function ProfileSetup() {
  const { profile, updateProfile } = useProgress();
  const navigate = useNavigate();
  const [form, setForm] = useState(profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    navigate("/dashboard");
  };

  return (
    <div className="page-shell">
      <div className="card auth-card">
        <h1>Profile Setup</h1>
        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Organization"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
          <input
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <div>
            <p className="muted-text">Choose an avatar</p>
            <div className="avatar-grid">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  className={`avatar-btn ${form.avatar === avatar ? "active-avatar" : ""}`}
                  onClick={() => setForm({ ...form, avatar })}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <button className="primary-btn" type="submit">
            Save profile
          </button>
        </form>
      </div>
    </div>
  );
}