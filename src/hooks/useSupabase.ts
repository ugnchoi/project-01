import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

interface UseSupabaseOptions {
  table: string;
  select?: string;
  filters?: Record<string, unknown>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
}

// Generic result shape for insert / update / delete
type SupabaseMutationResult<T> = {
  data: T[] | null;
  error: PostgrestError | null;
};

interface UseSupabaseResult<T> {
  data: T[] | null;
  loading: boolean;
  error: PostgrestError | null;
  refetch: () => Promise<void>;
  insert: (data: Partial<T>) => Promise<SupabaseMutationResult<T>>;
  update: (id: string, data: Partial<T>) => Promise<SupabaseMutationResult<T>>;
  delete: (id: string) => Promise<SupabaseMutationResult<T>>;
}

export const useSupabase = <T>(
  options: UseSupabaseOptions
): UseSupabaseResult<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(options.table).select(options.select || '*');

      // Apply filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      // Apply limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError);
      } else {
        setData(result as unknown as T[] | null);
      }
    } catch (err) {
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  const insert: UseSupabaseResult<T>['insert'] = async newData => {
    try {
      const { data: result, error: insertError } = await supabase
        .from(options.table)
        .insert(newData)
        .select();

      if (insertError) {
        return { data: result as T[] | null, error: insertError };
      }

      await fetchData(); // refresh
      return { data: result as T[] | null, error: null };
    } catch (err) {
      return { data: null, error: err as PostgrestError };
    }
  };

  const update: UseSupabaseResult<T>['update'] = async (id, updateData) => {
    try {
      const { data: result, error: updateError } = await supabase
        .from(options.table)
        .update(updateData)
        .eq('id', id)
        .select();

      if (updateError) {
        return { data: result as T[] | null, error: updateError };
      }

      await fetchData();
      return { data: result as T[] | null, error: null };
    } catch (err) {
      return { data: null, error: err as PostgrestError };
    }
  };

  const deleteRecord: UseSupabaseResult<T>['delete'] = async id => {
    try {
      const { data: result, error: deleteError } = await supabase
        .from(options.table)
        .delete()
        .eq('id', id);

      if (deleteError) {
        return { data: result as T[] | null, error: deleteError };
      }

      await fetchData();
      return { data: result as T[] | null, error: null };
    } catch (err) {
      return { data: null, error: err as PostgrestError };
    }
  };

  useEffect(() => {
    fetchData();
  }, [options.table, options.select, JSON.stringify(options.filters)]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    insert,
    update,
    delete: deleteRecord,
  };
};
