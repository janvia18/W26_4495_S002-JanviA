/**
 * “Mission board” grid: filters, unlock state, and deep links into each Module* route.
 */
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { modulesData } from '../lib/modulesData';
import { getModuleCoverSrc } from '../lib/moduleAssets';

const ORDER = ['phishing', 'passwords', 'mfa', 'social', 'safeBrowsing', 'incident'];

const MODULE_TOPIC_EMOJI = {
  phishing: 'PH',
  passwords: 'PW',
  mfa: '2F',
  social: 'SE',
  safeBrowsing: 'WB',
  incident: 'IR',
};

const MODULE_TOPIC_BADGE = {
  phishing: 'Email & link safety',
  passwords: 'Credentials & managers',
  mfa: 'Extra verification layers',
  social: 'Human-targeted threats',
  safeBrowsing: 'Web & download hygiene',
  incident: 'Report & response',
};

const MODULE_DIFFICULTY = {
  phishing: 'Starter',
  passwords: 'Starter',
  mfa: 'Intermediate',
  social: 'Intermediate',
  safeBrowsing: 'Advanced',
  incident: 'Advanced',
};

export default function Modules() {
  const [flippedKey, setFlippedKey] = useState(null);
  const { progress, points, completedCount, level } = useProgress();
  const completed = progress.completed || {};

  const orderedModules = useMemo(() => ORDER.map((key) => modulesData.find((m) => m.key === key)).filter(Boolean), []);

  const isUnlocked = (key) => {
    const index = ORDER.indexOf(key);
    if (index <= 0) return true;
    return Boolean(completed[ORDER[index - 1]]);
  };

  // Drives card face state and CTA copy on the mission deck.
  const getStatus = (key) => {
    if (completed[key]) return 'completed';
    if (isUnlocked(key)) return 'available';
    return 'locked';
  };

  const nextModule = useMemo(() => {
    for (const key of ORDER) {
      if (!completed[key] && isUnlocked(key)) {
        return orderedModules.find((m) => m.key === key) || null;
      }
    }
    return null;
  }, [completed, orderedModules]);

  const completionPercent = Math.round((completedCount / ORDER.length) * 100);
  const pendingCount = ORDER.length - completedCount;
  const completedXp = orderedModules.reduce((sum, module) => (completed[module.key] ? sum + module.points : sum), 0);
  const stopFlip = (e) => e.stopPropagation();

  return (
    <div className="page-shell modules-page modules-page--grid">
      <div className="content-wrap content-wrap--modules">
        <header className="modules-page-header mc-header">
          <div>
            <p className="modules-page-kicker">Mission deck</p>
            <h1 className="page-title modules-page-title">Cyber card stack</h1>
            <p className="muted-text modules-page-lead mc-header-lead">
              Your modules are now a playable deck. Clear each card to reveal the next challenge.
            </p>
          </div>
          <div className="mc-header-actions">
            <span className="mc-level-pill">Rank: {level}</span>
            <Link to="/dashboard" className="ghost-btn">
              Back to dashboard
            </Link>
          </div>
        </header>

        <section className="mc-hero">
          <article className="main-card mc-next-card">
            <p className="mc-panel-kicker">Top card</p>
            {nextModule ? (
              <>
                <h2 className="mc-next-title">{nextModule.title}</h2>
                <p className="muted-text mc-next-copy">{nextModule.description}</p>
                <p className="mc-next-meta">
                  {MODULE_TOPIC_BADGE[nextModule.key]} - {nextModule.quiz.length} checks - +{nextModule.points} XP
                </p>
                <div className="mc-next-actions">
                  <Link to={nextModule.route} className="primary-btn">
                    Play next card
                  </Link>
                  <span className="mc-next-tag">Recommended</span>
                </div>
              </>
            ) : (
              <>
                <h2 className="mc-next-title">Deck completed</h2>
                <p className="muted-text mc-next-copy">
                  Every card is cleared. Review completed cards anytime and keep your skills sharp.
                </p>
                <div className="mc-next-actions">
                  <Link to="/achievements" className="secondary-btn">
                    View achievements
                  </Link>
                </div>
              </>
            )}
          </article>

          <article className="main-card mc-stats-card">
            <p className="mc-panel-kicker">Deck stats</p>
            <div className="mc-stats-grid">
              <div>
                <span className="mc-stat-label">Completion</span>
                <span className="mc-stat-value">{completionPercent}%</span>
              </div>
              <div>
                <span className="mc-stat-label">XP secured</span>
                <span className="mc-stat-value">{points}</span>
              </div>
              <div>
                <span className="mc-stat-label">Cards left</span>
                <span className="mc-stat-value">{pendingCount}</span>
              </div>
              <div>
                <span className="mc-stat-label">Campaign score</span>
                <span className="mc-stat-value">{completedXp}</span>
              </div>
            </div>
            <div className="mc-progress">
              <div className="mc-progress-head">
                <span>Deck completion</span>
                <span>
                  {completedCount}/{ORDER.length}
                </span>
              </div>
              <div className="mc-progress-track" aria-hidden="true">
                <div className="mc-progress-fill" style={{ width: `${completionPercent}%` }} />
              </div>
            </div>
          </article>
        </section>

        <section className="mc-map-board main-card mc-deck-board" aria-labelledby="missions-heading">
          <h2 id="missions-heading" className="visually-hidden">
            All modules
          </h2>
          <p className="mc-panel-kicker">Deck lineup</p>
          <p className="muted-text mc-map-sub">Cards stay in unlock order. No numbered markers, just the stack.</p>

          <div className="mc-deck-grid">
            {orderedModules.map((module) => {
              const status = getStatus(module.key);
              const isLocked = status === 'locked';
              const isCompleted = status === 'completed';
              const isNext = nextModule?.key === module.key;
              const coverSrc = getModuleCoverSrc(module.key);
              const isFlipped = flippedKey === module.key;

              return (
                <div
                  key={module.key}
                  className={`modules-deck-wrap modules-deck-wrap--${status} ${isNext ? 'modules-deck-wrap--next' : ''}`}
                >
                  <div
                    className={`module-flip-card module-flip-card--${status} ${isFlipped ? 'is-flipped' : ''}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setFlippedKey(isFlipped ? null : module.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setFlippedKey(isFlipped ? null : module.key);
                      }
                    }}
                  >
                    <div className="module-flip-inner">
                      <article className={`module-flip-face module-flip-front modules-mission-tile modules-mission-tile--${status}`}>
                        <div className="modules-mission-tile-cover">
                          {coverSrc ? (
                            <img src={coverSrc} alt="" className="modules-mission-tile-img" width={400} height={200} />
                          ) : (
                            <div className="modules-mission-tile-fallback" aria-hidden="true">
                              {MODULE_TOPIC_EMOJI[module.key] ?? 'MD'}
                            </div>
                          )}
                          <span className={`modules-mission-tile-ribbon modules-mission-tile-ribbon--${status}`}>
                            {isCompleted ? 'Cleared' : isLocked ? 'Locked' : 'Open'}
                          </span>
                        </div>

                        <div className="modules-mission-tile-body">
                          <div className="modules-mission-tile-head">
                            <span className="modules-mission-tile-emoji" aria-hidden="true">
                              {MODULE_TOPIC_EMOJI[module.key] ?? 'MD'}
                            </span>
                            <div>
                              <h3 className="modules-mission-tile-title">{module.title}</h3>
                              <p className="modules-mission-tile-topic">{MODULE_TOPIC_BADGE[module.key] ?? 'Learning module'}</p>
                            </div>
                          </div>

                          <p className="muted-text modules-mission-tile-desc">{module.description}</p>

                          <div className="mc-card-tags">
                            <span className="mc-card-tag">Difficulty: {MODULE_DIFFICULTY[module.key]}</span>
                            <span className="mc-card-tag">{module.quiz.length} checks</span>
                            <span className="mc-card-tag">+{module.points} XP</span>
                          </div>

                          <p className="module-flip-tap-hint muted-text">Tap to flip card</p>
                        </div>
                      </article>

                      <article className="module-flip-face module-flip-back">
                        <p className="module-flip-back-label">Mission briefing</p>
                        <h3 className="module-flip-title">{module.title}</h3>
                        <p className="module-flip-back-meta">
                          {MODULE_TOPIC_BADGE[module.key]} - {module.quiz.length} checks - +{module.points} XP
                        </p>
                        <p className="module-flip-back-meta">Difficulty: {MODULE_DIFFICULTY[module.key]}</p>
                        <div className={`module-flip-back-blur ${isLocked ? 'module-flip-back-blur--locked' : ''}`}>
                          {module.content?.slice(0, 3).map((point, idx) => (
                            <p key={`${module.key}-point-${idx}`} className="module-flip-blur-line">
                              {point}
                            </p>
                          ))}
                        </div>

                        <div className="module-flip-actions" onClick={stopFlip}>
                          {isCompleted && (
                            <Link to={module.route} className="secondary-btn module-flip-btn">
                              Review module
                            </Link>
                          )}
                          {!isLocked && !isCompleted && (
                            <Link to={module.route} className="primary-btn module-flip-btn">
                              Start module
                            </Link>
                          )}
                          {isNext && !isCompleted && <span className="modules-mission-next-tag">Recommended next</span>}
                          {isLocked && <p className="module-flip-locked muted-text">Complete previous module to unlock.</p>}
                        </div>
                        <p className="module-flip-tap-hint module-flip-tap-hint--back muted-text">Tap again to return</p>
                      </article>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
