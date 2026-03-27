import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-shell">
      <div className="content-wrap">
        <div className="hero-box">
          <p className="eyebrow">🎓 Cybersecurity Training Portal</p>
          <h1 className="hero-title">CyberAware</h1>
          <p className="hero-text">
            A professional cybersecurity awareness platform designed to help learners build safer online habits 
            through guided modules, realistic scenarios, quizzes, badges, and progress tracking.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/signup">
              Get Started Free
            </Link>
            <Link className="secondary-btn" to="/login">
              Log In
            </Link>
            <Link className="secondary-btn" to="/about">
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="features-grid" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="feature-card" style={{ background: 'white', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
            <h3>6 Interactive Modules</h3>
            <p className="muted-text">Learn phishing, passwords, MFA, social engineering, safe browsing, and incident reporting</p>
          </div>
          <div className="feature-card" style={{ background: 'white', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
            <h3>30+ Quiz Questions</h3>
            <p className="muted-text">Test your knowledge with detailed explanations for each answer</p>
          </div>
          <div className="feature-card" style={{ background: 'white', borderRadius: '16px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
            <h3>Earn Badges & Points</h3>
            <p className="muted-text">Track your progress and unlock achievements as you learn</p>
          </div>
        </div>
      </div>
    </div>
  );
}