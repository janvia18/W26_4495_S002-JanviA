import { supabase } from "./supabase";

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

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

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