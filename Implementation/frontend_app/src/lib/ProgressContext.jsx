import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "./storage";

const ProgressContext = createContext(null);

const defaultProgress = {
  completed: {
    phishing: false,
    passwords: false,
    mfa: false,
    social: false,
    "safe-browsing": false,
    incident: false
  }
};

const defaultProfile = {
  name: "",
  organization: "",
  role: "",
  avatar: "🛡️"
};

export function ProgressProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(defaultProfile);
  const [progress, setProgress] = useState(defaultProgress);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = storage.get("cyberaware_user", null);
    const savedProfile = storage.get("cyberaware_profile", defaultProfile);
    const savedProgress = storage.get("cyberaware_progress", defaultProgress);
    const savedPoints = storage.get("cyberaware_points", 0);

    const normalizedProgress = {
      completed: {
        ...defaultProgress.completed,
        ...(savedProgress?.completed || {})
      }
    };

    setUser(savedUser);
    setProfile({ ...defaultProfile, ...(savedProfile || {}) });
    setProgress(normalizedProgress);
    setPoints(savedPoints || 0);
    setLoading(false);
  }, []);

  const login = (userData) => {
    storage.set("cyberaware_user", userData);
    setUser(userData);
  };

  const logout = () => {
    storage.remove("cyberaware_user");
    setUser(null);
  };

  const updateProfile = (profileData) => {
    const nextProfile = { ...profile, ...profileData };
    storage.set("cyberaware_profile", nextProfile);
    setProfile(nextProfile);
  };

  const completeModule = (moduleKey, earnedPoints = 20) => {
    const alreadyDone = progress.completed[moduleKey];

    const updatedProgress = {
      ...progress,
      completed: {
        ...progress.completed,
        [moduleKey]: true
      }
    };

    const updatedPoints = alreadyDone ? points : points + earnedPoints;

    storage.set("cyberaware_progress", updatedProgress);
    storage.set("cyberaware_points", updatedPoints);

    setProgress(updatedProgress);
    setPoints(updatedPoints);
  };

  const resetProgress = () => {
    storage.set("cyberaware_progress", defaultProgress);
    storage.set("cyberaware_points", 0);
    setProgress(defaultProgress);
    setPoints(0);
  };

  const level = useMemo(() => {
    if (points >= 120) return "Expert";
    if (points >= 80) return "Advanced";
    if (points >= 40) return "Intermediate";
    return "Beginner";
  }, [points]);

  const completedCount = useMemo(
    () => Object.values(progress.completed).filter(Boolean).length,
    [progress]
  );

  const value = {
    user,
    profile,
    progress,
    points,
    loading,
    level,
    completedCount,
    login,
    logout,
    updateProfile,
    completeModule,
    resetProgress
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
}