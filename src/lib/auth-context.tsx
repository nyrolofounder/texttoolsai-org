"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  supabase,
  isSupabaseConfigured,
  UserProfile,
  DEFAULT_DEMO_PROFILE,
  getUserProfile,
  updateUserProfile,
  fetchUserProfile,
  incrementWordsUsed,
} from "./supabase";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithEmail: (email: string, pass: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  enterDemoMode: () => void;
  upgradeToPro: () => void;
  consumeWords: (words: number) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isDemoMode: false,
  signInWithGoogle: async () => ({ error: null }),
  signInWithEmail: async () => ({ error: null }),
  signUpWithEmail: async () => ({ error: null }),
  signOut: async () => {},
  enterDemoMode: () => {},
  upgradeToPro: () => {},
  consumeWords: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Sync or initialize profile from Supabase
  const syncSupabaseProfile = useCallback(async (sessionUser: { id: string; email?: string; user_metadata?: Record<string, any>; created_at: string }) => {
    try {
      const dbProfile = await fetchUserProfile(sessionUser.id);
      if (dbProfile) {
        setUser(dbProfile);
        return;
      }

      // Upsert profile if not yet created
      const newProfileData = {
        id: sessionUser.id,
        email: sessionUser.email || "",
        full_name: sessionUser.user_metadata?.full_name || sessionUser.user_metadata?.name || "Creator",
        avatar_url: sessionUser.user_metadata?.avatar_url || "",
        plan: "free",
        words_used: 0,
        word_limit: 5000,
      };

      await supabase.from("profiles").upsert(newProfileData);

      setUser({
        id: sessionUser.id,
        email: newProfileData.email,
        fullName: newProfileData.full_name,
        avatarUrl: newProfileData.avatar_url,
        plan: "free",
        wordsUsedThisMonth: 0,
        wordLimit: 5000,
        createdAt: sessionUser.created_at,
      });
    } catch (err) {
      console.warn("Could not sync profile with Supabase, using fallback:", err);
      const saved = getUserProfile();
      setUser({
        ...saved,
        id: sessionUser.id,
        email: sessionUser.email || saved.email,
      });
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id && isSupabaseConfigured) {
      const refreshed = await fetchUserProfile(user.id);
      if (refreshed) {
        setUser(refreshed);
      }
    } else {
      setUser(getUserProfile());
    }
  }, [user?.id]);

  useEffect(() => {
    const savedProfile = getUserProfile();
    const isSavedDemo = typeof window !== "undefined" && localStorage.getItem("texttools_is_demo") === "true";

    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          syncSupabaseProfile(session.user).finally(() => {
            setIsDemoMode(false);
            setIsLoading(false);
          });
        } else if (isSavedDemo) {
          setUser(savedProfile);
          setIsDemoMode(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            await syncSupabaseProfile(session.user);
            setIsDemoMode(false);
          } else if (!isSavedDemo) {
            setUser(null);
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    } else {
      if (isSavedDemo) {
        setUser(savedProfile);
        setIsDemoMode(true);
      }
      setIsLoading(false);
    }
  }, [syncSupabaseProfile]);

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      enterDemoMode();
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    return { error };
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (!isSupabaseConfigured) {
      enterDemoMode();
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    return { error };
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    if (!isSupabaseConfigured) {
      const newProf = updateUserProfile({ email, fullName: name });
      setUser(newProf);
      setIsDemoMode(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("texttools_is_demo", "true");
      }
      return { error: null };
    }
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { full_name: name },
      },
    });
    return { error };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("texttools_is_demo");
    }
    setUser(null);
    setIsDemoMode(false);
  };

  const enterDemoMode = () => {
    const prof = getUserProfile();
    setUser(prof);
    setIsDemoMode(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("texttools_is_demo", "true");
    }
  };

  const upgradeToPro = () => {
    const updated = updateUserProfile({
      plan: "pro",
      wordLimit: 999999,
    });
    setUser(updated);

    // If connected to Supabase, update profile plan
    if (user?.id && isSupabaseConfigured) {
      supabase
        .from("profiles")
        .update({ plan: "pro", word_limit: 999999 })
        .eq("id", user.id)
        .then(() => {});
    }
  };

  const consumeWords = async (words: number) => {
    if (!words || words <= 0) return;

    if (user?.id && isSupabaseConfigured) {
      const newTotal = await incrementWordsUsed(user.id, words);
      setUser((prev) => (prev ? { ...prev, wordsUsedThisMonth: newTotal } : null));
    } else {
      const current = getUserProfile();
      const updatedWords = (current.wordsUsedThisMonth || 0) + words;
      updateUserProfile({ wordsUsedThisMonth: updatedWords });
      setUser((prev) => (prev ? { ...prev, wordsUsedThisMonth: updatedWords } : null));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        isDemoMode,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        enterDemoMode,
        upgradeToPro,
        consumeWords,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
