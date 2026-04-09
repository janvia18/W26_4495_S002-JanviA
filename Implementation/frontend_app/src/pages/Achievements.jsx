/**
 * Badges gallery: static catalog + progress bars from completedCount/points vs useBadges earned set.
 */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { useBadges } from '../lib/BadgeContext';

const ALL_BADGES = [
  { id: 'first_module', title: 'First Win', description: 'Cleared your opening mission', icon: '🏆', requirement: 'Complete 1 module' },
  { id: 'halfway_hero', title: 'Halfway Hero', description: 'Half the path behind you', icon: '⚡', requirement: 'Complete 3 modules' },
  { id: 'champion', title: 'Champion', description: 'Full CyberAware path complete', icon: '👑', requirement: 'Complete all 6 modules' },
  { id: 'expert', title: 'Security Expert', description: 'Elite XP total', icon: '🎓', requirement: 'Reach 120 points' },
];

/** How close the learner is to each badge’s numeric requirement (for the “in progress” UI). */
function badgeProgressPercent(badge, completedCount, points) {
  if (badge.id === 'first_module') return Math.min(100, (completedCount / 1) * 100);
  if (badge.id === 'halfway_hero') return Math.min(100, (completedCount / 3) * 100);
  if (badge.id === 'champion') return Math.min(100, (completedCount / 6) * 100);
  if (badge.id === 'expert') return Math.min(100, (points / 120) * 100);
  return 0;
}

export default function Achievements() {
  const { points, completedCount, level, profile } = useProgress();
  const { earnedBadges } = useBadges();

  const earnedIds = useMemo(() => new Set(earnedBadges.map((b) => b.id)), [earnedBadges]);
  const isEarned = (id) => earnedIds.has(id);

  const sortedBadges = useMemo(() => {
    return [...ALL_BADGES].sort((a, b) => {
      const ea = earnedIds.has(a.id);
      const eb = earnedIds.has(b.id);
      if (ea !== eb) return ea ? -1 : 1;
      if (ea) return 0;
      const pa = badgeProgressPercent(a, completedCount, points);
      const pb = badgeProgressPercent(b, completedCount, points);
      return pb - pa;
    });
  }, [earnedIds, completedCount, points]);

  const earnedList = ALL_BADGES.filter((b) => earnedIds.has(b.id));

  const nextHint = useMemo(() => {
    const locked = ALL_BADGES.filter((b) => !earnedIds.has(b.id));
    if (!locked.length) return null;
    let best = locked[0];
    let bestPct = badgeProgressPercent(best, completedCount, points);
    for (let i = 1; i < locked.length; i++) {
      const b = locked[i];
      const p = badgeProgressPercent(b, completedCount, points);
      if (p > bestPct) {
        best = b;
        bestPct = p;
      }
    }
    return { badge: best, pct: Math.round(bestPct) };
  }, [earnedIds, completedCount, points]);

  const allEarned = earnedList.length === ALL_BADGES.length;

  return (
    <div className="page-shell achievements-page">
      <div className="content-wrap achievements-page-inner">
        <header className="achievements-page-top">
          <div className="achievements-page-top-copy">
            <p className="achievements-page-kicker">Trophy shelf</p>
            <h1 className="page-title achievements-page-title">
              <span className="achievements-page-title-gradient">Achievements</span>
            </h1>
            <p className="muted-text achievements-page-lead">
              Every badge syncs to your profile. Finish missions and stack XP to fill the shelf.
            </p>
          </div>
          <div className="achievements-page-top-actions">
            <Link to="/dashboard" className="ghost-btn">
              Dashboard
            </Link>
            <Link to="/modules" className="primary-btn achievements-page-cta-modules">
              Continue missions
            </Link>
          </div>
        </header>

        <section className="achievements-hero main-card" aria-labelledby="achievements-hero-heading">
          <div className="achievements-hero-visual" aria-hidden="true">
            <span className="achievements-hero-avatar">{profile?.avatar || '🛡️'}</span>
            <div className="achievements-hero-ring" />
          </div>
          <div className="achievements-hero-body">
            <h2 id="achievements-hero-heading" className="achievements-hero-heading">
              {profile?.name || 'Learner'} · <span className="achievements-hero-rank">{level}</span>
            </h2>
            <p className="achievements-hero-sub muted-text">
              {allEarned
                ? 'You have unlocked every milestone badge. Keep sharpening skills in any module.'
                : nextHint
                  ? `Closest unlock: ${nextHint.badge.title} — about ${nextHint.pct}% of the way there.`
                  : 'Complete your first module to earn your first badge.'}
            </p>
            <dl className="achievements-hero-stats">
              <div className="achievements-hero-stat">
                <dt>Badges</dt>
                <dd>
                  {earnedList.length}/{ALL_BADGES.length}
                </dd>
              </div>
              <div className="achievements-hero-stat">
                <dt>Missions</dt>
                <dd>{completedCount}/6</dd>
              </div>
              <div className="achievements-hero-stat">
                <dt>XP</dt>
                <dd>{points}</dd>
              </div>
            </dl>
          </div>
        </section>

        {earnedList.length > 0 && (
          <section className="achievements-showcase" aria-labelledby="showcase-heading">
            <h2 id="showcase-heading" className="achievements-section-title">
              Unlocked ({earnedList.length})
            </h2>
            <ul className="achievements-showcase-list">
              {earnedList.map((badge) => (
                <li key={badge.id} className="achievements-showcase-chip">
                  <span className="achievements-showcase-emoji" aria-hidden="true">
                    {badge.icon}
                  </span>
                  <span className="achievements-showcase-name">{badge.title}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="achievements-catalog" aria-labelledby="catalog-heading">
          <div className="achievements-catalog-head">
            <h2 id="catalog-heading" className="achievements-section-title">
              All milestones
            </h2>
            <p className="achievements-catalog-sub muted-text">Earned badges glow; others show your progress.</p>
          </div>
          <div className="achievements-tile-grid">
            {sortedBadges.map((badge) => {
              const earned = isEarned(badge.id);
              const pct = earned ? 100 : Math.round(badgeProgressPercent(badge, completedCount, points));

              return (
                <article
                  key={badge.id}
                  className={`achievements-tile-v2 ${earned ? 'achievements-tile-v2--earned' : 'achievements-tile-v2--locked'}`}
                >
                  <div className="achievements-tile-v2-glow" aria-hidden="true" />
                  <div className="achievements-tile-v2-top">
                    <div className="achievements-tile-v2-icon-wrap">
                      <span className="achievements-tile-v2-icon">{badge.icon}</span>
                      {earned && (
                        <span className="achievements-tile-v2-check" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="achievements-tile-v2-pct" aria-label={earned ? 'Complete' : `${pct} percent progress`}>
                      {earned ? 'Done' : `${pct}%`}
                    </span>
                  </div>
                  <h3 className="achievements-tile-v2-title">{badge.title}</h3>
                  <p className="achievements-tile-v2-desc muted-text">{badge.description}</p>
                  {!earned && (
                    <div className="achievements-tile-v2-progress">
                      <div className="achievements-tile-v2-track">
                        <div className="achievements-tile-v2-fill" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="achievements-tile-v2-req">{badge.requirement}</span>
                    </div>
                  )}
                  {earned && <p className="achievements-tile-v2-earned">Unlocked · saved to profile</p>}
                </article>
              );
            })}
          </div>
        </section>

        <footer className="achievements-page-footer main-card">
          <p className="achievements-page-footer-text muted-text">
            Badges award when you cross each threshold while signed in. Retake modules anytime—your trophies stay earned.
          </p>
          <div className="achievements-page-footer-actions">
            <Link to="/modules" className="primary-btn">
              Open module path
            </Link>
            <Link to="/dashboard" className="ghost-btn">
              Back to dashboard
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
