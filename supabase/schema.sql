-- ==============================================================================
-- TEXTTOOLSAI.ORG PRODUCTION SUPABASE MIGRATION
-- Database: PostgreSQL 15+ (Supabase)
-- Tables: profiles, generations, subscriptions
-- Features: Row Level Security (RLS), Auto-Profile Trigger, Quota Counter Trigger
-- ==============================================================================

-- 1. Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==============================================================================
-- TABLE: profiles
-- Stores extended user profile, active subscription plan, and live word quota tracking
-- ==============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'pro', 'enterprise')),
  words_used integer not null default 0 check (words_used >= 0),
  word_limit integer not null default 5000 check (word_limit >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.profiles is 'Stores user metadata, subscription tier, and monthly word quota usage.';

-- ==============================================================================
-- TABLE: generations
-- Stores persistent AI transformations across all 5 text engines with metrics
-- ==============================================================================
create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  tool_id text not null,
  tool_name text not null,
  input_prompt text not null,
  synthesized_result text not null,
  metrics jsonb default '{}'::jsonb not null,
  starred boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.generations is 'Stores user neural transformations, input/output snippets, and telemetry stats.';

-- ==============================================================================
-- TABLE: subscriptions
-- Stores Razorpay payment orders, subscription IDs, and recurring billing periods
-- ==============================================================================
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  razorpay_subscription_id text,
  razorpay_order_id text,
  razorpay_payment_id text,
  plan text not null default 'pro' check (plan in ('pro', 'enterprise')),
  status text not null default 'active' check (status in ('active', 'paused', 'cancelled', 'past_due')),
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone default (now() + interval '30 days') not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.subscriptions is 'Stores payment credentials and active billing periods from Razorpay webhook events.';

-- ==============================================================================
-- TABLE: api_keys
-- Stores developer API secret keys for programmatic inference via /api/v1/*
-- ==============================================================================
create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  key text unique not null,
  name text default 'Default Secret Key',
  status text not null default 'active' check (status in ('active', 'revoked')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_used_at timestamp with time zone
);

comment on table public.api_keys is 'Stores developer API secret keys for programmatic inference via /api/v1/*';

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
create index if not exists idx_profiles_plan on public.profiles (plan);
create index if not exists idx_generations_user_id on public.generations (user_id);
create index if not exists idx_generations_created_at on public.generations (created_at desc);
create index if not exists idx_generations_tool_id on public.generations (tool_id);
create index if not exists idx_generations_user_starred on public.generations (user_id, starred);
create index if not exists idx_subscriptions_user_id on public.subscriptions (user_id);
create index if not exists idx_subscriptions_status on public.subscriptions (status);
create index if not exists idx_api_keys_user_id on public.api_keys (user_id);
create index if not exists idx_api_keys_key on public.api_keys (key);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict isolation: users can only inspect and mutate their own data records
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.generations enable row level security;
alter table public.subscriptions enable row level security;
alter table public.api_keys enable row level security;

-- API KEYS POLICIES
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

-- PROFILES POLICIES
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- GENERATIONS POLICIES
drop policy if exists "Users can read own generations" on public.generations;
create policy "Users can read own generations"
  on public.generations for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own generations" on public.generations;
create policy "Users can insert own generations"
  on public.generations for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own generations" on public.generations;
create policy "Users can update own generations"
  on public.generations for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete own generations" on public.generations;
create policy "Users can delete own generations"
  on public.generations for delete
  using (auth.uid() = user_id);

-- SUBSCRIPTIONS POLICIES
drop policy if exists "Users can read own subscriptions" on public.subscriptions;
create policy "Users can read own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

drop policy if exists "Users can update own subscriptions" on public.subscriptions;
create policy "Users can update own subscriptions"
  on public.subscriptions for update
  using (auth.uid() = user_id);

-- ==============================================================================
-- DATABASE TRIGGERS & STORED PROCEDURES
-- ==============================================================================

-- 1. Automatically create a profile when a new user signs up in auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, plan, words_used, word_limit)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    'free',
    0,
    5000
  )
  on conflict (id) do update set
    email = excluded.email,
    updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Automatically increment words_used on profiles table when a generation is inserted
create or replace function public.handle_new_generation_quota()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  in_words integer;
begin
  -- Extract wordsIn from JSONB metrics or count whitespace in input_prompt
  in_words := coalesce(
    (new.metrics->>'wordsIn')::integer,
    array_length(regexp_split_to_array(trim(new.input_prompt), '\s+'), 1),
    0
  );

  update public.profiles
  set 
    words_used = coalesce(words_used, 0) + in_words,
    updated_at = timezone('utc'::text, now())
  where id = new.user_id;

  return new;
end;
$$;

drop trigger if exists on_generation_created on public.generations;
create trigger on_generation_created
  after insert on public.generations
  for each row execute function public.handle_new_generation_quota();

-- 3. Atomic RPC function to increment words quota manually if needed
create or replace function public.increment_words_used(user_uuid uuid, words_to_add integer)
returns integer
language plpgsql
security definer set search_path = public
as $$
declare
  new_count integer;
begin
  update public.profiles
  set 
    words_used = coalesce(words_used, 0) + words_to_add,
    updated_at = timezone('utc'::text, now())
  where id = user_uuid
  returning words_used into new_count;

  return new_count;
end;
$$;

-- 4. Enable Realtime on the generations table for instant live sync across client devices
alter publication supabase_realtime add table public.generations;
