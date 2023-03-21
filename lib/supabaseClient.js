import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://bpnihamszdrqhtpvaizk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmloYW1zemRycWh0cHZhaXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNDEzMjcsImV4cCI6MTk5MzcxNzMyN30.HbXoEwm4pYh8W6tStK-0Uz_yIArLRL6I75p1a8eKNhk')