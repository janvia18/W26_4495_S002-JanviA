import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { modulesData } from '../lib/modulesData';
import { getModuleCoverSrc } from '../lib/moduleAssets';

const ORDER = ['phishing', 'passwords', 'mfa', 'social', 'safeBrowsing', 'incident'];

const MODULE_TOPIC_EMOJI = {
  phishing: '📧',
  passwords: '🔐',
  mfa: '🔑',
  social: '🎯',
  safeBrowsing: '🌐',
  incident: '📋',
};

const MODULE_TOPIC_BADGE = {
  phishing: 'Email & link safety',
  passwords: 'Credentials & managers',
  mfa: 'Extra verification layers',
  social: 'Human-targeted threats',
  safeBrowsing: 'Web & download hygiene',
  incident: 'Report & response',
};

export default function Modules() {
  const { progress, points, completedCount } = useProgress();

  const orderedModules = useMemo(
    () => ORDER.map((key) => modulesData.find((m) => m.key === key)).filter(Boolean),
    []
  );

  const isUnlocked = (key) => {
    const index = ORDER.indexOf(key);
    if (index === 0) return true;
    return progress.completed?.[ORDER[index - 1]] || false;
  };

  const getStatus = (key) => {
    if (progress.completed?.[key]) return 'completed';
    if (isUnlocked(key)) return 'available';
    return 'locked';
  };

  const nextKey = useMemo(() => {
    for (const key of ORDER) {
      if (!progress.completed?.[key] && isUnlocked(key)) return key;
    }
    return null;
  }, [progress.completed]);

  return (
    <div className="page-shell modules-page modules-page--grid">
      <div className="content-wrap content-wrap--modules">
        <header className="modules-page-header">
          <div>
            <p className="modules-page-kicker">Learning path</p>
            <h1 className="page-title modules-page-title">Mission board</h1>
            <p className="muted-text modules-page-lead">
              Six missions stack like a deck of challenge cards—follow the orb trail up top, flip the next card open, and clear
              each scenario + quiz to unlock what’s underneath. XP and completion sync to your profile.
            </p>
            <p className="modules-page-meta">
              <strong>{points}</strong> XP · <strong>{completedCount}</strong>/6 cleared
            </p>
          </div>
          <Link to="/dashboard" className="ghost-btn">
            ← Dashboard
          </Link>
        </header>

        <section className="main-card modules-path-card" aria-labelledby="path-heading">
          <h2 id="path-heading" className="modules-path-heading">
            Your route
          </h2>
          <p className="muted-text modules-path-sub">Track where you are on the CyberAware path.</p>
          <div className="modules-path-rail" role="list" aria-label="Modules in order">
            {ORDER.map((key, i) => {
              const mod = modulesData.find((m) => m.key === key);
              const st = getStatus(key);
              const prevDone = i === 0 ? true : Boolean(progress.completed?.[ORDER[i - 1]]);
              return (
                <React.Fragment key={key}>
                  {i > 0 && (
                    <div
                      className={`modules-path-connector ${prevDone ? 'modules-path-connector--done' : ''}`}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className={`modules-path-node modules-path-orb modules-path-node--${st}`}
                    role="listitem"
                    title={mod?.title ?? key}
                  >
                    <span className="modules-path-orb-shine" aria-hidden="true" />
                    <span className="modules-path-orb-core">{st === 'completed' ? '✓' : i + 1}</span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </section>

        <section className="modules-mission-grid" aria-labelledby="missions-heading">
          <h2 id="missions-heading" className="visually-hidden">
            All modules
          </h2>
          {orderedModules.map((module, index) => {
            const status = getStatus(module.key);
            const isLocked = status === 'locked';
            const isCompleted = status === 'completed';
            const isNext = nextKey === module.key;
            const coverSrc = getModuleCoverSrc(module.key);

            return (
              <div
                key={module.key}
                className={`modules-deck-wrap modules-deck-wrap--${status} ${isNext ? 'modules-deck-wrap--next' : ''}`}
              >
                <span className="modules-deck-fan modules-deck-fan--back" aria-hidden="true" />
                <span className="modules-deck-fan modules-deck-fan--mid" aria-hidden="true" />
                <article
                  className={`modules-mission-tile modules-mission-tile--${status} ${isNext ? 'modules-mission-tile--next' : ''}`}
                >
                <div className="modules-mission-tile-cover">
                  {coverSrc ? (
                    <img src={coverSrc} alt="" className="modules-mission-tile-img" width={400} height={200} />
                  ) : (
                    <div className="modules-mission-tile-fallback" aria-hidden="true">
                      {MODULE_TOPIC_EMOJI[module.key] ?? '📚'}
                    </div>
                  )}
                  <span className="visually-hidden">Mission {index + 1}</span>
                  <div
                    className={`modules-collect-orb modules-collect-orb--${status}`}
                    aria-hidden="true"
                    title={`Mission ${index + 1}`}
                  >
                    <span className="modules-collect-orb-shine" />
                    <span className="modules-collect-orb-num">{index + 1}</span>
                  </div>
                  <span className={`modules-mission-tile-ribbon modules-mission-tile-ribbon--${status}`}>
                    {isCompleted ? 'Cleared' : isLocked ? 'Locked' : 'Open'}
                  </span>
                </div>
                <div className="modules-mission-tile-body">
                  <div className="modules-mission-tile-head">
                    <span className="modules-mission-tile-emoji" aria-hidden="true">
                      {MODULE_TOPIC_EMOJI[module.key] ?? '📚'}
                    </span>
                    <div>
                      <h3 className="modules-mission-tile-title">{module.title}</h3>
                      <p className="modules-mission-tile-topic">{MODULE_TOPIC_BADGE[module.key] ?? 'Learning module'}</p>
                    </div>
                  </div>
                  <p className="muted-text modules-mission-tile-desc">{module.description}</p>
                  <p className="modules-mission-tile-meta muted-text">
                    {module.quiz.length} quiz questions · {module.points} XP
                  </p>
                  <div className="modules-mission-tile-actions">
                    {isCompleted && (
                      <Link to={module.route} className="secondary-btn modules-mission-btn">
                        Review
                      </Link>
                    )}
                    {!isLocked && !isCompleted && (
                      <Link to={module.route} className="primary-btn modules-mission-btn">
                        Start mission
                      </Link>
                    )}
                    {isNext && !isCompleted && (
                      <span className="modules-mission-next-tag">Recommended next</span>
                    )}
                    {isLocked && (
                      <span className="modules-mission-locked-msg">Complete the previous module to unlock.</span>
                    )}
                  </div>
                </div>
              </article>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
