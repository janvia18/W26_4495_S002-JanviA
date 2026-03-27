import React, { createContext, useContext, useState } from "react";

const BadgeContext = createContext();

export function BadgeProvider({ children }) {
  const [showBadgeNotification, setShowBadgeNotification] = useState(null);
  const clearBadgeNotification = () => setShowBadgeNotification(null);

  const value = {
    earnedBadges: [],
    showBadgeNotification,
    clearBadgeNotification
  };

  return React.createElement(BadgeContext.Provider, { value }, children);
}

export function useBadges() {
  const context = useContext(BadgeContext);
  if (!context) throw new Error("useBadges must be used within BadgeProvider");
  return context;
}