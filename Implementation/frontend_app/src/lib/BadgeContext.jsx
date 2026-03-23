import React, { createContext, useContext, useMemo, useState } from "react";
import { useProgress } from "./ProgressContext";

const BadgeContext = createContext(null);

const badges = [
  {
    id: "first-step",
    title: "First Step",
    description: "Complete your first cybersecurity module.",
    check: ({ completedCount }) => completedCount >= 1
  },
  {
    id: "halfway-hero",
    title: "Halfway Hero",
    description: "Complete at least 3 modules.",
    check: ({ completedCount }) => completedCount >= 3
  },
  {
    id: "cyberaware-master",
    title: "CyberAware Master",
    description: "Complete all 5 modules.",
    check: ({ completedCount }) => completedCount >= 5
  }
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

  React.useEffect(() => {
    const nextBadge = badges.find(
      (badge) => badge.check({ completedCount }) && !earnedBadges.some((item) => item.id === badge.id)
    );

    if (nextBadge) {
      const updated = [...earnedBadges, nextBadge];
      setEarnedBadges(updated);
      localStorage.setItem("cyberaware_badges", JSON.stringify(updated));
      setShowBadgeNotification(nextBadge);
    }
  }, [completedCount, earnedBadges]);

  const clearBadgeNotification = () => setShowBadgeNotification(null);

  const value = useMemo(
    () => ({ earnedBadges, showBadgeNotification, clearBadgeNotification }),
    [earnedBadges, showBadgeNotification]
  );

  return <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>;
}

export function useBadges() {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error("useBadges must be used inside BadgeProvider");
  }
  return context;
}