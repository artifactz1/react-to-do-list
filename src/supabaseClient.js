import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

console.log("SUPABASE_URL:", process.env.REACT_APP_SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.REACT_APP_SUPABASE_KEY);
