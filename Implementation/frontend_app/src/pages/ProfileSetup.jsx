import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

const avatarOptions = [
  { emoji: "🐻", label: "Bear" },
  { emoji: "🐴", label: "Horse" },
  { emoji: "🐱", label: "Cat" },
  { emoji: "🐶", label: "Dog" },
  { emoji: "🦊", label: "Fox" },
  { emoji: "🐼", label: "Panda" },
  { emoji: "🐰", label: "Rabbit" },
  { emoji: "🐯", label: "Tiger" },
  { emoji: "🦁", label: "Lion" },
  { emoji: "🐵", label: "Monkey" },
  { emoji: "🐨", label: "Koala" },
  { emoji: "🐧", label: "Penguin" }
];

export default function ProfileSetup() {
  const { profile, updateProfile } = useProgress();
  const navigate = useNavigate();

  const [name, setName] = useState(profile.name || "");
  const [organization, setOrganization] = useState(profile.organization || "");
  const [role, setRole] = useState(profile.role || "");
  const [avatar, setAvatar] = useState(profile.avatar || "🐻");
  const [error, setError] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    updateProfile({
      name: name.trim(),
      organization: organization.trim(),
      role: role.trim(),
      avatar
    });

    navigate("/dashboard");
  };

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card profile-card">
          <h1 className="page-title">Create your profile</h1>

          <form onSubmit={handleSave} className="form-grid">
            <div>
              <label>Your name</label>
              <input
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Organization</label>
              <input
                type="text"
                value={organization}
                placeholder="Optional"
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>

            <div>
              <label>Role</label>
              <input
                type="text"
                value={role}
                placeholder="Optional"
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div>
              <label>Pick a character</label>
              <div className="character-grid">
                {avatarOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={`character-card ${avatar === option.emoji ? "selected" : ""}`}
                    onClick={() => setAvatar(option.emoji)}
                  >
                    <div className="character-emoji">{option.emoji}</div>
                    <div className="character-name">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {error ? <p className="error-text">{error}</p> : null}

            <div className="profile-actions">
              <button className="primary-btn" type="submit">
                Save Profile
              </button>
              <button
                className="secondary-btn"
                type="button"
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