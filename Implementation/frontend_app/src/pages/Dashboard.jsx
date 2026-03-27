import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';

export default function Dashboard() {
  const { profile, points, level, completedCount, progress, loading } = useProgress();
  
  if (loading) {
    return (
      <div className="page-shell">
        <div className="content-wrap">
          <div className="main-card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading your dashboard...
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const progressPercent = Math.round((completedCount / 6) * 100) || 0;
  
  const modules = [
    { key: 'phishing', title: 'Phishing Awareness' },
    { key: 'passwords', title: 'Password Security' },
    { key: 'mfa', title: 'Multi-Factor Authentication' },
    { key: 'social', title: 'Social Engineering' },
    { key: 'safeBrowsing', title: 'Safe Browsing' },
    { key: 'incident', title: 'Incident Reporting' }
  ];
  
  const nextModule = modules.find(m => !progress?.completed?.[m.key]);
  const nextTitle = nextModule ? nextModule.title : 'All modules completed! 🎉';
  
  // Safe defaults for profile
  const userName = profile?.name || 'Learner';
  const userAvatar = profile?.avatar || '🛡️';
  const userOrg = profile?.organization || '';
  
  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <div className="dashboard-top">
            <div>
              <h1 className="page-title">CyberAware Dashboard</h1>
              <p className="muted-text">Track your cybersecurity learning journey</p>
            </div>
          </div>
          
          <div className="dashboard-user-row">
            <div className="user-chip-large">
              <span className="avatar-large">{userAvatar}</span>
              <div>
                <h2>Welcome, {userName}!</h2>
                {userOrg && <p className="muted-text">{userOrg}</p>}
              </div>
            </div>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-main-panel">
              <div className="stats-summary">
                <div className="stat-card">
                  <h3>Points</h3>
                  <p className="big-number">{points || 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Level</h3>
                  <p className="level-text">{level || 'Beginner'}</p>
                </div>
                <div className="stat-card">
                  <h3>Completed</h3>
                  <p className="big-number">{completedCount || 0}/6</p>
                </div>
              </div>
              
              <div className="progress-section">
                <div className="progress-header">
                  <h3>Overall Progress</h3>
                  <span>{progressPercent}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              
              <div className="dashboard-actions">
                <Link className="primary-btn" to="/modules">
                  Continue Learning
                </Link>
                <Link className="secondary-btn" to="/profile">
                  Edit Profile
                </Link>
              </div>
              
              <div className="next-module-card">
                <h3>🎯 Next Up</h3>
                <p>{nextTitle}</p>
                {nextModule && (
                  <Link className="ghost-btn" to={`/modules/${nextModule.key}`}>
                    Start Module →
                  </Link>
                )}
              </div>
            </div>
            
            <div className="dashboard-side-panel">
              <div className="tip-card">
                <h3>💡 Pro Tip</h3>
                <p>Complete all 6 modules to become a CyberAware Champion and unlock exclusive badges!</p>
              </div>
              <div className="achievement-preview">
                <h3>🏆 Achievements</h3>
                <div className="achievement-icons">
                  {(completedCount || 0) >= 1 && <span>🏅 First Win</span>}
                  {(completedCount || 0) >= 3 && <span>⚡ Halfway Hero</span>}
                  {(completedCount || 0) >= 6 && <span>👑 Champion</span>}
                  {(points || 0) >= 120 && <span>🎓 Expert</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}