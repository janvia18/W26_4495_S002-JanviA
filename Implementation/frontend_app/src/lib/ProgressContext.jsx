import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: "Learner", avatar: "🛡️", organization: "", role: "" });
  const [progress, setProgress] = useState({ completed: {} });
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const SESSION_WAIT_MS = 8000;

    const getSessionSafe = async () => {
      try {
        const result = await Promise.race([
          supabase.auth.getSession(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("session-timeout")), SESSION_WAIT_MS)
          ),
        ]);
        return result?.data?.session ?? null;
      } catch (e) {
        console.warn("Auth session check failed or timed out:", e?.message || e);
        return null;
      }
    };

    const checkUser = async () => {
      try {
        const session = await getSessionSafe();
        if (session) {
          setUser(session.user);
          // Do not await — slow/hanging DB calls must not block the UI shell (PrivateRoute "Loading...")
          void loadUserData(session.user.id);
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        void loadUserData(session.user.id);
      } else {
        setUser(null);
        setProfile({ name: "Learner", avatar: "🛡️", organization: "", role: "" });
        setProgress({ completed: {} });
        setPoints(0);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (profileData) setProfile(profileData);

      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (progressData) {
        setProgress(progressData.progress || { completed: {} });
        setPoints(progressData.points || 0);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signup = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (data) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...data });
    if (!error) setProfile({ ...profile, ...data });
  };

  const completeModule = async (moduleKey, earnedPoints = 20) => {
    if (!user) return;
    if (progress.completed?.[moduleKey]) return;

    const newProgress = { 
      ...progress, 
      completed: { ...progress.completed, [moduleKey]: true } 
    };
    const newPoints = points + earnedPoints;

    const { error } = await supabase
      .from('user_progress')
      .upsert({ user_id: user.id, progress: newProgress, points: newPoints });

    if (!error) {
      setProgress(newProgress);
      setPoints(newPoints);
    }
  };

  const completedCount = Object.values(progress.completed || {}).filter(Boolean).length;
  const level = points >= 120 ? "Expert" : points >= 80 ? "Advanced" : points >= 40 ? "Intermediate" : "Beginner";

  return (
    <ProgressContext.Provider value={{
      user, profile, progress, points, loading, level, completedCount,
      login, signup, logout, updateProfile, completeModule
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within ProgressProvider");
  return context;
}