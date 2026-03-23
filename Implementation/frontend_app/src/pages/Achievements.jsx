import React from "react";
import { useBadges } from "../lib/BadgeContext";

export default function Achievements() {
  const { earnedBadges } = useBadges();

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <h1 className="page-title">Achievements</h1>
          <p className="muted-text">Badges you unlock as you progress through the platform.</p>

          <div className="subtle-line" />

          <div className="lesson-points-grid">
            {earnedBadges.length === 0 ? (
              <div className="lesson-point-card">No badges unlocked yet.</div>
            ) : (
              earnedBadges.map((badge) => (
                <div key={badge.id} className="lesson-point-card">
                  <strong>🏆 {badge.title}</strong>
                  <div className="muted-text" style={{ marginTop: 8 }}>
                    {badge.description}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}