/**
 * Higher-level auth helpers (optional): sign-up also upserts `profiles` for display name.
 * The main UI often uses ProgressContext.login / signup instead; keep these for API-style usage.
 */
import { supabase } from "./supabase";

/** Creates auth user and ensures a matching row in `profiles` (onConflict: id). */
export async function signUpUser({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const user = data?.user;

  if (!user) {
    throw new Error("User was created, but no user data was returned.");
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      name,
      email,
    },
    { onConflict: "id" }
  );

  if (profileError) {
    throw profileError;
  }

  return data;
}

/** Email/password session via Supabase Auth. */
export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

/** Clears local session and tokens. */
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

/** Reads persisted session from Supabase client storage (no network refresh). */
export async function getCurrentSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session;
}