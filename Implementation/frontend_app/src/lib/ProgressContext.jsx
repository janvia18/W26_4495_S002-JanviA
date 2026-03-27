import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";

const ProgressContext = createContext(null);

const defaultProgress = {
  completed: {
    phishing: false,
    passwords: false,
    mfa: false,
    social: false,
    safeBrowsing: false,
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
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setUser(session.user);
          await loadUserData(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user);
        await loadUserData(session.user.id);
      } else {
        setUser(null);
        setProfile(defaultProfile);
        setProgress(defaultProgress);
        setPoints(0);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    try {
      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileData) {
        setProfile({ ...defaultProfile, ...profileData });
      } else if (profileError && profileError.code === 'PGRST116') {
        // No profile found, create one
        await supabase
          .from('profiles')
          .insert([{ id: userId, ...defaultProfile }]);
        setProfile(defaultProfile);
      }

      // Load progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (progressData) {
        setProgress(progressData.progress || defaultProgress);
        setPoints(progressData.points || 0);
      } else if (progressError && progressError.code === 'PGRST116') {
        // No progress found, create one
        await supabase
          .from('user_progress')
          .insert([{ user_id: userId, progress: defaultProgress, points: 0 }]);
        setProgress(defaultProgress);
        setPoints(0);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  };

  const signup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (profileData) => {
    if (!user) return;

    const updatedProfile = { ...profile, ...profileData };
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...updatedProfile,
        updated_at: new Date()
      });

    if (!error) {
      setProfile(updatedProfile);
    } else {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const completeModule = async (moduleKey, earnedPoints = 20) => {
    if (!user) return;

    const alreadyDone = progress.completed[moduleKey];
    if (alreadyDone) return;

    const updatedProgress = {
      ...progress,
      completed: {
        ...progress.completed,
        [moduleKey]: true
      }
    };

    const updatedPoints = points + earnedPoints;

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        progress: updatedProgress,
        points: updatedPoints,
        updated_at: new Date()
      });

    if (!error) {
      setProgress(updatedProgress);
      setPoints(updatedPoints);
      return true;
    } else {
      console.error('Error completing module:', error);
      return false;
    }
  };

  const completedCount = useMemo(() => {
    if (!progress?.completed) return 0;
    return Object.values(progress.completed).filter(Boolean).length;
  }, [progress]);

  const level = useMemo(() => {
    if (points >= 120) return "Expert";
    if (points >= 80) return "Advanced";
    if (points >= 40) return "Intermediate";
    return "Beginner";
  }, [points]);

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

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
}