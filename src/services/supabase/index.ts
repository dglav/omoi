import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "../../../types/supabase";

export const supabase = createClient<Database>(
  "https://osfzwvhubwmiwimpgrpj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZnp3dmh1YndtaXdpbXBncnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5MjQ2MDgsImV4cCI6MjAyNjUwMDYwOH0.XDSsknfDRqeSbZO26ynvE6Ea3RiUQaN5yqsVWdFF9aI",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
