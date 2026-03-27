import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./services/supabase";

import { ProgressProvider } from "./lib/ProgressContext";
import { BadgeProvider } from "./lib/BadgeContext";

import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModulePhishing from "./pages/ModulePhishing";
import ModulePasswords from "./pages/ModulePasswords";
import ModuleMFA from "./pages/ModuleMFA";
import ModuleIncident from "./pages/ModuleIncident";
import ModuleSafeBrowsing from "./pages/ModuleSafeBrowsing";
import ModuleSocial from "./pages/ModuleSocial";
import ProfileSetup from "./pages/ProfileSetup";
import Achievements from "./pages/Achievements";

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ user, children }) {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function AppRoutes() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setUser(session?.user ?? null);
      setAuthLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (authLoading) {
    return (
      <div className="page-shell">
        <div className="content-wrap">
          <div className="auth-card">
            <h1 className="page-title">Loading CyberAware...</h1>
            <p className="muted-text">
              Preparing your secure learning space.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/login"
        element={
          <PublicRoute user={user}>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute user={user}>
            <SignupPage />
          </PublicRoute>
        }
      />

      <Route
        path="/profile-setup"
        element={
          <ProtectedRoute user={user}>
            <ProfileSetup />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/modules"
        element={
          <ProtectedRoute user={user}>
            <Modules />
          </ProtectedRoute>
        }
      />

      <Route
        path="/module/phishing"
        element={
          <ProtectedRoute user={user}>
            <ModulePhishing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/module/passwords"
        element={
          <ProtectedRoute user={user}>
            <ModulePasswords />
          </ProtectedRoute>
        }
      />

      <Route
        path="/module/mfa"
        element={
          <ProtectedRoute user={user}>
            <ModuleMFA />
          </ProtectedRoute>
        }
      />

      <Route
        path="/module/incident"
        element={
          <ProtectedRoute user={user}>
            <ModuleIncident />
          </ProtectedRoute>
        }
      />

      <Route
        path="/module/safe-browsing"
        element={
          <ProtectedRoute user={user}>
            <ModuleSafeBrowsing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/module/social"
        element={
          <ProtectedRoute user={user}>
            <ModuleSocial />
          </ProtectedRoute>
        }
      />

      <Route
        path="/achievements"
        element={
          <ProtectedRoute user={user}>
            <Achievements />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <BadgeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </BadgeProvider>
    </ProgressProvider>
  );
}