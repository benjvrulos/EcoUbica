import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xxappufaletnelkjpdeg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YXBwdWZhbGV0bmVsa2pwZGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1MTgyNzMsImV4cCI6MjAxNjA5NDI3M30.N3Z7P6-DpopB9ed18g-nqRik93qG2RXQw72lMk4snyM";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
