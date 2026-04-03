import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sggpznxtvberdblwiobn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZ3B6bnh0dmJlcmRibHdpb2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNDkyNTQsImV4cCI6MjA5MDgyNTI1NH0.gzKGyoVXubTmdXk-v8-BsqfkvNStGdJu7wjq0SX9W6I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
