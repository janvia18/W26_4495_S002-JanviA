# Supabase setup (CyberAware frontend)

## 1. Environment variables

In `frontend_app/`, copy `.env.example` to `.env` and set:

- `VITE_SUPABASE_URL` — Project URL (Settings → API)
- `VITE_SUPABASE_ANON_KEY` — anon / public key (JWT `eyJ...` or publishable `sb_publishable_...`)

Restart the dev server after changing `.env`.

Never commit `.env` or service role keys.

## 2. Database schema

1. Open Supabase → **SQL Editor**.
2. Paste and run `supabase/schema.sql`.

This creates:

- `profiles` — display name, avatar, org, role  
- `user_progress` — **one row per user** with `progress` (JSON) and `points`  
- `user_badges` — earned badge ids (`first_module`, `halfway_hero`, `champion`, `expert`)  
- RLS policies so users only read/write their own rows  
- A trigger on `auth.users` to seed `profiles` and `user_progress` for new signups  

If you already created tables with a different shape (for example one row per module in `user_progress`), either migrate data to the single-row model or adjust the React code to match your schema.

## 3. Auth URLs

In **Authentication → URL configuration**, add your app URLs to **Redirect URLs**, for example:

- `http://localhost:5173/**`
- Your production origin (e.g. `https://your-app.vercel.app/**`)

Enable **Email** provider (or others you use) under Authentication → Providers.

## 4. Optional / legacy code

`src/services/database.js` and `src/services/badgeService.js` describe an alternate **per-module** `user_progress` layout and a `badges` catalog. The running app uses **`ProgressContext`** and **`BadgeContext`** instead; those two service files are not imported by the UI. You can ignore them or align them later if you want server-driven badge rules.

## 5. Quick verification

1. `npm run build` completes without errors.  
2. With `.env` set, sign up / sign in works.  
3. Completing a module updates XP on refresh (data in `user_progress`).  
4. Achievements insert rows into `user_badges` without RLS errors.
