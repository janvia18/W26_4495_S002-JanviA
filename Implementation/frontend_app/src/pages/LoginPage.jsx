/**
 * Email/password sign-in; blocks submit when Supabase env vars are missing (dev-friendly error copy).
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { isSupabaseConfigured } from '../services/supabase';

export default function LoginPage() {
  const { login } = useProgress();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        setError(
          'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to frontend_app/.env and restart the dev server (see supabase/SUPABASE_SETUP.md).'
        );
        return;
      }
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell auth-engage-page">
      <div className="content-wrap auth-engage-wrap">
        <div className="auth-engage-grid">
          <aside className="auth-engage-aside" aria-hidden="true">
            <p className="auth-engage-aside-kicker">Player login</p>
            <h2 className="auth-engage-aside-title">Jump back into your security path</h2>
            <ul className="auth-engage-perks">
              <li>Pick up where you left off on missions</li>
              <li>XP and badges sync to your profile</li>
              <li>New modules unlock as you clear the path</li>
            </ul>
          </aside>
          <div className="main-card auth-engage-card">
            <p className="auth-engage-card-kicker">Welcome back</p>
            <h1 className="auth-engage-card-title">Sign in</h1>
            <p className="muted-text auth-engage-card-lead">Enter your credentials to open your dashboard.</p>
            {!isSupabaseConfigured() && (
              <p className="error-text" role="alert">
                Missing Supabase keys in <code>.env</code>. See <code>supabase/SUPABASE_SETUP.md</code>.
              </p>
            )}
            <form className="auth-engage-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <button type="submit" className="primary-btn auth-engage-submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <p className="auth-engage-footer muted-text">
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
