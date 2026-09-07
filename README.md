# So Whopped FFL

The official website for the **So Whopped FFL** — a 14-year (and counting)
fantasy football dynasty league. Stats, rosters, records, full league history,
and a password-protected admin area for easy updates.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and
**Supabase** (Postgres + Auth).

- Clean navy & white design, black-on-white / white-on-navy.
- Modern, self-hosted web fonts (Inter + Space Grotesk) that load everywhere.
- Fully responsive, works great on phones.
- All content is editable from the admin dashboard — no code required.

---

## What's on the site

| Page | What it shows |
| --- | --- |
| **Home** | Reigning champion, key stats, all-time leaders, records, About/Rules |
| **Standings** | Final records & finishes, one season at a time |
| **Stats** | All-time career leaderboard (computed automatically) |
| **Rosters** | Every team's roster, by season |
| **Records** | League records grouped by category |
| **History** | Champions timeline + editable info blocks |
| **Admin** | Login + full create/edit/delete for everything |

---

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com), create a free project.
2. In the dashboard, open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and **Run** it. This creates
   all tables, security policies, and some sample data.

### 3. Add your environment variables

Copy the example file and fill in your project's values (found in
**Project Settings → API**):

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Create your admin account

Admins are just Supabase Auth users. To keep the league private:

1. **Authentication → Providers → Email** — turn **OFF**
   "Allow new users to sign up" (so only you can create accounts).
2. **Authentication → Users → Add user** — create yourself an account with a
   password. (Add a co-commissioner the same way if you like.)

### 5. Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Log in at
[http://localhost:3000/admin](http://localhost:3000/admin).

---

## Editing your league data

Everything is managed from **/admin**:

1. **Managers** — add every league member first.
2. **Seasons** — one per year; pick the champion, runner-up, etc.
3. **Teams** — each manager's team for a season, with W/L/T and points.
4. **Rosters** — add players to any team.
5. **Records** — league records shown on the Records page.
6. **Site Content** — the About / Rules / Payouts text blocks.

> **All-time stats are automatic.** The Stats page and the "All-Time Leaders"
> table compute wins, championships, and win % from your season/team data —
> you never enter totals by hand.

---

## How security works

The database uses Postgres **Row Level Security**:

- **Anyone** can *read* league data (that's the public site).
- **Only signed-in users** (your admins) can *create, edit, or delete*.

The Supabase anon key is safe to expose in the browser — RLS is what protects
your data. Never commit a `service_role` key; this project doesn't use one.

---

## Deploying (Vercel — recommended)

1. Push this repo to GitHub.
2. Import it at [vercel.com](https://vercel.com) → **New Project**.
3. Add the two environment variables from `.env.local` in the Vercel project
   settings.
4. Deploy. In Supabase, add your Vercel URL under
   **Authentication → URL Configuration → Site URL / Redirect URLs**.

Any host that runs Next.js (Netlify, Render, a VPS, etc.) works too.

---

## Project structure

```
src/
  app/
    page.tsx              Home
    standings/            Standings
    stats/                All-time stats
    rosters/              Rosters
    records/              Records
    history/              History + info
    admin/                Auth-protected dashboard + CRUD
  components/             Nav, Footer, shared UI, admin table editor
  lib/
    data.ts               Data fetching + stat calculations
    types.ts              Shared types
    supabase/             Browser / server / middleware clients
supabase/
  schema.sql              Run this in Supabase to set everything up
public/                   Logo variants + icon
```

---

## Notes

- The site renders fine **before** Supabase is connected — you'll see sample
  content and a reminder to finish setup.
- Adding external stats APIs later is easy; the data layer in `src/lib/data.ts`
  is the single place to extend.

Built for the league, by the league. 🏆
