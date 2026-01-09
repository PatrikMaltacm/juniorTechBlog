import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const anonKey = import.meta.env.VITE_SUPABASE_API_ANON_PUBLIC_KEY;

export const supabase = createClient(url, anonKey);