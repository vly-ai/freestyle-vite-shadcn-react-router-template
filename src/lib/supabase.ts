import { createClient } from "@supabase/supabase-js";

export type Database = {
  public: {
    Tables: {
      instruments: {
        Row: {
          id: number;
          name: string;
        };
      };
    };
  };
};

export type Instrument = Database["public"]["Tables"]["instruments"]["Row"];

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase =
  isSupabaseConfigured && supabaseUrl && supabasePublishableKey
    ? createClient<Database>(supabaseUrl, supabasePublishableKey)
    : null;
