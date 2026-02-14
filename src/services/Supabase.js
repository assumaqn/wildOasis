import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gsahaorpnzaaxrexgafm.supabase.co";
const supabaseKey = "sb_publishable_FET_G35yzFZ40-S1fiuWAw__Xt4C9H0";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
