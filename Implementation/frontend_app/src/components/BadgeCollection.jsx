import React from 'react';

const BadgeCollection = ({ badges }) => {
  return (
    <div className="badge-collection">
      <h3>Your Achievements</h3>
      {badges.length === 0 ? (
        <div className="no-badges">
          <p>You haven't earned any badges yet.</p>
          <p>Complete modules and score well to unlock achievements!</p>
        </div>
      ) : (
        <div className="badges-mini-grid">
          {badges.slice(0, 6).map((badge, index) => (
            <div key={index} className="badge-mini-card" title={`${badge.name}: ${badge.description}`}>
              <span className="badge-mini-icon">{badge.icon}</span>
            </div>
          ))}
          {badges.length > 6 && (
            <div className="badge-more">+{badges.length - 6} more</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BadgeCollection;