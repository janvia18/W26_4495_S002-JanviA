import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

const avatars = [
  { id: "bear", emoji: "🐻", label: "Bear" },
  { id: "cat", emoji: "🐱", label: "Cat" },
  { id: "dog", emoji: "🐶", label: "Dog" },
  { id: "fox", emoji: "🦊", label: "Fox" },
  { id: "panda", emoji: "🐼", label: "Panda" },
  { id: "rabbit", emoji: "🐰", label: "Rabbit" },
  { id: "lion", emoji: "🦁", label: "Lion" },
  { id: "owl", emoji: "🦉", label: "Owl" }
];

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useProgress();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🐻");

  useEffect(() => {
    if (profile?.name) setName(profile.name);
    if (profile?.avatar) setAvatar(profile.avatar);
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || "Learner",
      avatar
    });
    navigate("/dashboard");
  };

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card profile-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">Profile Setup</h1>
              <p className="muted-text">
                Personalize your CyberAware experience by choosing a display name and avatar.
              </p>
            </div>
          </div>

          <div className="subtle-line" />

          <form onSubmit={handleSubmit} className="form-grid">
            <div>
              <label htmlFor="displayName">Display Name</label>
              <input
                id="displayName"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Choose an Avatar</label>
              <div className="character-grid">
                {avatars.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`character-card ${avatar === item.emoji ? "selected" : ""}`}
                    onClick={() => setAvatar(item.emoji)}
                  >
                    <div className="character-emoji">{item.emoji}</div>
                    <div className="character-name">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="primary-btn">
                Save Profile
              </button>
              <button
                type="button"
                className="ghost-btn"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}