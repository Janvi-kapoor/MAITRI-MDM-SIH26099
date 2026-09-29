import { useNavigate } from "@tanstack/react-router";
import { useStore, StoreProvider } from "../lib/store";
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
            search={{ view: "command" }}
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
    const [searchOpen, setSearchOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const handleSearchSelect = (scenario: string) => {
    setSearchOpen(false);
    navigate({ to: "/", search: { view: "intake", scenario } });
  };
const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
      <div className="app-shell">
        <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
          <div className="brand-lockup">
              <div className="brand-mark" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', color: 'white', padding: '6px', borderRadius: '8px' }}><Network size={22} strokeWidth={2.5} /></div>
              <div><strong style={{ background: 'linear-gradient(to right, #ffffff, #bfdbfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MAITRI-MDM</strong><span>Material Identity Network</span></div>
              <button className="mobile-close" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X size={18} /></button>
            </div>
          <div className="tenant-panel"><span className="tenant-logo">N</span><div><strong>National CPSE Network</strong><span>Prototype workspace</span></div><ChevronDown size={14} /></div>
          <nav className="sidebar-nav" aria-label="Primary navigation">
            <span className="nav-label">Workspace</span>
            <Link to="/" search={{ view: "command" }} activeOptions={{ exact: true, includeSearch: true }} onClick={() => setMobileOpen(false)}><CircleGauge /><span>Command Center</span></Link>
            <Link to="/" search={{ view: "intake" }} activeOptions={{ exact: true, includeSearch: true }} onClick={() => setMobileOpen(false)}><Sparkles /><span>Material Intake</span><b>4</b></Link>
            <Link to="/" search={{ view: "validation" }} activeOptions={{ exact: true, includeSearch: true }} onClick={() => setMobileOpen(false)}><BookOpenCheck /><span>Engineering Proof</span><b>12</b></Link>
            <Link to="/" search={{ view: "governance" }} activeOptions={{ exact: true, includeSearch: true }} onClick={() => setMobileOpen(false)}><ShieldCheck /><span>Governance</span><b>7</b></Link>
            <Link to="/" search={{ view: "identity" }} activeOptions={{ exact: true, includeSearch: true }} onClick={() => setMobileOpen(false)}><Boxes /><span>Material Identity</span></Link>
            <span className="nav-label nav-gap">Intelligence & control</span>
            <Link to="/" search={{ view: "signals" }} activeOptions={{ exact: true, includeSearch: true }} onClick={() => setMobileOpen(false)}><Database /><span>Demand & Stock</span></Link>
            <Link to="/" search={{ view: "audit" }} activeOptions={{ exact: true, includeSearch: true }} onClick={() => setMobileOpen(false)}><FileClock /><span>Audit & Lineage</span></Link>
            <Link to="/" search={{ view: "health" }} activeOptions={{ exact: true, includeSearch: true }} onClick={() => setMobileOpen(false)}><HeartPulse /><span>System Health</span></Link>
          </nav>
          <div className="sidebar-principle"><ShieldCheck size={18} /><div><strong>Human-governed decisions</strong><span>Similarity is a candidate — not a decision.</span></div></div>
          </aside>
        {mobileOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
        <div className="workspace">
          <header className="topbar">
            <button className="menu-button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
            <div className="global-search" style={{ position: 'relative' }}>
              <Search size={17} />
              <input 
                aria-label="Global search" 
                placeholder="Search material ID, local code or description" 
                onFocus={() => setSearchOpen(true)}
                
              />
              <kbd>⌘ K</kbd>
              {searchOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', marginTop: '4px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, padding: '4px' }}>
                  <div style={{ padding: '8px 10px', fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}><span>Demo Scenarios</span><button onClick={() => setSearchOpen(false)} style={{cursor: 'pointer', background: 'none', border: 'none', color: '#64748b'}}>✕</button></div>
                  <div style={{ padding: '8px 10px', cursor: 'pointer', fontSize: '12px', color: '#0f172a', borderRadius: '4px' }} onClick={() => handleSearchSelect('match')} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <strong>MR-2026-1842</strong> <span style={{ color: '#64748b' }}>- Exact Match (Happy Path)</span>
                  </div>
                  <div style={{ padding: '8px 10px', cursor: 'pointer', fontSize: '12px', color: '#0f172a', borderRadius: '4px' }} onClick={() => handleSearchSelect('conflict')} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <strong>MR-2026-3091</strong> <span style={{ color: '#64748b' }}>- Hard Conflict (SCH 40 vs 80)</span>
                  </div>
                  <div style={{ padding: '8px 10px', cursor: 'pointer', fontSize: '12px', color: '#0f172a', borderRadius: '4px' }} onClick={() => handleSearchSelect('review')} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <strong>MR-2026-0099</strong> <span style={{ color: '#64748b' }}>- Missing Attribute (Review req.)</span>
                  </div>
                  <div style={{ padding: '8px 10px', cursor: 'pointer', fontSize: '12px', color: '#0f172a', borderRadius: '4px' }} onClick={() => handleSearchSelect('valves')} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <strong>MR-2026-1839</strong> <span style={{ color: '#64748b' }}>- Valve Conflict (Class 150 vs 300)</span>
                  </div>
                </div>
              )}
            </div>
            <div className="topbar-actions flex items-center gap-2"><span className="demo-badge"><span /> Demo environment</span><button aria-label="Alerts" className="icon-button"><AlertTriangle size={18} /></button><button aria-label="Notifications" className="icon-button has-dot"><Bell size={18} /></button><div className="w-px h-6 bg-border mx-1"></div><RoleSwitcher /></div>
          </header>
          <main><Outlet /></main>
          <footer>Prototype mode <i /> Synthetic material data <i /> Mock SAP/ERP connectors <i /> <strong>MAITRI informs; CPSE decides & executes.</strong></footer>
        </div>
      </div>
      </StoreProvider>
    </QueryClientProvider>
  );
}


function RoleSwitcher() {
  const { role, setRole } = useStore();
  const [open, setOpen] = React.useState(false);
  const getAvatar = (r: string) => r === "Requester" ? "RQ" : r === "Engineer" ? "EG" : "AP";
  const getName = (r: string) => r === "Requester" ? "S. Verma" : r === "Engineer" ? "R. Iyer" : "A. Mehta";

  return (
    <div style={{ position: 'relative' }}>
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px' }} 
        onClick={() => setOpen(!open)}
      >
        <div style={{ background: '#e0e7ff', color: '#1e40af', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
          {getAvatar(role)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginRight: '8px' }}>
          <strong style={{ color: '#111827', fontSize: '12px', lineHeight: 1 }}>{getName(role)}</strong>
          <span style={{ color: '#6b7280', fontSize: '10px' }}>{role}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}><path d="m6 9 6 6 6-6"/></svg>
      </div>
      
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', width: '190px', background: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 50, padding: '4px 0', overflow: 'hidden' }}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '4px', background: '#f8fafc' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Switch Role</p>
            </div>
            {(["Requester", "Engineer", "Approver"] as const).map((r) => (
              <div 
                key={r}
                style={{ padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: role === r ? '#eff6ff' : 'transparent' }}
                onClick={() => { setRole(r); setOpen(false); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ background: role === r ? '#bfdbfe' : '#e2e8f0', color: role === r ? '#1e40af' : '#475569', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                    {getAvatar(r)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: role === r ? '#1d4ed8' : '#334155', lineHeight: 1 }}>{getName(r)}</span>
                    <span style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{r}</span>
                  </div>
                </div>
                {role === r && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
