import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { modulesData } from '../lib/modulesData';

export default function Modules() {
  const { progress, points, loading } = useProgress();
  
  if (loading || !modulesData) {
    return (
      <div className="page-shell">
        <div className="content-wrap">
          <div className="main-card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading modules...
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const order = ['phishing', 'passwords', 'mfa', 'social', 'safeBrowsing', 'incident'];
  
  const isUnlocked = (key) => {
    const index = order.indexOf(key);
    if (index === 0) return true;
    if (!progress?.completed) return false;
    return progress.completed[order[index - 1]];
  };
  
  const getStatus = (key) => {
    if (progress?.completed?.[key]) return 'completed';
    if (isUnlocked(key)) return 'available';
    return 'locked';
  };
  
  const getStatusText = (key) => {
    const status = getStatus(key);
    if (status === 'completed') return '✅ Completed';
    if (status === 'available') return '📚 Not Started';
    return '🔒 Locked';
  };
  
  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="main-card">
          <div className="page-header-row">
            <div>
              <h1 className="page-title">Learning Modules</h1>
              <p className="muted-text">Complete all modules to become CyberAware certified</p>
              <p className="muted-text">Total Points: <strong>{points || 0}</strong></p>
            </div>
            <Link className="ghost-btn" to="/dashboard">
              ← Back to Dashboard
            </Link>
          </div>
          
          <div className="module-list">
            {modulesData.map((module) => {
              const status = getStatus(module.key);
              const isLocked = status === 'locked';
              const isCompleted = status === 'completed';
              
              return (
                <div key={module.key} className={`module-item ${isLocked ? 'locked' : ''}`}>
                  <div className="module-left">
                    <div className="module-title">
                      {module.emoji || '📚'} {module.title}
                    </div>
                    <div className="module-desc">{module.description}</div>
                    <div className="module-time">
                      ⏱️ {module.quiz?.length || 0} questions • 🎯 {module.points} points
                    </div>
                  </div>
                  <div className="module-right">
                    <div className="module-status">{getStatusText(module.key)}</div>
                    {isCompleted ? (
                      <Link className="ghost-btn" to={module.route}>
                        Review Module
                      </Link>
                    ) : !isLocked ? (
                      <Link className="primary-btn" to={module.route}>
                        Start Module →
                      </Link>
                    ) : (
                      <button className="ghost-btn" disabled>
                        Complete previous module first
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}