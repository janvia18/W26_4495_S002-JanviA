import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { MODULE_COVER_IMAGES } from '../lib/moduleAssets';

const MODULE_ROUTES = {
  phishing: '/modules/phishing',
  passwords: '/modules/passwords',
  mfa: '/modules/mfa',
  social: '/modules/social',
  safeBrowsing: '/modules/safe-browsing',
  incident: '/modules/incident'
};

const ORDER = ['phishing', 'passwords', 'mfa', 'social', 'safeBrowsing', 'incident'];

const TITLES = {
  phishing: 'Phishing Awareness',
  passwords: 'Password Security',
  mfa: 'Multi-Factor Auth',
  social: 'Social Engineering',
  safeBrowsing: 'Safe Browsing',
  incident: 'Incident Reporting'
};

function routeForModule(key) {
  return MODULE_ROUTES[key] || `/modules/${key}`;
}

function tierProgress(points) {
  if (points >= 120) return { pct: 100, next: null, label: 'Max tier reached' };
  const prev = points >= 80 ? 80 : points >= 40 ? 40 : 0;
  const next = points < 40 ? 40 : points < 80 ? 80 : 120;
  const span = Math.max(1, next - prev);
  const pct = Math.min(100, Math.round(((points - prev) / span) * 100));
  return { pct, next, label: `${Math.max(0, next - points)} XP to next rank` };
}

export default function Dashboard() {
  const { profile, points, level, completedCount, progress } = useProgress();
  const progressPercent = Math.round((completedCount / 6) * 100);
  const xp = useMemo(() => tierProgress(points), [points]);
  const levelNum = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 }[level] ?? 1;

  const isUnlocked = (key) => {
    const index = ORDER.indexOf(key);
    if (index === 0) return true;
    return progress.completed?.[ORDER[index - 1]] || false;
  };

  const nextModule = ORDER.map((key) => ({ key, title: TITLES[key] })).find(
    (m) => !progress.completed?.[m.key] && isUnlocked(m.key)
  );

  const badgesPreview = [
    { id: 'first', label: 'First win', icon: '🏆', earned: completedCount >= 1 },
    { id: 'half', label: 'Halfway', icon: '⚡', earned: completedCount >= 3 },
    { id: 'all', label: 'Champion', icon: '👑', earned: completedCount >= 6 },
  ];

  return (
    <div className="page-shell dashboard-pro">
      <div className="content-wrap dashboard-pro-inner">
        <header className="dashboard-pro-header">
          <div className="dashboard-pro-brand">
            <h1 className="dashboard-pro-title">Command center</h1>
            <p className="muted-text dashboard-pro-sub">Your CyberAware progression hub</p>
          </div>
          <div className="dashboard-pro-identity">
            <div className="dashboard-rank-ring" aria-hidden="true">
              <span className="dashboard-rank-ring-inner">{levelNum}</span>
            </div>
            <div>
              <p className="dashboard-pro-name">{profile?.name || 'Learner'}</p>
              <p className="muted-text dashboard-pro-rank">{level}</p>
            </div>
            <span className="dashboard-pro-avatar">{profile?.avatar || '🛡️'}</span>
          </div>
        </header>

        <div className="dashboard-pro-grid">
          <section className="main-card dashboard-pro-hero">
            <div className="dashboard-pro-hero-top">
              <div>
                <h2 className="dashboard-pro-hero-title">Continue your run</h2>
                <p className="muted-text">
                  {nextModule
                    ? `Next up: ${nextModule.title}. Clear missions in order to unlock the full path.`
                    : 'Path complete—review any module or polish your achievements.'}
                </p>
              </div>
              <div className="dashboard-pro-xp-pill">
                <span className="dashboard-pro-xp-value">{points}</span>
                <span className="dashboard-pro-xp-label">total XP</span>
              </div>
            </div>
            <div className="dashboard-pro-xp-bar-wrap">
              <div className="dashboard-pro-xp-bar-head">
                <span>Rank XP</span>
                <span className="muted-text">{xp.label}</span>
              </div>
              <div className="dashboard-pro-xp-track">
                <div className="dashboard-pro-xp-fill" style={{ width: `${xp.pct}%` }} />
              </div>
            </div>
            <div className="dashboard-pro-path">
              <div className="dashboard-pro-path-head">
                <span>Path progress</span>
                <span>
                  {completedCount}/6
                </span>
              </div>
              <div className="dashboard-pro-path-bar">
                <div className="dashboard-pro-path-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            <div className="dashboard-pro-hero-actions">
              <Link
                to={nextModule ? routeForModule(nextModule.key) : '/modules'}
                className="primary-btn dashboard-pro-cta"
              >
                {nextModule ? 'Launch next mission' : 'Open module map'}
              </Link>
              <Link to="/achievements" className="secondary-btn">
                Trophies
              </Link>
            </div>
          </section>

          <aside className="dashboard-pro-side">
            <div className="main-card dashboard-quest-card">
              <h3 className="dashboard-quest-title">Daily objective</h3>
              <p className="muted-text dashboard-quest-body">
                Complete one scenario + quiz block today to keep momentum. Streaks and bonus XP coming soon.
              </p>
              <span className="dashboard-quest-tag">Bonus +0 XP</span>
            </div>
            <div className="main-card dashboard-badge-strip">
              <h3 className="dashboard-quest-title">Badge shelf</h3>
              <div className="dashboard-badge-row">
                {badgesPreview.map((b) => (
                  <div
                    key={b.id}
                    className={`dashboard-badge-slot ${b.earned ? 'dashboard-badge-slot--on' : ''}`}
                    title={b.label}
                  >
                    <span aria-hidden="true">{b.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="main-card dashboard-mission-deck">
          <div className="dashboard-mission-head">
            <h3 className="dashboard-mission-title">Mission deck</h3>
            <Link to="/modules" className="ghost-btn">
              Full stack view →
            </Link>
          </div>
          <div className="dashboard-mission-grid">
            {ORDER.map((key) => {
              const done = Boolean(progress.completed?.[key]);
              const locked = !isUnlocked(key);
              return (
                <Link
                  key={key}
                  to={locked ? '/modules' : routeForModule(key)}
                  className={`dashboard-mission-tile ${done ? 'dashboard-mission-tile--done' : ''} ${
                    locked ? 'dashboard-mission-tile--locked' : ''
                  }`}
                >
                  <img src={MODULE_COVER_IMAGES[key]} alt="" className="dashboard-mission-art" width={56} height={56} />
                  <div className="dashboard-mission-meta">
                    <span className="dashboard-mission-name">{TITLES[key]}</span>
                    <span className="dashboard-mission-state">
                      {done ? 'Cleared' : locked ? 'Locked' : 'Available'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="dashboard-pro-footer">
          <Link to="/profile" className="ghost-btn">
            Profile
          </Link>
          <Link to="/modules" className="ghost-btn">
            Module stack
          </Link>
        </div>
      </div>
    </div>
  );
}
