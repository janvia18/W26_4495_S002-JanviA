import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useProgress } from "./ProgressContext";

const BadgeContext = createContext(null);

const badgeDefinitions = [
  {
    id: "first-module",
    title: "First Win",
    description: "Completed your first module.",
    unlocked: (completedCount) => completedCount >= 1,
  },
  {
    id: "halfway",
    title: "Halfway Hero",
    description: "Completed 3 modules.",
    unlocked: (completedCount) => completedCount >= 3,
  },
  {
    id: "all-modules",
    title: "CyberAware Champion",
    description: "Completed all 6 modules.",
    unlocked: (completedCount) => completedCount >= 6,
  },
];

export function BadgeProvider({ children }) {
  const { completedCount } = useProgress();

  const [earnedBadges, setEarnedBadges] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cyberaware_badges") || "[]");
    } catch {
      return [];
    }
  });

  const [showBadgeNotification, setShowBadgeNotification] = useState(null);

  useEffect(() => {
    const nextBadge = badgeDefinitions.find((badge) => {
      const alreadyEarned = earnedBadges.some((earned) => earned.id === badge.id);
      return badge.unlocked(completedCount) && !alreadyEarned;
    });

    if (!nextBadge) return;

    const updatedBadges = [...earnedBadges, nextBadge];
    setEarnedBadges(updatedBadges);
    localStorage.setItem("cyberaware_badges", JSON.stringify(updatedBadges));
    setShowBadgeNotification(nextBadge);
  }, [completedCount, earnedBadges]);

  const clearBadgeNotification = () => {
    setShowBadgeNotification(null);
  };

  const resetBadges = () => {
    localStorage.removeItem("cyberaware_badges");
    setEarnedBadges([]);
    setShowBadgeNotification(null);
  };

  const value = useMemo(() => {
    return {
      earnedBadges,
      showBadgeNotification,
      clearBadgeNotification,
      resetBadges,
      badgeDefinitions,
    };
  }, [earnedBadges, showBadgeNotification]);

  return <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>;
}

export function useBadges() {
  const context = useContext(BadgeContext);

  if (!context) {
    throw new Error("useBadges must be used inside BadgeProvider");
  }

  return context;
}