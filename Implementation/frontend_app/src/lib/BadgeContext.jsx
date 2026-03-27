import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useProgress } from "./ProgressContext";

const BadgeContext = createContext(null);

export const badgeDefinitions = {
  first_module: {
    id: "first_module",
    title: "First Win",
    description: "Completed your first module.",
    icon: "🏆"
  },
  halfway_hero: {
    id: "halfway_hero",
    title: "Halfway Hero",
    description: "Completed 3 modules.",
    icon: "⚡"
  },
  champion: {
    id: "champion",
    title: "CyberAware Champion",
    description: "Completed all 6 modules.",
    icon: "👑"
  },
  expert: {
    id: "expert",
    title: "Security Expert",
    description: "Earned 120+ points.",
    icon: "🎓"
  }
};

export function BadgeProvider({ children }) {
  const { user, completedCount, points } = useProgress();
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [showBadgeNotification, setShowBadgeNotification] = useState(null);

  useEffect(() => {
    if (user) {
      loadBadges();
    } else {
      setEarnedBadges([]);
    }
  }, [user]);

  useEffect(() => {
    if (user && completedCount !== undefined && points !== undefined) {
      checkForNewBadges();
    }
  }, [completedCount, points, user]);

  const loadBadges = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id);

      if (!error && data) {
        const badges = data.map(b => badgeDefinitions[b.badge_id]).filter(Boolean);
        setEarnedBadges(badges);
      }
    } catch (error) {
      console.error('Error loading badges:', error);
    }
  };

  const checkForNewBadges = async () => {
    if (!user) return;
    
    const badgesToEarn = [];
    
    if (completedCount >= 1 && !earnedBadges.some(b => b.id === 'first_module')) {
      badgesToEarn.push(badgeDefinitions.first_module);
    }
    if (completedCount >= 3 && !earnedBadges.some(b => b.id === 'halfway_hero')) {
      badgesToEarn.push(badgeDefinitions.halfway_hero);
    }
    if (completedCount >= 6 && !earnedBadges.some(b => b.id === 'champion')) {
      badgesToEarn.push(badgeDefinitions.champion);
    }
    if (points >= 120 && !earnedBadges.some(b => b.id === 'expert')) {
      badgesToEarn.push(badgeDefinitions.expert);
    }
    
    if (badgesToEarn.length > 0) {
      for (const badge of badgesToEarn) {
        try {
          const { error } = await supabase
            .from('user_badges')
            .insert({
              user_id: user.id,
              badge_id: badge.id,
              earned_at: new Date()
            });
            
          if (!error) {
            setEarnedBadges(prev => [...prev, badge]);
            setShowBadgeNotification(badge);
            
            setTimeout(() => {
              setShowBadgeNotification(null);
            }, 5000);
          }
        } catch (error) {
          console.error('Error saving badge:', error);
        }
      }
    }
  };

  const clearBadgeNotification = () => setShowBadgeNotification(null);

  const value = {
    earnedBadges,
    showBadgeNotification,
    clearBadgeNotification,
    badgeDefinitions
  };

  return (
    <BadgeContext.Provider value={value}>
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadges() {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error("useBadges must be used inside BadgeProvider");
  }
  return context;
}