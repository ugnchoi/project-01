/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
  User,
  Session,
  AuthError,
  PostgrestError,
} from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { authService } from '../services/supabaseService';
import type { AuthUser } from '../services/supabaseService';

interface AuthContextType {
  user: User | null;
  authUser: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | PostgrestError | null }>;
  signUp: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{ error: AuthError | PostgrestError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: {
    name?: string;
    avatar_url?: string;
  }) => Promise<{ error: AuthError | PostgrestError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { session: initialSession } = await authService.getSession();
      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        setAuthUser({
          id: initialSession.user.id,
          email: initialSession.user.email || '',
          name: initialSession.user.user_metadata?.name,
          avatar_url: initialSession.user.user_metadata?.avatar_url,
        });
      }

      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setAuthUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name,
          avatar_url: session.user.user_metadata?.avatar_url,
        });
      } else {
        setAuthUser(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn: AuthContextType['signIn'] = async (email, password) => {
    const { error } = await authService.signIn({ email, password });
    return { error };
  };

  const signUp: AuthContextType['signUp'] = async (email, password, name) => {
    const { error } = await authService.signUp({ email, password, name });
    return { error };
  };

  const signOut: AuthContextType['signOut'] = async () => {
    await authService.signOut();
  };

  const updateProfile: AuthContextType['updateProfile'] = async updates => {
    const { error } = await authService.updateProfile(updates);
    return { error };
  };

  const value: AuthContextType = {
    user,
    authUser,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
