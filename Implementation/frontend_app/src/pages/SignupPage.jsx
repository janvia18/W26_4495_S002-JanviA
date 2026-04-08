import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { isSupabaseConfigured } from '../services/supabase';

export default function SignupPage() {
  const { signup } = useProgress();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Please complete all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        setError(
          'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to frontend_app/.env and restart the dev server (see supabase/SUPABASE_SETUP.md).'
        );
        return;
      }
      await signup(email, password);
      navigate('/profile-setup');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell auth-engage-page">
      <div className="content-wrap auth-engage-wrap">
        <div className="auth-engage-grid">
          <aside className="auth-engage-aside" aria-hidden="true">
            <p className="auth-engage-aside-kicker">New player</p>
            <h2 className="auth-engage-aside-title">Start earning XP from day one</h2>
            <ul className="auth-engage-perks">
              <li>Six guided missions with scenarios + quizzes</li>
              <li>Levels, points, and achievement badges</li>
              <li>Profile & avatar to make it yours</li>
            </ul>
          </aside>
          <div className="main-card auth-engage-card">
            <p className="auth-engage-card-kicker">Join CyberAware</p>
            <h1 className="auth-engage-card-title">Create account</h1>
            <p className="muted-text auth-engage-card-lead">Takes under a minute—then you choose your learner profile.</p>
            {!isSupabaseConfigured() && (
              <p className="error-text" role="alert">
                Missing Supabase keys in <code>.env</code>. See <code>supabase/SUPABASE_SETUP.md</code>.
              </p>
            )}
            <form className="auth-engage-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="signup-email">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
              <div>
                <label htmlFor="signup-confirm">Confirm password</label>
                <input
                  id="signup-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <button type="submit" className="primary-btn auth-engage-submit" disabled={loading}>
                {loading ? 'Creating…' : 'Start my path'}
              </button>
            </form>
            <p className="auth-engage-footer muted-text">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
