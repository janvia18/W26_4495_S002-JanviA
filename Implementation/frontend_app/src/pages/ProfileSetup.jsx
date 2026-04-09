/**
 * Profile editor: display name, org/role fields, avatar emoji grid, and optional reset-progress control.
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useProgress } from '../lib/ProgressContext';
import { useBadges } from '../lib/BadgeContext';

const avatarOptions = [
  { emoji: '🛡️', label: 'Shield' },
  { emoji: '🔒', label: 'Lock' },
  { emoji: '🔑', label: 'Key' },
  { emoji: '⚡', label: 'Bolt' },
  { emoji: '⭐', label: 'Star' },
  { emoji: '🌙', label: 'Moon' },
  { emoji: '🔮', label: 'Orb' },
  { emoji: '🤖', label: 'Robot' },
  { emoji: '👾', label: 'Alien' },
  { emoji: '🚀', label: 'Rocket' },
  { emoji: '🦊', label: 'Fox' },
  { emoji: '🐱', label: 'Cat' },
  { emoji: '🐶', label: 'Dog' },
  { emoji: '🐼', label: 'Panda' },
  { emoji: '🦁', label: 'Lion' },
  { emoji: '🐯', label: 'Tiger' },
  { emoji: '🐻', label: 'Bear' },
  { emoji: '🐰', label: 'Rabbit' },
  { emoji: '🐹', label: 'Hamster' },
  { emoji: '🐭', label: 'Mouse' },
  { emoji: '🐧', label: 'Penguin' },
  { emoji: '🦉', label: 'Owl' },
  { emoji: '🐨', label: 'Koala' },
  { emoji: '🦅', label: 'Eagle' },
  { emoji: '🐺', label: 'Wolf' },
  { emoji: '🦄', label: 'Unicorn' },
  { emoji: '🐸', label: 'Frog' },
  { emoji: '🐢', label: 'Turtle' },
  { emoji: '🦋', label: 'Butterfly' },
  { emoji: '🐝', label: 'Bee' },
  { emoji: '🐙', label: 'Octopus' },
  { emoji: '🦈', label: 'Shark' },
  { emoji: '🐬', label: 'Dolphin' },
  { emoji: '🐳', label: 'Whale' },
  { emoji: '🦆', label: 'Duck' },
  { emoji: '🦩', label: 'Flamingo' },
  { emoji: '🦕', label: 'Dino' },
  { emoji: '🦖', label: 'T-Rex' },
  { emoji: '🐲', label: 'Dragon' },
  { emoji: '🎮', label: 'Gamer' },
  { emoji: '🎯', label: 'Target' },
  { emoji: '🧠', label: 'Brain' },
  { emoji: '💻', label: 'Laptop' },
  { emoji: '📚', label: 'Books' },
  { emoji: '🎓', label: 'Grad' },
  { emoji: '🥷', label: 'Ninja' },
  { emoji: '🧑‍🚀', label: 'Astronaut' },
  { emoji: '🧙', label: 'Wizard' },
];

export default function ProfileSetup() {
  const { profile, updateProfile, loading, user, points, level, completedCount } = useProgress();
  const { earnedBadges } = useBadges();
  const navigate = useNavigate();
  const location = useLocation();
  const isSetupFlow = location.pathname.includes('profile-setup');

  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState('🛡️');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setOrganization(profile.organization || '');
      setRole(profile.role || '');
      setAvatar(profile.avatar || '🛡️');
    }
  }, [profile]);

  useEffect(() => {
    if (!saveSuccess) return;
    const t = setTimeout(() => setSaveSuccess(false), 5000);
    return () => clearTimeout(t);
  }, [saveSuccess]);

  const displayName = name.trim() || 'Your name';
  const accountEmail = user?.email || '';

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    setSaving(true);
    setError('');
    setSaveSuccess(false);

    try {
      await updateProfile({
        name: name.trim(),
        organization: organization.trim(),
        role: role.trim(),
        avatar,
      });
      if (isSetupFlow) {
        navigate('/dashboard');
      } else {
        setSaveSuccess(true);
      }
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error('Profile save error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-shell profile-page-shell">
        <div className="content-wrap profile-page-inner">
          <div className="main-card profile-page-loading">
            <div className="engage-spinner profile-page-loading-spinner" aria-hidden="true" />
            <p className="profile-page-loading-text">Loading your profile…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell profile-page-shell">
      <div className="content-wrap profile-page-inner">
        <header className="profile-page-header">
          <div>
            <p className="profile-page-kicker">{isSetupFlow ? 'Welcome' : 'Account'}</p>
            <h1 className="page-title profile-page-title">
              {isSetupFlow ? 'Create your learner profile' : 'Your profile'}
            </h1>
            <p className="muted-text profile-page-lead">
              {isSetupFlow
                ? 'Pick a name and avatar—your progress, XP, and badges will show up across the app.'
                : 'Update how you appear in the header and on your dashboard. Learning stats stay tied to this account.'}
            </p>
          </div>
          <div className="profile-page-header-links">
            <Link to="/dashboard" className="ghost-btn">
              Dashboard
            </Link>
            {!isSetupFlow && (
              <Link to="/achievements" className="ghost-btn">
                Achievements
              </Link>
            )}
          </div>
        </header>

        {saveSuccess && (
          <div className="profile-save-banner" role="status">
            <span className="profile-save-banner-icon" aria-hidden="true">
              ✓
            </span>
            <span>Profile saved. Your changes are live.</span>
          </div>
        )}

        <div className="profile-page-layout">
          <aside className="profile-page-aside">
            <div className="main-card profile-preview-card">
              <p className="profile-preview-label">Live preview</p>
              <div className="profile-preview-hero">
                <span className="profile-preview-avatar" aria-hidden="true">
                  {avatar}
                </span>
                <div className="profile-preview-ring" aria-hidden="true" />
              </div>
              <h2 className="profile-preview-name">{displayName}</h2>
              <p className="profile-preview-rank">{level}</p>
              {(organization.trim() || role.trim()) && (
                <p className="profile-preview-meta muted-text">
                  {[role.trim(), organization.trim()].filter(Boolean).join(' · ')}
                </p>
              )}
              {accountEmail && (
                <p className="profile-preview-email muted-text" title={accountEmail}>
                  {accountEmail}
                </p>
              )}
            </div>

            <div className="main-card profile-stats-card">
              <p className="profile-stats-heading">Your progress</p>
              <ul className="profile-stats-list">
                <li>
                  <span className="profile-stats-value">{points}</span>
                  <span className="profile-stats-label">XP</span>
                </li>
                <li>
                  <span className="profile-stats-value">
                    {completedCount}/6
                  </span>
                  <span className="profile-stats-label">Modules</span>
                </li>
                <li>
                  <span className="profile-stats-value">{earnedBadges.length}</span>
                  <span className="profile-stats-label">Badges</span>
                </li>
              </ul>
              <Link to="/modules" className="profile-stats-link">
                Open module path →
              </Link>
            </div>
          </aside>

          <div className="main-card profile-form-card">
            <h2 className="profile-form-title">{isSetupFlow ? 'Details' : 'Edit details'}</h2>
            <p className="muted-text profile-form-intro">
              Name is required. Organization and role help you remember context—they are optional.
            </p>

            <form onSubmit={handleSave} className="profile-form-grid">
              <div className="profile-field">
                <label htmlFor="profile-name">Display name *</label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  required
                  disabled={saving}
                  autoComplete="name"
                />
              </div>
              <div className="profile-field">
                <label htmlFor="profile-org">Organization (optional)</label>
                <input
                  id="profile-org"
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Company, school, or team"
                  disabled={saving}
                />
              </div>
              <div className="profile-field">
                <label htmlFor="profile-role">Role (optional)</label>
                <input
                  id="profile-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Analyst, student, intern"
                  disabled={saving}
                />
              </div>

              <fieldset className="profile-avatar-fieldset">
                <legend className="profile-avatar-legend">Avatar</legend>
                <p className="muted-text profile-avatar-hint">Shown in the nav and on your dashboard card.</p>
                <div className="profile-avatar-grid">
                  {avatarOptions.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      className={`profile-avatar-btn ${avatar === option.emoji ? 'profile-avatar-btn--selected' : ''}`}
                      onClick={() => setAvatar(option.emoji)}
                      disabled={saving}
                      aria-pressed={avatar === option.emoji}
                      aria-label={`${option.label} ${option.emoji}`}
                    >
                      <span className="profile-avatar-btn-emoji">{option.emoji}</span>
                      <span className="profile-avatar-btn-label">{option.label}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {error && (
                <p className="error-text profile-form-error" role="alert">
                  {error}
                </p>
              )}

              <div className="profile-form-actions">
                <button className="primary-btn profile-form-submit" type="submit" disabled={saving}>
                  {saving ? 'Saving…' : isSetupFlow ? 'Save & go to dashboard' : 'Save profile'}
                </button>
                {isSetupFlow ? (
                  <button
                    className="ghost-btn"
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    disabled={saving}
                  >
                    Skip for now
                  </button>
                ) : (
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={() => navigate('/dashboard')}
                    disabled={saving}
                  >
                    Back to dashboard
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
