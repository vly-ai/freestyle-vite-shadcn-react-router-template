# Freestyle Vite + shadcn + React Router + Supabase Template

This repo is a small frontend starter built with Vite, React, TypeScript, React Router, Tailwind, and shadcn/ui. Supabase is installed and wired into the client, but the project is still intentionally minimal.

At the moment this template gives you:

- a browser-ready Supabase client
- Vite environment variable wiring
- a sample homepage query against `public.instruments`
- basic setup instructions for getting the app connected

What it does **not** include yet:

- a local `supabase/` directory managed by the Supabase CLI
- database migrations or seed scripts in-repo
- Auth UI flows
- Storage upload UI
- Edge Functions
- any separate backend/server application

In other words, this is a new basic frontend repo with Supabase installed, not a full Supabase backend project yet.

## How the repo works

The template is structured like this:

- `src/router.tsx`: App routes and the sample homepage that loads data from Supabase
- `src/lib/supabase.ts`: Supabase client creation and lightweight local types
- `.env.example`: required client environment variables
- `package.json`: Vite scripts and the `@supabase/supabase-js` dependency

The app reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the Vite environment. If those values are missing, the app stays usable and renders setup guidance instead of crashing. Once they are present, the homepage runs a sample query against the `instruments` table.

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

If you are editing this template while it lives inside another `pnpm` workspace, use:

```bash
pnpm install --ignore-workspace
pnpm --ignore-workspace dev
```

## Configure Supabase environment

### 1. Create a Supabase project

Create a project in the Supabase dashboard:

- React quickstart: [Use Supabase with React](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

### 2. Get your project URL and browser-safe key

This template expects:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

You can get those values from:

- the project's Connect dialog in the dashboard, as shown in the React quickstart
- the API keys page: [Understanding API keys](https://supabase.com/docs/guides/api/api-keys)

Important:

- use the **publishable** key for browser code
- do **not** put a `service_role` or secret key in this repo or any client bundle
- if you are working from an older project that still uses the legacy `anon` key, that is still a client-safe key, but this template names the env var `VITE_SUPABASE_PUBLISHABLE_KEY`

### 3. Set the env vars locally

Copy `.env.example` to `.env.local` and fill in your real values:

```bash
cp .env.example .env.local
```

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 4. Restart the dev server

After changing `.env.local`, restart Vite so the new values are loaded.

## Sample database setup

The homepage expects a public `instruments` table. You can create it in the Supabase SQL Editor:

```sql
create table instruments (
  id bigint primary key generated always as identity,
  name text not null
);

insert into instruments (name)
values
  ('violin'),
  ('viola'),
  ('cello');

alter table instruments enable row level security;

create policy "public can read instruments"
on public.instruments
for select to anon
using (true);
```

This is only a demo table to prove the client is connected. For a real app, you should replace this with your own schema and write stricter Row Level Security policies.

Relevant docs:

- React quickstart: [Use Supabase with React](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- API security and RLS guidance: [Securing your API](https://supabase.com/docs/guides/api/securing-your-api)
- RLS overview: [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

## Basic Supabase how-tos

### Auth

This repo does not ship an auth flow yet. To add one, start with the official React auth guide and then choose the sign-in methods you need.

- React auth quickstart: [Use Supabase Auth with React](https://supabase.com/docs/guides/auth/quickstarts/react)
- Auth docs overview: [Auth](https://supabase.com/docs/guides/auth)
- Social login: [Social Login](https://supabase.com/docs/guides/auth/social-login)
- MFA: [Multi-Factor Authentication](https://supabase.com/docs/guides/auth/auth-mfa)

Typical next steps for auth in this repo:

1. Create auth screens and session handling.
2. Protect routes based on the current user.
3. Replace the demo public query with user-scoped RLS policies.

### Storage

This repo does not include any bucket setup or upload UI yet. Supabase Storage is available once your project is configured.

- Storage quickstart: [Storage Quickstart](https://supabase.com/docs/guides/storage/quickstart)
- Standard uploads: [Standard Uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads)
- Storage access control: [Storage Access Control](https://supabase.com/docs/guides/storage/security/access-control)
- Storage overview: [Storage](https://supabase.com/docs/guides/storage)

Typical next steps for storage in this repo:

1. Create one or more buckets in Supabase.
2. Add RLS policies on `storage.objects`.
3. Build upload/list/delete UI in the frontend.

### Database and schema management

Right now the sample schema is documented in this README only. There are no checked-in migrations yet.

- Local development and CLI: [Local Development & CLI](https://supabase.com/docs/guides/local-development)
- CLI getting started: [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started)
- Database migrations: [Database Migrations](https://supabase.com/docs/guides/deployment/database-migrations)
- Managing environments: [Managing Environments](https://supabase.com/docs/guides/deployment/managing-environments)
- Generating types: [Generating TypeScript Types](https://supabase.com/docs/guides/api/rest/generating-types)

If you want this repo to become a full Supabase-backed application, a good next step is:

1. Install and initialize the Supabase CLI.
2. Add `supabase/` config to the repo.
3. Move schema changes into migrations.
4. Generate database types instead of maintaining hand-written table types.

### Edge Functions and server-side work

This template currently has no backend code. If you need trusted server-side logic, webhook handlers, admin operations, or anything that must use privileged keys, add Edge Functions or another server environment.

- Edge Functions quickstart: [Getting Started with Edge Functions](https://supabase.com/docs/guides/functions/quickstart)
- Edge Functions overview: [Edge Functions](https://supabase.com/docs/guides/functions)
- Securing functions: [Securing Edge Functions](https://supabase.com/docs/guides/functions/auth)

Use server-side code for things like:

- working with `service_role` keys
- calling third-party APIs with secrets
- privileged writes that should never happen directly from the browser

## Current state of this template

This template is best thought of as:

- a frontend starter
- with Supabase client access already installed
- but without the repo-level backend infrastructure fully set up yet

That is intentional. It keeps the starter easy to understand while still giving you a clean path to add Auth, Storage, migrations, and server-side functionality as the project grows.

## Build

```bash
pnpm build
pnpm preview
```

## Notes

- The dev server binds to `0.0.0.0:3000` for sandbox preview compatibility.
- The homepage is only a connectivity example, not a production data model.
- Do not expose privileged Supabase keys in client code.
- This repo is intended to be consumed as a git template/submodule source.
