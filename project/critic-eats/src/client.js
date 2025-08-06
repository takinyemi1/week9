import { createClient } from '@supabase/supabase-js';

const URL = 'https://fhnyqsmmzfinzitcycnr.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobnlxc21temZpbnppdGN5Y25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwOTA0MTIsImV4cCI6MjA2OTY2NjQxMn0.L7sDQJU_DrhgleK55XvYct1ovX8KvvXOdOFE4gUn9PA';

export const supabase = createClient(URL, API_KEY);