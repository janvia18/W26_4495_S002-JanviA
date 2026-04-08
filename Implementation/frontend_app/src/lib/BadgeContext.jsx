import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useProgress } from "./ProgressContext";

const BadgeContext = createContext();

export function BadgeProvider({ children }) {
  const { user, completedCount, points } = useProgress();
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [showBadgeNotification, setShowBadgeNotification] = useState(null);

  useEffect(() => {
    if (user) loadBadges();
  }, [user]);

  useEffect(() => {
    if (user) checkNewBadges();
  }, [completedCount, points]);

  const loadBadges = async () => {
    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select('badge_id')
        .eq('user_id', user.id);
      if (error) {
        console.warn('user_badges:', error.message);
        return;
      }
      if (data) setEarnedBadges(data.map((b) => b.badge_id));
    } catch {
      /* table may not exist yet */
    }
  };

  const checkNewBadges = async () => {
    const newBadges = [];
    if (completedCount >= 1 && !earnedBadges.includes('first_module')) newBadges.push('first_module');
    if (completedCount >= 3 && !earnedBadges.includes('halfway_hero')) newBadges.push('halfway_hero');
    if (completedCount >= 6 && !earnedBadges.includes('champion')) newBadges.push('champion');
    if (points >= 120 && !earnedBadges.includes('expert')) newBadges.push('expert');

    for (const badge of newBadges) {
      const { error } = await supabase.from('user_badges').insert({ user_id: user.id, badge_id: badge });
      if (error) break;
      setEarnedBadges(prev => [...prev, badge]);
      setShowBadgeNotification(badge);
      setTimeout(() => setShowBadgeNotification(null), 5000);
    }
  };

  const clearBadgeNotification = () => setShowBadgeNotification(null);

  const getBadgeInfo = (id) => {
    const badges = {
      first_module: { title: "First Win", description: "Completed your first module", icon: "🏆" },
      halfway_hero: { title: "Halfway Hero", description: "Completed 3 modules", icon: "⚡" },
      champion: { title: "CyberAware Champion", description: "Completed all 6 modules", icon: "👑" },
      expert: { title: "Security Expert", description: "Earned 120+ points", icon: "🎓" }
    };
    return badges[id] || { title: "", description: "", icon: "🏅" };
  };

  return (
    <BadgeContext.Provider value={{
      earnedBadges: earnedBadges.map(id => ({ id, ...getBadgeInfo(id) })),
      showBadgeNotification: showBadgeNotification ? { id: showBadgeNotification, ...getBadgeInfo(showBadgeNotification) } : null,
      clearBadgeNotification
    }}>
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadges() {
  const context = useContext(BadgeContext);
  if (!context) throw new Error("useBadges must be used within BadgeProvider");
  return context;
}