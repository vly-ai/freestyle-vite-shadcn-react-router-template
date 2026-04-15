# App Template

A minimal React starter with Supabase, Tailwind, and shadcn/ui.

## What's included

- Supabase client wired up via environment variables
- React Router with a sample homepage query
- Tailwind CSS + shadcn/ui components
- TypeScript

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Environment variables

Add your Supabase credentials to `.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Get these from the **Connect** dialog or API keys page in your Supabase dashboard.

Use the **publishable** key only — never put a `service_role` key in client code.

## Sample table

The homepage queries a public `instruments` table. Create it in the SQL Editor:

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

Replace this with your own schema for a real app.

## Build

```bash
pnpm build
pnpm preview
```

## Notes

- Dev server binds to `0.0.0.0:3000`.
- Do not expose privileged Supabase keys in client code.
