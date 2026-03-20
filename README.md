# Freestyle Vite + shadcn + React Router + Supabase Template

Minimal Vite starter for sandbox testing with Supabase wired in using the official React quickstart flow.

## Stack
- Vite + React + TypeScript
- React Router
- Supabase JavaScript client
- shadcn/ui primitives (Button)
- Tailwind CSS

## Quick start
```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Set the following variables in `.env.local`:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## Database setup

Create an `instruments` table in your Supabase project and make it publicly readable:

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

## Build
```bash
pnpm build
pnpm preview
```

## Notes
- Dev server binds to `0.0.0.0:3000` for sandbox preview compatibility.
- The template renders setup instructions until Supabase environment variables are configured.
- This repo is intended to be consumed as a git template/submodule source.
