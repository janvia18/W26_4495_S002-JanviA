import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider, useProgress } from './lib/ProgressContext';
import { BadgeProvider } from './lib/BadgeContext';
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
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/modules" element={<PrivateRoute><Modules /></PrivateRoute>} />
      <Route path="/profile-setup" element={<PrivateRoute><ProfileSetup /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfileSetup /></PrivateRoute>} />
      <Route path="/achievements" element={<PrivateRoute><Achievements /></PrivateRoute>} />
      <Route path="/modules/phishing" element={<PrivateRoute><ModulePhishing /></PrivateRoute>} />
      <Route path="/modules/passwords" element={<PrivateRoute><ModulePasswords /></PrivateRoute>} />
      <Route path="/modules/mfa" element={<PrivateRoute><ModuleMFA /></PrivateRoute>} />
      <Route path="/modules/social" element={<PrivateRoute><ModuleSocial /></PrivateRoute>} />
      <Route path="/modules/safe-browsing" element={<PrivateRoute><ModuleSafeBrowsing /></PrivateRoute>} />
      <Route path="/modules/incident" element={<PrivateRoute><ModuleIncident /></PrivateRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <ProgressProvider>
      <BadgeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </BadgeProvider>
    </ProgressProvider>
  );
}

export default App;