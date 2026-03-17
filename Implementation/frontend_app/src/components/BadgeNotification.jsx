import React from "react";

function BadgeNotification({ badge, onClose }) {
  if (!badge) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "white",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        zIndex: 9999,
        minWidth: "250px"
      }}
    >
      <h3>New Badge Unlocked 🎉</h3>
      <p>
        <strong>{badge.icon} {badge.title}</strong>
      </p>
      <p>{badge.description}</p>

      <button
        onClick={onClose}
        style={{
          marginTop: "8px",
          padding: "6px 10px",
          borderRadius: "6px",
          border: "none",
          background: "#4f46e5",
          color: "white",
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  );
}

export default BadgeNotification;