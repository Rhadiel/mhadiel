// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cywtnaxjginfspmjishd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5d3RuYXhqZ2luZnNwbWppc2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMjM0OTAsImV4cCI6MjAzMzY5OTQ5MH0.3pFsP56_ar_fhHTiryn8iOGHDBFi2tNlcEmuUOyMPsY';

export const supabase = createClient(supabaseUrl, supabaseKey);
