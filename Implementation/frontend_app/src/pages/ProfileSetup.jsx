import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

const avatarOptions = [
  { emoji: "🛡️", label: "Shield" },
  { emoji: "🔒", label: "Lock" },
  { emoji: "🦊", label: "Fox" },
  { emoji: "🐱", label: "Cat" },
  { emoji: "🐶", label: "Dog" },
  { emoji: "🐼", label: "Panda" },
  { emoji: "🦁", label: "Lion" },
  { emoji: "🐧", label: "Penguin" },
  { emoji: "🦉", label: "Owl" },
  { emoji: "🐨", label: "Koala" }
];

export default function ProfileSetup() {
  const { profile, updateProfile, loading } = useProgress();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("🛡️");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Load profile data when available
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setOrganization(profile.organization || "");
      setRole(profile.role || "");
      setAvatar(profile.avatar || "🛡️");
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="page-shell">
        <div className="content-wrap">
          <div className="main-card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    
    setSaving(true);
    setError("");
    
    try {
      await updateProfile({
        name: name.trim(),
        organization: organization.trim(),
        role: role.trim(),
        avatar
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      console.error("Profile save error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card profile-card">
          <h1 className="page-title">Create Your Profile</h1>
          <p className="muted-text">Tell us a bit about yourself to personalize your experience</p>
          
          <form onSubmit={handleSave} className="form-grid">
            <div>
              <label>Your Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                disabled={saving}
              />
            </div>
            <div>
              <label>Organization (Optional)</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g., Company, School, or Organization"
                disabled={saving}
              />
            </div>
            <div>
              <label>Role (Optional)</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Developer, Manager, Student"
                disabled={saving}
              />
            </div>
            <div>
              <label>Choose Your Avatar</label>
              <div className="character-grid">
                {avatarOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className={`character-card ${avatar === option.emoji ? "selected" : ""}`}
                    onClick={() => setAvatar(option.emoji)}
                    disabled={saving}
                  >
                    <div className="character-emoji">{option.emoji}</div>
                    <div className="character-name">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="error-text">{error}</p>}
            <div className="profile-actions">
              <button className="primary-btn" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Profile"}
              </button>
              <button
                className="secondary-btn"
                type="button"
                onClick={() => navigate("/dashboard")}
                disabled={saving}
              >
                Skip for Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}