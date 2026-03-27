import React from 'react';
import { useBadges } from '../lib/BadgeContext';
import { useProgress } from '../lib/ProgressContext';

export default function Achievements() {
  const { earnedBadges, badgeDefinitions } = useBadges();
  const { completedCount, points } = useProgress();
  
  const allBadges = [
    { id: 'first_module', title: 'First Win', description: 'Completed your first module.', icon: '🏆', requirement: 'Complete 1 module', check: () => completedCount >= 1 },
    { id: 'halfway_hero', title: 'Halfway Hero', description: 'Completed 3 modules.', icon: '⚡', requirement: 'Complete 3 modules', check: () => completedCount >= 3 },
    { id: 'champion', title: 'CyberAware Champion', description: 'Completed all 6 modules.', icon: '👑', requirement: 'Complete all modules', check: () => completedCount >= 6 },
    { id: 'expert', title: 'Security Expert', description: 'Earned 120+ points.', icon: '🎓', requirement: 'Reach 120 points', check: () => points >= 120 }
  ];
  
  const earnedIds = earnedBadges.map(b => b.id);
  
  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <h1 className="page-title">🏆 Achievements</h1>
          <p className="muted-text">Badges you unlock as you progress through the platform</p>
          
          <div className="achievements-grid">
            {allBadges.map((badge) => {
              const isEarned = earnedIds.includes(badge.id);
              
              return (
                <div key={badge.id} className={`achievement-card ${isEarned ? 'earned' : 'locked'}`}>
                  <div className="achievement-icon">{badge.icon}</div>
                  <div className="achievement-info">
                    <h3>{badge.title}</h3>
                    <p>{badge.description}</p>
                    <small className="muted-text">{badge.requirement}</small>
                    {isEarned && (
                      <div className="achievement-badge">Earned!</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="stats-summary" style={{ marginTop: '2rem' }}>
            <div className="stat-card">
              <h3>Modules Completed</h3>
              <p className="big-number">{completedCount}/6</p>
            </div>
            <div className="stat-card">
              <h3>Total Points</h3>
              <p className="big-number">{points}</p>
            </div>
            <div className="stat-card">
              <h3>Badges Earned</h3>
              <p className="big-number">{earnedBadges.length}/{allBadges.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}