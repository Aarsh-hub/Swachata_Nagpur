import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mkxmbmxbuqovsbugkppo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2CpXW63BVG9GxB00yKoMIw_SyjG_AFR';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
