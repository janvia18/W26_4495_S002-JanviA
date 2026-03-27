import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabase";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: "Learner", avatar: "🛡️" });
  const [progress, setProgress] = useState({ completed: {} });
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (profileData) setProfile(profileData);
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const value = {
    user,
    profile,
    progress,
    points,
    loading,
    level,
    completedCount,
    login,
    signup,
    logout,
    updateProfile,
    completeModule
  };

  return React.createElement(ProgressContext.Provider, { value }, children);
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within ProgressProvider");
  return context;
}