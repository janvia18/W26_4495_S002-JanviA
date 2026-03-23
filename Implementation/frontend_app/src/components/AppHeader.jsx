import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useProgress } from "../lib/ProgressContext";

export default function AppHeader() {
  const location = useLocation();
  const { profile, user } = useProgress();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link to="/" className="brand-pill">
          CyberAware ✨
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
              <Link className={`nav-link ${isActive("/profile-setup") ? "active" : ""}`} to="/profile-setup">
                Profile
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="topbar-right">
        {user ? (
          <div className="user-chip">
            <span>{profile.avatar || "🛡️"}</span>
            <span>Hi, {profile.name || "Learner"}</span>
          </div>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="primary-btn" to="/signup">
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}