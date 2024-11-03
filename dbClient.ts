import { createClient } from "jsr:@supabase/supabase-js@2";
const supabaseKey = process.env.SUPABASE_KEY;

if (typeof supabaseKey !== "string") {
  throw new Error("Invalid supabase key");
}

const supabase = createClient(
  "https://xrrdrmyeqxygqvpyywfk.supabase.co",
  supabaseKey,
);

export { supabase };
