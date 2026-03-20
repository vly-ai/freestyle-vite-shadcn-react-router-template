import { useEffect, useState } from "react";
import { Link, Outlet, createBrowserRouter } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { isSupabaseConfigured, supabase, type Instrument } from "@/lib/supabase";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8 sm:px-8">
        <header className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Vite Template</p>
            <h1 className="text-2xl font-semibold tracking-tight">React Router + shadcn + Supabase</h1>
          </div>
          <nav className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/about">About</Link>
            </Button>
          </nav>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function HomePage() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const client = supabase;
    let isActive = true;

    async function getInstruments() {
      setIsLoading(true);

      const { data, error } = await client.from("instruments").select("id, name").order("id");

      if (!isActive) {
        return;
      }

      if (error) {
        setErrorMessage(error.message);
        setInstruments([]);
      } else {
        setErrorMessage(null);
        setInstruments(data ?? []);
      }

      setIsLoading(false);
    }

    void getInstruments();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.95fr)]">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Supabase Quickstart</p>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Query live data from your Vite starter</h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            This template follows the official Supabase React setup: add your project URL and publishable key,
            create the sample <code>instruments</code> table, and the homepage will fetch rows on load.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href="https://supabase.com/docs/guides/getting-started/quickstarts/reactjs" target="_blank" rel="noreferrer">
              Open Supabase Docs
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/about">Template notes</Link>
          </Button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-500">Environment variables</p>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">
            <code>{`VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key`}</code>
          </pre>
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Sample query</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Instruments</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600">
              {isSupabaseConfigured ? "Configured" : "Needs env"}
            </span>
          </div>

          {!isSupabaseConfigured ? (
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>
                Copy <code>.env.example</code> to <code>.env.local</code> and add your Supabase credentials.
              </p>
              <p>Then run the SQL snippet from the README or Supabase quickstart to create the sample table.</p>
            </div>
          ) : null}

          {isLoading ? <p className="mt-4 text-sm text-slate-600">Loading instruments...</p> : null}

          {errorMessage ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <p className="font-medium">Supabase responded with an error.</p>
              <p className="mt-2">{errorMessage}</p>
            </div>
          ) : null}

          {!isLoading && !errorMessage && instruments.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {instruments.map((instrument) => (
                <li
                  key={instrument.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="font-medium text-slate-900">{instrument.name}</span>
                  <span className="text-sm text-slate-500">#{instrument.id}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {!isLoading && !errorMessage && isSupabaseConfigured && instruments.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">No instruments found yet. Seed the table in Supabase and refresh.</p>
          ) : null}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-slate-100 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">What changed</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <li>Supabase client dependency installed for browser-side queries.</li>
            <li>Typed client helper added under <code>src/lib/supabase.ts</code>.</li>
            <li>Template README and env scaffolding updated for project setup.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]">
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">About this template</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">A small starter that is ready for Supabase</h2>
        <p className="text-base leading-7 text-slate-600">
          The repo keeps the original Vite, React Router, shadcn, and Tailwind stack, then layers in the Supabase
          client using Vite environment variables so downstream projects can start querying data immediately.
        </p>
        <p className="text-base leading-7 text-slate-600">
          Until credentials are present, the homepage renders setup guidance instead of throwing at runtime. That makes
          the repository safer to use as a template or submodule source.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Setup checklist</p>
        <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          <li>1. Install dependencies with <code>pnpm install</code>.</li>
          <li>2. Copy <code>.env.example</code> to <code>.env.local</code>.</li>
          <li>3. Add your project URL and publishable key.</li>
          <li>4. Create the sample <code>instruments</code> table and RLS policy.</li>
          <li>5. Start the app with <code>pnpm dev</code>.</li>
        </ol>
      </div>
    </section>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);
