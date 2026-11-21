import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
// Defaults to environment variables if provided, otherwise provides mock fallback client
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://licentra-mock.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'licentra-anon-key-mock-placeholder';

export const isSupabaseConfigured = () => {
  return (
    Boolean(import.meta.env?.VITE_SUPABASE_URL) &&
    import.meta.env?.VITE_SUPABASE_URL !== 'https://licentra-mock.supabase.co' &&
    Boolean(import.meta.env?.VITE_SUPABASE_ANON_KEY)
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;

