import React from "react";
import { useBadges } from "../lib/BadgeContext";

export default function Achievements() {
  const { earnedBadges } = useBadges();

  return (
    <div className="page-shell">
      <div className="card">
        <h1>Achievements</h1>
        <p>Your badge shelf for completed milestones.</p>
      </div>

      <div className="module-grid">
        {earnedBadges.length === 0 ? (
          <div className="card">
            <p>No badges unlocked yet. Complete a module to start earning them.</p>
          </div>
        ) : (
          earnedBadges.map((badge) => (
            <div key={badge.id} className="card module-card">
              <h2>🏆 {badge.title}</h2>
              <p>{badge.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}