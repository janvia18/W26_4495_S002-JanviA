import React, { useEffect } from "react";

export default function BadgeNotification({ badge, onClose }) {
  useEffect(() => {
    if (badge) {
      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <div className="badge-toast" role="status" aria-live="polite">
      <div className="badge-toast-inner">
        <span className="badge-icon" aria-hidden="true">
          {badge.icon || "🏆"}
        </span>
        <div className="badge-text">
          <strong className="badge-title">{badge.title}</strong>
          <p className="badge-desc">{badge.description}</p>
        </div>
        <button type="button" onClick={onClose} className="badge-close-btn">
          Close
        </button>
      </div>
    </div>
  );
}
