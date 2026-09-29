import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import React, { useEffect, type ReactNode } from "react";
import { AlertTriangle, Bell, BookOpenCheck, Boxes, ChevronDown, CircleGauge, Database, FileClock, HeartPulse, Menu, Network, Search, ShieldCheck, Sparkles, X } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MAITRI-MDM — Material Identity Governance" },
      { name: "description", content: "Governed material identity and traceability for inter-CPSE reconciliation." },
      { name: "author", content: "Code Catalyst / SSISM" },
      { property: "og:title", content: "MAITRI-MDM — Material Identity Governance" },
      { property: "og:description", content: "Find candidates, prove compatibility, and govern material identity decisions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-shell">
        <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
          <div className="brand-lockup">
            <div className="brand-mark"><Network size={21} /></div>
            <div><strong>MAITRI-MDM</strong><span>Material Identity Network</span></div>
            <button className="mobile-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={18} /></button>
          </div>
          <div className="tenant-panel"><span className="tenant-logo">N</span><div><strong>National CPSE Network</strong><span>Prototype workspace</span></div><ChevronDown size={14} /></div>
          <nav className="sidebar-nav" aria-label="Primary navigation">
            <span className="nav-label">Workspace</span>
            <Link to="/" search={{ view: "command" }} activeOptions={{ exact: true }} onClick={() => setMobileOpen(false)}><CircleGauge /><span>Command Center</span></Link>
            <Link to="/" search={{ view: "intake" }} onClick={() => setMobileOpen(false)}><Sparkles /><span>Material Intake</span><b>4</b></Link>
            <Link to="/" search={{ view: "validation" }} onClick={() => setMobileOpen(false)}><BookOpenCheck /><span>Engineering Proof</span><b>12</b></Link>
            <Link to="/" search={{ view: "governance" }} onClick={() => setMobileOpen(false)}><ShieldCheck /><span>Governance</span><b>7</b></Link>
            <Link to="/" search={{ view: "identity" }} onClick={() => setMobileOpen(false)}><Boxes /><span>Material Identity</span></Link>
            <span className="nav-label nav-gap">Intelligence & control</span>
            <Link to="/" search={{ view: "signals" }} onClick={() => setMobileOpen(false)}><Database /><span>Demand & Stock</span></Link>
            <Link to="/" search={{ view: "audit" }} onClick={() => setMobileOpen(false)}><FileClock /><span>Audit & Lineage</span></Link>
            <Link to="/" search={{ view: "health" }} onClick={() => setMobileOpen(false)}><HeartPulse /><span>System Health</span></Link>
          </nav>
          <div className="sidebar-principle"><ShieldCheck size={18} /><div><strong>Human-governed decisions</strong><span>Similarity is a candidate — not a decision.</span></div></div>
          <div className="user-card"><div className="avatar">AK</div><div><strong>Arjun Khanna</strong><span>National Material Steward</span></div><ChevronDown size={14} /></div>
        </aside>
        {mobileOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
        <div className="workspace">
          <header className="topbar">
            <button className="menu-button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
            <div className="global-search"><Search size={17} /><input aria-label="Global search" placeholder="Search material ID, local code or description" /><kbd>⌘ K</kbd></div>
            <div className="topbar-actions"><span className="demo-badge"><span /> Demo environment</span><button aria-label="Alerts" className="icon-button"><AlertTriangle size={18} /></button><button aria-label="Notifications" className="icon-button has-dot"><Bell size={18} /></button></div>
          </header>
          <main><Outlet /></main>
          <footer>Prototype mode <i /> Synthetic material data <i /> Mock SAP/ERP connectors <i /> <strong>MAITRI informs; CPSE decides & executes.</strong></footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}
