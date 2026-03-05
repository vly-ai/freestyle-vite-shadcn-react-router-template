import { Link, Outlet, createBrowserRouter } from "react-router-dom";

import { Button } from "@/components/ui/button";

function Layout() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col p-6">
      <header className="mb-8 flex items-center justify-between border-b pb-4">
        <h1 className="text-lg font-semibold">Freestyle Sandbox Template</h1>
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
  );
}

function HomePage() {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold">It works</h2>
      <p className="text-muted-foreground">
        This is a basic Vite + React Router + shadcn static site template.
      </p>
      <Button>shadcn Button</Button>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold">About</h2>
      <p className="text-muted-foreground">
        Use this repo as a base for Freestyle sandbox provisioning tests.
      </p>
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
