-- Migration: 20261002000000_init_saas_schema.sql
-- Description: Initialize SaaS PostgreSQL schema for texttoolsai.org

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Table: profiles
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

-- Table: generations
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

-- Table: subscriptions
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

-- Indexes
create index if not exists idx_profiles_plan on public.profiles (plan);
create index if not exists idx_generations_user_id on public.generations (user_id);
create index if not exists idx_generations_created_at on public.generations (created_at desc);
create index if not exists idx_generations_tool_id on public.generations (tool_id);
create index if not exists idx_generations_user_starred on public.generations (user_id, starred);
create index if not exists idx_subscriptions_user_id on public.subscriptions (user_id);
create index if not exists idx_subscriptions_status on public.subscriptions (status);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.generations enable row level security;
alter table public.subscriptions enable row level security;

-- RLS Policies: profiles
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

-- RLS Policies: generations
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

-- RLS Policies: subscriptions
drop policy if exists "Users can read own subscriptions" on public.subscriptions;
create policy "Users can read own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

drop policy if exists "Users can update own subscriptions" on public.subscriptions;
create policy "Users can update own subscriptions"
  on public.subscriptions for update
  using (auth.uid() = user_id);

-- Trigger: create profile on user registration
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

-- Trigger: auto-update words_used on generation insert
create or replace function public.handle_new_generation_quota()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  in_words integer;
begin
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

-- RPC: increment_words_used
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

-- Realtime publication
alter publication supabase_realtime add table public.generations;
