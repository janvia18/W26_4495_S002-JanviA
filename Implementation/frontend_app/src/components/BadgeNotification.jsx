import React, { useEffect } from "react";

export default function BadgeNotification({ badge, onClose }) {
  useEffect(() => {
    if (badge) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <div className="badge-toast">
      <div className="badge-icon">{badge.icon || "🏆"}</div>
      <div className="badge-content">
        <strong>New Badge Unlocked!</strong>
        <p>{badge.title}</p>
        <small>{badge.description}</small>
      </div>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
}