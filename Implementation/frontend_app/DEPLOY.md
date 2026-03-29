# Launch CyberAware as a live website

This app is a **Vite + React** single-page application. Build output is the `dist/` folder. Use any static host; **Vercel** and **Netlify** are the fastest paths and already configured in this folder.

## Before you deploy

1. **Environment variables** (required for login, progress, badges):

   | Name | Where to get it |
   |------|-----------------|
   | `VITE_SUPABASE_URL` | Supabase → Project Settings → API |
   | `VITE_SUPABASE_ANON_KEY` | Same page (anon public key) |

2. **Supabase Auth URLs** (so sign-in works on your real domain):

   - Supabase → **Authentication** → **URL configuration**
   - **Site URL**: `https://your-domain.com`
   - **Redirect URLs**: add `https://your-domain.com/**` and `http://localhost:5173/**` for local dev

3. **Repository**: Push `frontend_app` (or the whole repo) to GitHub/GitLab/Bitbucket if the host asks for a connected repo.

---

## Option A — Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in.
2. **Add New Project** → import your Git repository.
3. Set **Root Directory** to `frontend_app` (if the repo contains more than this app).
4. Framework: **Vite** (auto-detected). Use the default production build and set the output folder to **`dist`**.
5. **Environment Variables**: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6. Deploy. You get a URL like `https://cyberaware-xxx.vercel.app` and can attach a custom domain under **Project → Settings → Domains**.

`vercel.json` in this folder sets SPA rewrites so routes like `/modules` work after refresh.

---

## Option B — Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**.
2. Root directory: `frontend_app` if needed.
3. In the site settings, use your host’s defaults for a Vite project (production build, publish **`dist`**).
4. **Site settings → Environment variables**: add the two `VITE_*` variables.
5. Deploy. Custom domain: **Domain management**.

`netlify.toml` and `public/_redirects` handle client-side routing.

---

## Option C — Cloudflare Pages

1. **Workers & Pages** → **Create** → **Pages** → Connect Git.
2. Configure a Vite-style production build with output directory **`dist`**, using root **`frontend_app`** if applicable.
3. **Settings → Environment variables**: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Add a **Single Page Application** rule: `/*` → `200` → `/index.html` (or use Cloudflare’s SPA setting).

---

## Option D — Any static host (S3, nginx, etc.)

1. Produce a production build from the `frontend_app` project (Vite’s standard production build).
2. Upload the contents of **`dist/`** (not the folder name itself, unless your server expects it).
3. Configure the server so **unknown paths** return **`index.html`** with status **200** (SPA fallback). Without this, refreshing `/dashboard` will 404.

---

## Verify locally before going live

From the `frontend_app` directory, run a production build and a local preview using the scripts defined in **`package.json`** (Vite’s usual build and preview flow). Open the URL your tool prints and test login and navigation.

---

## Custom domain checklist

- Add the domain in your host (Vercel/Netlify/Cloudflare).
- Point DNS (CNAME or A records) as the host instructs.
- Update Supabase **Site URL** and **Redirect URLs** to the production HTTPS URL.
