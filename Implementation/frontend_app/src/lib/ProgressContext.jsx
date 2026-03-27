import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";

const ProgressContext = createContext(null);

const defaultProgress = {
  completed: {
    phishing: false,
    passwords: false,
    mfa: false,
    social: false,
    "safe-browsing": false,
    incident: false,
  },
};

const defaultProfile = {
  name: "",
  organization: "",
  role: "",
  avatar: "🛡️",
};

function mapDbProgressToApp(row) {
  if (!row) return defaultProgress;

  return {
    completed: {
      phishing: row.phishing ?? false,
      passwords: row.passwords ?? false,
      mfa: row.mfa ?? false,
      social: row.social ?? false,
      "safe-browsing": row.safe_browsing ?? false,
      incident: row.incident ?? false,
    },
  };
}

function mapAppProgressToDb(progress, points) {
  return {
    phishing: progress.completed.phishing,
    passwords: progress.completed.passwords,
    mfa: progress.completed.mfa,
    social: progress.completed.social,
    safe_browsing: progress.completed["safe-browsing"],
    incident: progress.completed.incident,
    points,
    updated_at: new Date().toISOString(),
  };
}

export function ProgressProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(defaultProfile);
  const [progress, setProgress] = useState(defaultProgress);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadUserData(authUser) {
    if (!authUser) {
      setProfile(defaultProfile);
      setProgress(defaultProgress);
      setPoints(0);
      return;
    }

    const [{ data: profileRow, error: profileError }, { data: progressRow, error: progressError }] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", authUser.id).maybeSingle(),
        supabase.from("user_progress").select("*").eq("user_id", authUser.id).maybeSingle(),
      ]);

    if (profileError) console.error("Profile load error:", profileError.message);
    if (progressError) console.error("Progress load error:", progressError.message);

    setProfile({
      ...defaultProfile,
      ...(profileRow || {}),
    });

    setProgress(mapDbProgressToApp(progressRow));
    setPoints(progressRow?.points ?? 0);
  }

  useEffect(() => {
    let mounted = true;

    async function init() {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authUser = session?.user ?? null;
      if (!mounted) return;

      setUser(authUser);
      await loadUserData(authUser);

      if (mounted) setLoading(false);
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const authUser = session?.user ?? null;
      setUser(authUser);
      await loadUserData(authUser);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signup = async (userData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (error) throw error;

    const authUser = data.user;
    if (!authUser) return;

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: authUser.id,
      email: userData.email,
      name: userData.name || "",
      organization: "",
      role: "",
      avatar: "🛡️",
      updated_at: new Date().toISOString(),
    });

    if (profileError) throw profileError;

    const { error: progressError } = await supabase.from("user_progress").upsert({
      user_id: authUser.id,
      phishing: false,
      passwords: false,
      mfa: false,
      social: false,
      safe_browsing: false,
      incident: false,
      points: 0,
      updated_at: new Date().toISOString(),
    });

    if (progressError) throw progressError;
  };

  const login = async (userData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    setUser(null);
    setProfile(defaultProfile);
    setProgress(defaultProgress);
    setPoints(0);
  };

  const updateProfile = async (profileData) => {
    if (!user) return;

    const nextProfile = { ...profile, ...profileData };

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      name: nextProfile.name,
      organization: nextProfile.organization,
      role: nextProfile.role,
      avatar: nextProfile.avatar,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    setProfile(nextProfile);
  };

  const completeModule = async (moduleKey, earnedPoints = 20) => {
    if (!user) return;

    const alreadyDone = progress.completed[moduleKey];

    const updatedProgress = {
      ...progress,
      completed: {
        ...progress.completed,
        [moduleKey]: true,
      },
    };

    const updatedPoints = alreadyDone ? points : points + earnedPoints;

    const { error } = await supabase.from("user_progress").upsert({
      user_id: user.id,
      ...mapAppProgressToDb(updatedProgress, updatedPoints),
    });

    if (error) throw error;

    setProgress(updatedProgress);
    setPoints(updatedPoints);
  };

  const resetProgress = async () => {
    if (!user) return;

    const { error } = await supabase.from("user_progress").upsert({
      user_id: user.id,
      phishing: false,
      passwords: false,
      mfa: false,
      social: false,
      safe_browsing: false,
      incident: false,
      points: 0,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    setProgress(defaultProgress);
    setPoints(0);
    localStorage.removeItem("cyberaware_badges");
  };

  const level = useMemo(() => {
    if (points >= 120) return "Cyber Expert 🧠";
    if (points >= 80) return "Security Pro 🔐";
    if (points >= 40) return "Explorer 🧭";
    return "Beginner 🌱";
  }, [points]);

  const completedCount = useMemo(() => {
    return Object.values(progress.completed).filter(Boolean).length;
  }, [progress]);

  const value = {
    user,
    profile,
    progress,
    points,
    loading,
    level,
    completedCount,
    signup,
    login,
    logout,
    updateProfile,
    completeModule,
    resetProgress,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }

  return context;
}