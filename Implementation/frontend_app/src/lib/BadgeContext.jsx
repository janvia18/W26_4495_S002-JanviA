import React, { createContext, useContext, useEffect, useState } from "react";

const BadgeContext = createContext();

function safeJson(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function getStoredBadges() {
  return safeJson(localStorage.getItem("badges"), []);
}

export function BadgeProvider({ children }) {
  const [badges, setBadges] = useState(getStoredBadges());
  const [showBadgeNotification, setShowBadgeNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem("badges", JSON.stringify(badges));
  }, [badges]);

  const unlockBadge = (badge) => {
    const exists = badges.some((b) => b.id === badge.id);
    if (exists) return;

    const updated = [...badges, badge];
    setBadges(updated);
    setShowBadgeNotification(badge);

    setTimeout(() => {
      setShowBadgeNotification(null);
    }, 3000);
  };

  const resetBadges = () => {
    localStorage.removeItem("badges");
    setBadges([]);
    setShowBadgeNotification(null);
  };

  return (
    <BadgeContext.Provider
      value={{
        badges,
        unlockBadge,
        resetBadges,
        showBadgeNotification,
      }}
    >
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadges() {
  const context = useContext(BadgeContext);

  if (!context) {
    throw new Error("useBadges must be used within a BadgeProvider");
  }

  return context;
}