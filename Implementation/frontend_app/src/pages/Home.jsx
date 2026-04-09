/**
 * Marketing landing: hero, module previews, and different CTAs for guests vs signed-in learners.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import reactLogo from '../assets/react.svg';
import { MODULE_COVER_IMAGES } from '../lib/moduleAssets';

const MODULE_PREVIEW = [
  { key: 'phishing', title: 'Phishing', label: 'Email safety' },
  { key: 'passwords', title: 'Passwords', label: 'Strong credentials' },
  { key: 'mfa', title: 'MFA', label: 'Extra factors' },
  { key: 'social', title: 'Social eng.', label: 'Trust & urgency' },
  { key: 'safeBrowsing', title: 'Browsing', label: 'Safe web use' },
  { key: 'incident', title: 'Incidents', label: 'Report & respond' },
];

export default function Home() {
  const { user, points, completedCount, level } = useProgress();

  return (
    <div className="page-shell landing-page">
      <div className="content-wrap landing-wrap">
        <section className="landing-hero">
          <div className="landing-hero-grid">
            <div className="landing-hero-copy">
              <p className="landing-quest-pill">
                <span className="landing-quest-dot" aria-hidden="true" />
                Security awareness quest path
              </p>
              <h1 className="landing-hero-title">
                Level up your digital defense with <span className="landing-gradient-text">CyberAware</span>
              </h1>
              <p className="landing-hero-lead muted-text">
                A structured, game-style path: learn the concept, face a scenario, pass the knowledge check—earn points,
                climb tiers, and unlock achievements as you go.
              </p>
              <div className="landing-hero-actions">
                <Link to={user ? '/dashboard' : '/signup'} className="primary-btn landing-cta-primary">
                  {user ? 'Open dashboard' : 'Start your run'}
                </Link>
                <Link to="/about" className="ghost-btn">
                  About the platform
                </Link>
              </div>
              {user && (
                <div className="landing-live-stats">
                  <div className="landing-stat-chip">
                    <span className="landing-stat-value">{points}</span>
                    <span className="landing-stat-label">XP points</span>
                  </div>
                  <div className="landing-stat-chip">
                    <span className="landing-stat-value">{completedCount}/6</span>
                    <span className="landing-stat-label">Modules cleared</span>
                  </div>
                  <div className="landing-stat-chip">
                    <span className="landing-stat-value">{level}</span>
                    <span className="landing-stat-label">Rank</span>
                  </div>
                </div>
              )}
            </div>
            <div className="landing-hero-visual" aria-hidden="true">
              <div className="landing-hero-card">
                <img src={reactLogo} alt="" className="landing-react-mark" width={56} height={56} />
                <p className="landing-hero-card-title">Your progress board</p>
                <div className="landing-mini-xp">
                  <span>Path progress</span>
                  <div className="landing-mini-bar">
                    <div className="landing-mini-fill" style={{ width: user ? `${Math.round((completedCount / 6) * 100)}%` : '12%' }} />
                  </div>
                </div>
                <ul className="landing-mini-checks">
                  <li>6 themed missions</li>
                  <li>Scenario + quiz each</li>
                  <li>Badges at milestones</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-tracks" aria-labelledby="tracks-heading">
          <h2 id="tracks-heading" className="landing-section-title">
            Mission lineup
          </h2>
          <p className="landing-section-sub muted-text">Each track has its own cover art and unlock order on the path.</p>
          <div className="landing-track-grid">
            {MODULE_PREVIEW.map(({ key, title, label }) => (
              <div key={key} className="landing-track-card">
                <img src={MODULE_COVER_IMAGES[key]} alt="" className="landing-track-art" width={64} height={64} />
                <div>
                  <h3 className="landing-track-title">{title}</h3>
                  <p className="landing-track-label muted-text">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-loops">
          <h2 className="landing-section-title">Why it feels like a game</h2>
          <div className="landing-loop-grid">
            <article className="landing-loop-card">
              <span className="landing-loop-icon" aria-hidden="true">⚡</span>
              <h3>Earn XP</h3>
              <p className="muted-text">Points for every module you clear cleanly—watch your tier rise from Beginner to Expert.</p>
            </article>
            <article className="landing-loop-card">
              <span className="landing-loop-icon" aria-hidden="true">🎯</span>
              <h3>Clear objectives</h3>
              <p className="muted-text">Read, decide in a scenario, then prove it in a short assessment with instant feedback.</p>
            </article>
            <article className="landing-loop-card">
              <span className="landing-loop-icon" aria-hidden="true">🏅</span>
              <h3>Collect badges</h3>
              <p className="muted-text">Milestone rewards for first completion, halfway progress, full path, and high scores.</p>
            </article>
          </div>
        </section>

        <section className="landing-home-cta main-card" aria-labelledby="home-cta-heading">
          <h2 id="home-cta-heading" className="landing-section-title landing-home-cta-title">
            Want the full story?
          </h2>
          <p className="muted-text landing-home-cta-lead">
            Read how CyberAware is built, what you will learn in each mission, and how XP and badges work—on a dedicated About page.
          </p>
          <div className="landing-home-cta-actions">
            <Link to="/about" className="primary-btn">
              Explore About
            </Link>
            <Link to={user ? '/dashboard' : '/signup'} className="ghost-btn">
              {user ? 'Back to dashboard' : 'Start learning'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
