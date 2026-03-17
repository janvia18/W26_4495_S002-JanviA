import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProgressProvider, useProgress } from "./lib/ProgressContext";
import { BadgeProvider, useBadges } from "./lib/BadgeContext";
import BadgeNotification from "./components/BadgeNotification";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import Dashboard from "./pages/Dashboard";
import ModulePhishing from "./pages/ModulePhishing";
import ModulePasswords from "./pages/ModulePasswords";
import ModuleMFA from "./pages/ModuleMFA";
import ModuleIncident from "./pages/ModuleIncident";
import ModuleSocial from "./pages/ModuleSocial";
import Modules from "./pages/Modules";
import ProfileSetup from "./pages/ProfileSetup";
import Progress from "./pages/progress";
import Achievements from "./pages/Achievements";
import Home from "./pages/Home";
import About from "./pages/About";

import "./App.css";

function PrivateRoute({ children }) {
  const { user, loading } = useProgress();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const { showBadgeNotification } = useBadges();
  const [currentBadge, setCurrentBadge] = useState(null);

  useEffect(() => {
    if (showBadgeNotification) {
      setCurrentBadge(showBadgeNotification);
    }
  }, [showBadgeNotification]);

  return (
    <>
      <BadgeNotification
        badge={currentBadge}
        onClose={() => setCurrentBadge(null)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/modules"
          element={
            <PrivateRoute>
              <Modules />
            </PrivateRoute>
          }
        />

        <Route
          path="/achievements"
          element={
            <PrivateRoute>
              <Achievements />
            </PrivateRoute>
          }
        />

        <Route
          path="/modules/phishing"
          element={
            <PrivateRoute>
              <ModulePhishing />
            </PrivateRoute>
          }
        />

        <Route
          path="/modules/passwords"
          element={
            <PrivateRoute>
              <ModulePasswords />
            </PrivateRoute>
          }
        />

        <Route
          path="/modules/mfa"
          element={
            <PrivateRoute>
              <ModuleMFA />
            </PrivateRoute>
          }
        />

        <Route
          path="/modules/social"
          element={
            <PrivateRoute>
              <ModuleSocial />
            </PrivateRoute>
          }
        />

        <Route
          path="/modules/incident"
          element={
            <PrivateRoute>
              <ModuleIncident />
            </PrivateRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <Progress />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile-setup"
          element={
            <PrivateRoute>
              <ProfileSetup />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <ProgressProvider>
        <BadgeProvider>
          <div className="App">
            <AppContent />
          </div>
        </BadgeProvider>
      </ProgressProvider>
    </Router>
  );
}

export default App;