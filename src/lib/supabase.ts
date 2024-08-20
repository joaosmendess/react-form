import {createClient} from '@supabase/supabase-js';

export const supabase = createClient (
    'https://hpklbenjxflfxenicwnd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwa2xiZW5qeGZsZnhlbmljd25kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDA5Nzc0MSwiZXhwIjoyMDM5NjczNzQxfQ.QY2Dsz_9ACzDCvIB2jMpjs590VBmM2JjID-mYhKQuMg'
    
)