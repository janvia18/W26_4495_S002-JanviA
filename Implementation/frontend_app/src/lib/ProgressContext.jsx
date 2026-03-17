import React, { createContext, useContext, useEffect, useState } from "react";

const ProgressContext = createContext();

function safeJson(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function getStoredUser() {
  return safeJson(localStorage.getItem("cyberaware_user"), null);
}

function getStoredProfile() {
  return safeJson(localStorage.getItem("profile"), null);
}

function getStoredProgress() {
  return safeJson(localStorage.getItem("progress"), {
    completed: {
      phishing: false,
      password: false,
      mfa: false,
      social: false,
      incident: false,
    },
  });
}

function getStoredPoints() {
  return Number(localStorage.getItem("points") || 0);
}

export function ProgressProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(getStoredProgress());
  const [points, setPoints] = useState(getStoredPoints());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("cyberaware_logged_in") === "true";
    const savedUser = getStoredUser();
    const savedProfile = getStoredProfile();
    const savedProgress = getStoredProgress();
    const savedPoints = getStoredPoints();

    if (loggedIn && savedUser) {
      setUser(savedUser);
    } else {
      setUser(null);
    }

    setProfile(savedProfile);
    setProgress(savedProgress);
    setPoints(savedPoints);
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("cyberaware_user", JSON.stringify(userData));
    localStorage.setItem("cyberaware_logged_in", "true");
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("cyberaware_logged_in");
    setUser(null);
  };

  const updateProfile = (profileData) => {
    localStorage.setItem("profile", JSON.stringify(profileData));
    setProfile(profileData);
  };

  const completeModule = (moduleKey, earnedPoints = 10) => {
    const updatedProgress = {
      ...progress,
      completed: {
        ...progress.completed,
        [moduleKey]: true,
      },
    };

    let updatedPoints = points;

    if (!progress.completed[moduleKey]) {
      updatedPoints += earnedPoints;
    }

    localStorage.setItem("progress", JSON.stringify(updatedProgress));
    localStorage.setItem("points", String(updatedPoints));

    setProgress(updatedProgress);
    setPoints(updatedPoints);
  };

  const resetProgress = () => {
    const freshProgress = {
      completed: {
        phishing: false,
        password: false,
        mfa: false,
        social: false,
        incident: false,
      },
    };

    localStorage.setItem("progress", JSON.stringify(freshProgress));
    localStorage.setItem("points", "0");

    setProgress(freshProgress);
    setPoints(0);
  };

  return (
    <ProgressContext.Provider
      value={{
        user,
        profile,
        progress,
        points,
        loading,
        login,
        logout,
        updateProfile,
        completeModule,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }

  return context;
}