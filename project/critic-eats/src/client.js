import { createClient } from '@supabase/supabase-js';

const URL = 'SUPABASE_URL';
const API_KEY = 'SUPAPBASE_API_KEY';

export const supabase = createClient(URL, API_KEY);