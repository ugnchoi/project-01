import { supabase } from '../lib/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

// Authentication types
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Authentication Service
export const authService = {
  // Sign up with email and password
  async signUp(
    data: SignUpData
  ): Promise<{ user: User | null; error: AuthError | null }> {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });
    return { user, error };
  },

  // Sign in with email and password
  async signIn(
    data: SignInData
  ): Promise<{ user: User | null; error: AuthError | null }> {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    return { user, error };
  },

  // Sign out
  async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current session
  async getSession(): Promise<{
    session: Session | null;
    error: AuthError | null;
  }> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    return { session, error };
  },

  // Get current user
  async getCurrentUser(): Promise<{
    user: User | null;
    error: AuthError | null;
  }> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user, error };
  },

  // Reset password
  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  },

  // Update user profile
  async updateProfile(updates: {
    name?: string;
    avatar_url?: string;
  }): Promise<{ user: User | null; error: AuthError | null }> {
    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({
      data: updates,
    });
    return { user, error };
  },
};

// Data Service
export const dataService = {
  // Generic CRUD operations
  async get<T>(
    table: string,
    select = '*'
  ): Promise<{ data: T[] | null; error: any }> {
    const { data, error } = await supabase.from(table).select(select);
    return { data, error };
  },

  async getById<T>(
    table: string,
    id: string,
    select = '*'
  ): Promise<{ data: T | null; error: any }> {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .eq('id', id)
      .single();
    return { data, error };
  },

  async insert<T>(
    table: string,
    data: Partial<T>
  ): Promise<{ data: T | null; error: any }> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    return { data: result, error };
  },

  async update<T>(
    table: string,
    id: string,
    data: Partial<T>
  ): Promise<{ data: T | null; error: any }> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    return { data: result, error };
  },

  async delete(table: string, id: string): Promise<{ error: any }> {
    const { error } = await supabase.from(table).delete().eq('id', id);
    return { error };
  },

  // Real-time subscriptions
  subscribeToTable<T>(
    table: string,
    callback: (payload: { new: T; old: T }) => void,
    event = 'INSERT'
  ) {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', { event, schema: 'public', table }, callback)
      .subscribe();
  },
};

// Storage Service
export const storageService = {
  // Upload file
  async uploadFile(
    bucket: string,
    path: string,
    file: File
  ): Promise<{ data: any; error: any }> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    return { data, error };
  },

  // Get public URL
  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete file
  async deleteFile(bucket: string, path: string): Promise<{ error: any }> {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    return { error };
  },

  // List files in bucket
  async listFiles(
    bucket: string,
    path = ''
  ): Promise<{ data: any; error: any }> {
    const { data, error } = await supabase.storage.from(bucket).list(path);
    return { data, error };
  },
};

// Utility functions
export const supabaseUtils = {
  // Format error message
  formatError(error: any): string {
    if (error?.message) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unexpected error occurred';
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const { session } = await authService.getSession();
    return !!session;
  },

  // Get user profile
  async getUserProfile(): Promise<AuthUser | null> {
    const { user } = await authService.getCurrentUser();
    if (!user) return null;

    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name,
      avatar_url: user.user_metadata?.avatar_url,
    };
  },
};
