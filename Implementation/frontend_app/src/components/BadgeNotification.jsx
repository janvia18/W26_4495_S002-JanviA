import React from "react";

export default function BadgeNotification({ badge, onClose }) {
  if (!badge) return null;

  return (
    <div className="badge-toast">
      <div>
        <strong>🏆 Badge unlocked:</strong> {badge.title}
        <div className="muted-text">{badge.description}</div>
      </div>
      <button className="secondary-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
}