import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://bgikkcwygaaumrxsqino.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnaWtrY3d5Z2FhdW1yeHNxaW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0OTAzODIsImV4cCI6MjAyODA2NjM4Mn0.W6Ab5J0NC0-lQesqmCTUojhO_SvqqdDCF6ixOBwnJXI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
