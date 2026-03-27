import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import BadgeNotification from './components/BadgeNotification';
import { BadgeProvider, useBadges } from './lib/BadgeContext';
import { ProgressProvider, useProgress } from './lib/ProgressContext';
import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import ProfileSetup from './pages/ProfileSetup';
import Achievements from './pages/Achievements';
import ModulePhishing from './pages/ModulePhishing';
import ModulePasswords from './pages/ModulePasswords';
import ModuleMFA from './pages/ModuleMFA';
import ModuleSocial from './pages/ModuleSocial';
import ModuleSafeBrowsing from './pages/ModuleSafeBrowsing';
import ModuleIncident from './pages/ModuleIncident';

function PrivateRoute({ children }) {
  const { user, loading } = useProgress();
  
  if (loading) {
    return (
      <div className="page-shell">
        <div className="content-wrap">
          <div className="main-card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
}

function AppContentWithBadges() {
  const { showBadgeNotification, clearBadgeNotification } = useBadges();
  const [currentBadge, setCurrentBadge] = useState(null);

  useEffect(() => {
    if (showBadgeNotification) {
      setCurrentBadge(showBadgeNotification);
      const timer = setTimeout(() => {
        setCurrentBadge(null);
        clearBadgeNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showBadgeNotification, clearBadgeNotification]);

  const handleCloseBadge = () => {
    setCurrentBadge(null);
    clearBadgeNotification();
  };

  return (
    <>
      <BadgeNotification badge={currentBadge} onClose={handleCloseBadge} />
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/modules" element={
          <PrivateRoute>
            <Modules />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfileSetup />
          </PrivateRoute>
        } />
        <Route path="/achievements" element={
          <PrivateRoute>
            <Achievements />
          </PrivateRoute>
        } />
        <Route path="/modules/phishing" element={
          <PrivateRoute>
            <ModulePhishing />
          </PrivateRoute>
        } />
        <Route path="/modules/passwords" element={
          <PrivateRoute>
            <ModulePasswords />
          </PrivateRoute>
        } />
        <Route path="/modules/mfa" element={
          <PrivateRoute>
            <ModuleMFA />
          </PrivateRoute>
        } />
        <Route path="/modules/social" element={
          <PrivateRoute>
            <ModuleSocial />
          </PrivateRoute>
        } />
        <Route path="/modules/safe-browsing" element={
          <PrivateRoute>
            <ModuleSafeBrowsing />
          </PrivateRoute>
        } />
        <Route path="/modules/incident" element={
          <PrivateRoute>
            <ModuleIncident />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ProgressProvider>
      <BadgeProvider>
        <AppContentWithBadges />
      </BadgeProvider>
    </ProgressProvider>
  );
}

export default App;