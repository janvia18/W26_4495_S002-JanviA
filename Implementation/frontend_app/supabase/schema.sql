-- CyberAware frontend: tables expected by ProgressContext + BadgeContext.
-- Run in Supabase → SQL Editor (once per project). Adjust if you already have conflicting objects.

-- ---------------------------------------------------------------------------
-- profiles (ProfileSetup, ProgressContext.loadUserData / updateProfile)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  avatar text,
  organization text,
  role text,
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- user_progress: ONE row per user — JSON progress + points (not per-module rows)
-- ---------------------------------------------------------------------------
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  points int not null default 0,
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- user_badges: string ids (first_module, halfway_hero, champion, expert)
-- ---------------------------------------------------------------------------
create table if not exists public.user_badges (
  user_id uuid not null references auth.users (id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz default now(),
  primary key (user_id, badge_id)
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_badges enable row level security;

drop policy if exists "Users can manage own profile" on public.profiles;
create policy "Users can manage own profile"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can manage own progress" on public.user_progress;
create policy "Users can manage own progress"
  on public.user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own badges" on public.user_badges;
create policy "Users can manage own badges"
  on public.user_badges for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- New signups: seed profile + progress row (optional but recommended)
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(coalesce(new.email, ''), '@', 1), 'Learner'),
    '🛡️'
  )
  on conflict (id) do nothing;

  insert into public.user_progress (user_id, progress, points)
  values (new.id, '{}'::jsonb, 0)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Keep updated_at fresh on progress saves (optional; app does not send this column)
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists user_progress_touch_updated_at on public.user_progress;
create trigger user_progress_touch_updated_at
  before update on public.user_progress
  for each row execute procedure public.touch_updated_at();

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute procedure public.touch_updated_at();
