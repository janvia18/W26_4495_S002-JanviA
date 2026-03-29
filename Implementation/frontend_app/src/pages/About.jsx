import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { MODULE_COVER_IMAGES } from '../lib/moduleAssets';

const MODULES = [
  {
    key: 'phishing',
    title: 'Phishing awareness',
    tag: 'Email & messages',
    summary:
      'Learn to read sender details, spot urgency tactics, and decide when a link or attachment is worth trusting—before you click.',
  },
  {
    key: 'passwords',
    title: 'Password hygiene',
    tag: 'Credentials',
    summary:
      'Understand length vs complexity, why reuse is risky, and how password managers and unique passwords reduce your exposure.',
  },
  {
    key: 'mfa',
    title: 'Multi-factor authentication',
    tag: 'Account protection',
    summary:
      'See how a second factor blocks most automated attacks and how to use approvals and authenticator apps safely.',
  },
  {
    key: 'social',
    title: 'Social engineering',
    tag: 'Human factors',
    summary:
      'Recognize pretexting, authority pressure, and “just this once” requests—whether by phone, chat, or in person.',
  },
  {
    key: 'safeBrowsing',
    title: 'Safe browsing',
    tag: 'Web & downloads',
    summary:
      'Use HTTPS, judge download sources, keep software updated, and avoid common traps on unfamiliar sites.',
  },
  {
    key: 'incident',
    title: 'Incident response',
    tag: 'When something goes wrong',
    summary:
      'Know what to document, who to notify, and how quick reporting limits damage for you and your organization.',
  },
];

const JOURNEY = [
  {
    step: '01',
    title: 'Learn the essentials',
    body: 'Each module opens with short, plain-language takeaways you can apply the same day—no jargon wall.',
  },
  {
    step: '02',
    title: 'Practice in a scenario',
    body: 'You make a decision in a realistic setup (for example, a suspicious message) and see why each choice matters.',
  },
  {
    step: '03',
    title: 'Prove it in the quiz',
    body: 'A focused knowledge check reinforces the lesson. You get immediate feedback on every answer.',
  },
  {
    step: '04',
    title: 'Earn XP and badges',
    body: 'Passing adds points to your profile, advances your rank, and can unlock achievements on the trophy shelf.',
  },
];

const PILLARS = [
  {
    icon: '🎓',
    title: 'Education first',
    text: 'Content is structured like a course path, not a one-off article—so skills compound as you move forward.',
  },
  {
    icon: '🛡️',
    title: 'Real-world slant',
    text: 'Scenarios mirror everyday situations: inboxes, browsers, and conversations—not abstract theory only.',
  },
  {
    icon: '📊',
    title: 'Visible progress',
    text: 'Dashboard, module order, and achievements make growth obvious and motivate you to finish the path.',
  },
];

const FAQ = [
  {
    q: 'Do I need technical background?',
    a: 'No. CyberAware is written for general learners. Terms are introduced when needed and kept practical.',
  },
  {
    q: 'How long does the full path take?',
    a: 'Most people finish a module in one sitting. All six together are designed to fit a few focused sessions—not a multi-week course.',
  },
  {
    q: 'What counts as passing a module?',
    a: 'You need to reach the quiz passing threshold (at least half of questions correct) after working through the lesson and scenario.',
  },
  {
    q: 'Is my progress saved?',
    a: 'When you are signed in, completion and points sync with your account so you can resume from the dashboard.',
  },
  {
    q: 'Can I revisit a finished module?',
    a: 'Yes. You can open any module again to refresh the material; your completion status stays recorded.',
  },
];

export default function About() {
  const { user } = useProgress();

  return (
    <div className="page-shell about-page">
      <div className="content-wrap about-wrap">
        <header className="about-hero">
          <div className="about-hero-top">
            <Link to="/" className="ghost-btn about-back">
              ← Home
            </Link>
            {user ? (
              <Link to="/dashboard" className="nav-inline muted-text">
                Dashboard →
              </Link>
            ) : (
              <Link to="/login" className="nav-inline muted-text">
                Sign in →
              </Link>
            )}
          </div>
          <p className="about-hero-kicker">About CyberAware</p>
          <h1 className="page-title about-hero-title">
            Security habits you can <span className="landing-gradient-text">actually use</span>
          </h1>
          <p className="about-hero-lead muted-text">
            CyberAware is a guided, game-inspired training path. You move through six missions—each with reading, a hands-on
            scenario, and a quiz—while your profile tracks XP, rank, and badges. The goal is simple: make safer choices online
            without turning security into a chore.
          </p>
          <div className="about-hero-actions">
            <Link to={user ? '/modules' : '/signup'} className="primary-btn">
              {user ? 'Open modules' : 'Create free account'}
            </Link>
            <Link to="/" className="ghost-btn">
              Back to landing
            </Link>
          </div>
        </header>

        <section className="about-mv-grid" aria-labelledby="mv-heading">
          <h2 id="mv-heading" className="visually-hidden">
            Mission and vision
          </h2>
          <article className="about-mv-card main-card">
            <h3 className="about-mv-label">Mission</h3>
            <p className="about-mv-text">
              Give every learner a clear, ordered path through core cybersecurity topics—with feedback at every step—so good
              habits stick beyond the browser tab.
            </p>
          </article>
          <article className="about-mv-card main-card about-mv-card--accent">
            <h3 className="about-mv-label">Vision</h3>
            <p className="about-mv-text">
              A world where “security training” feels like leveling up a skill tree: approachable for newcomers, still substantive
              for people who want structure and proof of progress.
            </p>
          </article>
        </section>

        <section className="about-section" aria-labelledby="pillars-heading">
          <h2 id="pillars-heading" className="landing-section-title">
            What shapes the experience
          </h2>
          <p className="landing-section-sub muted-text">
            Three ideas sit behind every screen you see in the app.
          </p>
          <div className="about-pillars">
            {PILLARS.map((p) => (
              <article key={p.title} className="about-pillar main-card">
                <span className="about-pillar-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <h3 className="about-pillar-title">{p.title}</h3>
                <p className="muted-text about-pillar-text">{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section about-journey" aria-labelledby="journey-heading">
          <h2 id="journey-heading" className="landing-section-title">
            How a module works
          </h2>
          <p className="landing-section-sub muted-text">
            Every mission follows the same rhythm so you always know what comes next.
          </p>
          <ol className="about-journey-list">
            {JOURNEY.map((item) => (
              <li key={item.step} className="about-journey-item main-card">
                <span className="about-journey-step" aria-hidden="true">
                  {item.step}
                </span>
                <div>
                  <h3 className="about-journey-title">{item.title}</h3>
                  <p className="muted-text about-journey-body">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-section" aria-labelledby="curriculum-heading">
          <h2 id="curriculum-heading" className="landing-section-title">
            Full curriculum
          </h2>
          <p className="landing-section-sub muted-text">
            Six topics, one recommended order. Later modules assume you have seen earlier ideas (for example, MFA after passwords).
          </p>
          <div className="about-curriculum">
            {MODULES.map((m, i) => (
              <article key={m.key} className="about-curriculum-card main-card">
                <div className="about-curriculum-head">
                  <span className="about-curriculum-index">{i + 1}</span>
                  <img src={MODULE_COVER_IMAGES[m.key]} alt="" className="about-curriculum-art" width={56} height={56} />
                  <div>
                    <h3 className="about-curriculum-title">{m.title}</h3>
                    <p className="about-curriculum-tag">{m.tag}</p>
                  </div>
                </div>
                <p className="muted-text about-curriculum-summary">{m.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section about-split" aria-labelledby="progress-heading">
          <div className="about-split-copy">
            <h2 id="progress-heading" className="landing-section-title about-split-title">
              Progress, XP, and achievements
            </h2>
            <p className="muted-text">
              Your dashboard shows total XP, rank tier, and how many of the six missions you have cleared. Points
              come from passing modules; ranks give you a quick sense of how far you have moved along the path.
            </p>
            <p className="muted-text">
              The Achievements page tracks badges such as your first completion, halfway through the path, finishing all six, and
              hitting high XP milestones—so long-term goals stay visible next to daily learning.
            </p>
            <ul className="about-bullet-list">
              <li>Unlock-style module list: complete one step to open the next focus area.</li>
              <li>Scenario feedback explains the safer choice—not just “wrong answer.”</li>
              <li>Profile and avatar personalize the experience after signup.</li>
            </ul>
          </div>
          <aside className="about-split-aside main-card" aria-label="Quick facts">
            <h3 className="about-aside-title">At a glance</h3>
            <dl className="about-facts">
              <div>
                <dt>Missions</dt>
                <dd>6</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Lesson → scenario → quiz</dd>
              </div>
              <div>
                <dt>Passing</dt>
                <dd>Majority correct on quiz</dd>
              </div>
              <div>
                <dt>Extras</dt>
                <dd>XP, ranks, badges</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="about-section about-faq-section" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="landing-section-title">
            Frequently asked questions
          </h2>
          <p className="landing-section-sub muted-text">Straight answers before you commit to the path.</p>
          <div className="about-faq-list">
            {FAQ.map((item) => (
              <details key={item.q} className="about-faq-item main-card">
                <summary className="about-faq-q">{item.q}</summary>
                <p className="muted-text about-faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="about-footer main-card">
          <h2 className="about-footer-title">Ready to start?</h2>
          <p className="muted-text about-footer-lead">
            Jump in from the home page or go straight to signup. If you already have an account, your dashboard remembers where you
            left off.
          </p>
          <div className="about-footer-actions">
            <Link to={user ? '/modules' : '/signup'} className="primary-btn">
              {user ? 'Continue modules' : 'Get started'}
            </Link>
            <Link to="/" className="ghost-btn">
              Home
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
