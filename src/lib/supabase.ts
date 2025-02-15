import { createClient } from '@supabase/supabase-js';

// Check if environment variables are set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file'
  );
}

// Validate Supabase URL
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    'Invalid VITE_SUPABASE_URL. Please ensure it is a complete URL (e.g., https://your-project.supabase.co)'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);