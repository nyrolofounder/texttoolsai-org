"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  supabase,
  isSupabaseConfigured,
  UserProfile,
  DEFAULT_DEMO_PROFILE,
  getUserProfile,
  updateUserProfile,
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
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check local storage for existing session or demo state
    const savedProfile = getUserProfile();
    const isSavedDemo = typeof window !== "undefined" && localStorage.getItem("texttools_is_demo") === "true";

    if (isSupabaseConfigured) {
      // Check real Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            fullName: session.user.user_metadata?.full_name || savedProfile.fullName,
            avatarUrl: session.user.user_metadata?.avatar_url,
            plan: savedProfile.plan || "free",
            wordsUsedThisMonth: savedProfile.wordsUsedThisMonth || 0,
            wordLimit: savedProfile.plan === "pro" ? 999999 : 5000,
            createdAt: session.user.created_at,
          });
          setIsDemoMode(false);
        } else if (isSavedDemo) {
          setUser(savedProfile);
          setIsDemoMode(true);
        }
        setIsLoading(false);
      });

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              fullName: session.user.user_metadata?.full_name || "Creator",
              avatarUrl: session.user.user_metadata?.avatar_url,
              plan: "free",
              wordsUsedThisMonth: 120,
              wordLimit: 5000,
              createdAt: session.user.created_at,
            });
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
      // Default to demo mode if saved, otherwise ready for login
      if (isSavedDemo) {
        setUser(savedProfile);
        setIsDemoMode(true);
      }
      setIsLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      // Fallback to demo mode for preview environment
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
