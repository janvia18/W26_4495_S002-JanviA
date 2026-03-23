import React from "react";

export default function BadgeNotification({ badge, onClose }) {
  if (!badge) return null;

  return (
    <div className="badge-toast">
      <div>
        <strong>🏆 {badge.title}</strong>
        <div>{badge.description}</div>
      </div>
      <button className="secondary-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
}