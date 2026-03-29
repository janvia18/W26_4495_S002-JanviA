import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, logout, loading } = useProgress();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const userName = profile?.name || "Learner";
  const userAvatar = profile?.avatar || "🛡️";

  if (loading) {
    return (
      <header className="topbar">
        <div className="topbar-left">
          <Link to="/" className="brand-pill">
            CyberAware <span className="brand-sparkle" aria-hidden="true">✨</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
          <Link to="/" className="brand-pill">
            CyberAware <span className="brand-sparkle" aria-hidden="true">✨</span>
          </Link>
        <nav className="topbar-links">
          <Link className={`nav-link ${isActive("/") ? "active" : ""}`} to="/">
            Home
          </Link>
          <Link className={`nav-link ${isActive("/about") ? "active" : ""}`} to="/about">
            About
          </Link>
          {user && (
            <>
              <Link className={`nav-link ${isActive("/dashboard") ? "active" : ""}`} to="/dashboard">
                Dashboard
              </Link>
              <Link className={`nav-link ${isActive("/modules") ? "active" : ""}`} to="/modules">
                Modules
              </Link>
              <Link className={`nav-link ${isActive("/profile") ? "active" : ""}`} to="/profile">
                Profile
              </Link>
              <Link className={`nav-link ${isActive("/achievements") ? "active" : ""}`} to="/achievements">
                Achievements
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="topbar-right">
        {user ? (
          <div className="user-menu">
            <div className="user-chip">
              <span className="avatar">{userAvatar}</span>
              <span>Hi, {userName}</span>
            </div>
            <button onClick={handleLogout} className="secondary-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="primary-btn" to="/signup">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}