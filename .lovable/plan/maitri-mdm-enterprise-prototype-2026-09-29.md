# MAITRI-MDM Enterprise Prototype

## Goal
Build a polished, responsive material-governance application for the SIH judge demo, grounded in the supplied presentation and the “Find → Prove → Govern” model.

## Product experience
- Create a persistent enterprise shell with collapsible navigation, product header, search, demo-environment indicator, notifications, and a premium user profile menu.
- Make the Command Center the first screen, with actionable operating metrics, review queues, recent decisions, CPSE distribution, material categories, and system status.
- Build the complete interactive journey: material intake → candidate retrieval → engineering proof → maker-checker governance → active Material Identity Passport → evidence and lineage.
- Include one-click demo scenarios for successful match, critical schedule conflict, missing attribute review, and no suitable candidate.
- Add concise supporting decision views for demand, audit, and resilience; keep secondary modules lightweight rather than overbuilding them.
- Ensure all navigation and primary actions work, with realistic synthetic data and clear prototype/demo labels.

## Visual direction
- Desktop-first enterprise control room: deep navy navigation, blue primary actions, restrained indigo intelligence accents, cool light workspace.
- Compact panels, thin borders, subtle shadows, dense readable tables, precise status language, and IBM Plex Sans typography.
- Green only for approved/healthy states, amber for review, red for hard engineering conflicts.
- Adapt the shell, tables, comparisons, drawers, and forms for tablet and mobile without merely shrinking desktop layouts.

## Technical details
- Keep the experience frontend-only with deterministic local matching and in-memory React state; implement graceful fallback behavior without requiring any external AI key.
- Use TanStack Router routes for each major workspace and shared application chrome at the root.
- Centralize synthetic material records and workflow logic so every page reflects the same decisions and identity state.
- Add route-specific titles and descriptions, then verify the full judge flow and responsive rendering in the live preview.
