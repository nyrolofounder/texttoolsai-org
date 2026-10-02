-- Migration: 20261002010000_create_api_keys_table.sql
-- Description: Add public API keys table for texttoolsai.org v1 developer API

create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  key text unique not null,
  name text default 'Default Secret Key',
  status text not null default 'active' check (status in ('active', 'revoked')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_used_at timestamp with time zone
);

-- Indexes for lightning-fast token lookups
create index if not exists idx_api_keys_user_id on public.api_keys (user_id);
create index if not exists idx_api_keys_key on public.api_keys (key);

-- Enable Row Level Security
alter table public.api_keys enable row level security;

-- RLS Policies
drop policy if exists "Users can read own api keys" on public.api_keys;
create policy "Users can read own api keys"
  on public.api_keys for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own api keys" on public.api_keys;
create policy "Users can insert own api keys"
  on public.api_keys for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own api keys" on public.api_keys;
create policy "Users can update own api keys"
  on public.api_keys for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete own api keys" on public.api_keys;
create policy "Users can delete own api keys"
  on public.api_keys for delete
  using (auth.uid() = user_id);
