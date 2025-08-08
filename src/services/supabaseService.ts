import { supabase } from '../lib/supabase';
import type {
  User,
  Session,
  AuthError,
  PostgrestError,
} from '@supabase/supabase-js';
import type { StorageError } from '@supabase/storage-js';

type RealtimePayload<T> = { new: T | null; old: T | null };

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
  ): Promise<{ data: T[] | null; error: PostgrestError | null }> {
    const { data, error } = await supabase.from(table).select(select);
    return { data: data as T[] | null, error };
  },

  async getById<T>(
    table: string,
    id: string,
    select = '*'
  ): Promise<{ data: T | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .eq('id', id)
      .single();
    return { data: data as T | null, error };
  },

  async insert<T>(
    table: string,
    data: Partial<T>
  ): Promise<{ data: T | null; error: PostgrestError | null }> {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    return { data: result as T | null, error };
  },

  async update<T>(
    table: string,
    id: string,
    data: Partial<T>
  ): Promise<{ data: T | null; error: PostgrestError | null }> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    return { data: result as T | null, error };
  },

  async delete(
    table: string,
    id: string
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase.from(table).delete().eq('id', id);
    return { error };
  },

  // Real-time subscriptions
  subscribeToTable<T>(
    table: string,
    callback: (payload: RealtimePayload<T>) => void,
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = 'INSERT'
  ) {
    const channel = supabase.channel(`${table}_changes`);

    /** Minimal shape we need from RealtimeChannel without using `any` */
    type UnsafeRealtimeChannel = {
      on(
        event: 'postgres_changes',
        filter: { event: string; schema: string; table: string },
        cb: (payload: RealtimePayload<unknown>) => void
      ): { subscribe(): void };
    };

    // Cast once through `unknown`, then to our narrowed interface
    (channel as unknown as UnsafeRealtimeChannel)
      .on(
        'postgres_changes',
        { event, schema: 'public', table },
        callback as unknown as (payload: RealtimePayload<unknown>) => void
      )
      .subscribe();

    return channel;
  },
};

// Storage Service
export const storageService = {
  // Upload file
  async uploadFile(
    bucket: string,
    path: string,
    file: File
  ): Promise<{ data: { path: string } | null; error: StorageError | null }> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    return { data: data as { path: string } | null, error };
  },

  // Get public URL
  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete file
  async deleteFile(
    bucket: string,
    path: string
  ): Promise<{ error: StorageError | null }> {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    return { error };
  },

  // List files in bucket
  async listFiles(
    bucket: string,
    path = ''
  ): Promise<{ data: unknown; error: StorageError | null }> {
    const { data, error } = await supabase.storage.from(bucket).list(path);
    return { data, error };
  },
};

// Utility functions
export const supabaseUtils = {
  // Format error message
  formatError(error: unknown): string {
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as { message: unknown }).message === 'string'
    ) {
      return (error as { message: string }).message;
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
