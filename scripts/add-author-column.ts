/**
 * One-time migration: Add `author` column to the stories table.
 * Usage: npx tsx scripts/add-author-column.ts
 */

import dotenv from 'dotenv';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: join(__dirname, '..', '.env.local') });

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(url, key);

  console.log('Adding author column to stories table...');

  const { error } = await supabase.rpc('exec_sql', {
    query: 'ALTER TABLE stories ADD COLUMN IF NOT EXISTS author TEXT;',
  });

  if (error) {
    // If rpc doesn't exist, try a direct approach
    console.log('rpc exec_sql not available, trying direct SQL via REST...');
    const res = await fetch(`${url}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({ query: 'ALTER TABLE stories ADD COLUMN IF NOT EXISTS author TEXT;' }),
    });

    if (!res.ok) {
      console.error('Could not add column automatically.');
      console.log('\nPlease run this SQL manually in the Supabase SQL Editor:');
      console.log('  ALTER TABLE stories ADD COLUMN IF NOT EXISTS author TEXT;');
      process.exit(1);
    }
  }

  console.log('Done! author column added to stories table.');
}

main().catch(err => {
  console.error('Error:', err);
  console.log('\nPlease run this SQL manually in the Supabase SQL Editor:');
  console.log('  ALTER TABLE stories ADD COLUMN IF NOT EXISTS author TEXT;');
  process.exit(1);
});
