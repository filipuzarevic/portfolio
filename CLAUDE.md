# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, TypeScript, and Vite, featuring an integrated expense tracker application. The site is deployed to Vercel at https://www.simpli-fi.me.

## Development Commands

### Running the Application
```bash
npm run dev              # Start dev server on port 3000
npm run build            # Production build
npm run build:dev        # Development build
npm run preview          # Preview production build locally
npm run lint             # Run ESLint with React hooks and React Refresh plugins
```

### Deployment
```bash
npm run deploy           # Build and deploy to Vercel with pre-configured token
npm run deploy:check     # Check for uncommitted changes before deploying
```

The project uses Husky pre-commit hooks that run `npm run lint --max-warnings=0` (but will not block commits due to `|| true`).

## Architecture

### Application Structure

The app uses **React Router** with lazy-loaded route components for optimal bundle size. All routes are defined in `src/App.tsx` with React's `lazy()` and `Suspense`.

**Important routing rule**: ALL custom routes must be added ABOVE the catch-all `*` route (NotFound page) in `src/App.tsx:32-44`, or they will not work.

### Main Entry Points
- `src/main.tsx` - Application entry point
- `src/App.tsx` - Router configuration and global providers (React Query, Toasts, Tooltips)
- `src/pages/` - Page components (lazy-loaded)

### State Management
- **React Query** (`@tanstack/react-query`) - Server state and data fetching
- **Supabase Client** (`src/integrations/supabase/client.ts`) - Database connection and authentication

### Key Pages
- `/` - Homepage (`src/pages/Index.tsx`)
- `/expensetracker` - Expense tracker app with auth (`src/pages/ExpenseTracker.tsx`)
- `/contact` - Contact form using Web3Forms API
- `/profitpatterns` - R Shiny app showcase
- `/crypto_report` - Crypto analysis project
- `/tictactoe` - Interactive game

## Expense Tracker Feature

The expense tracker is a full-featured financial management application integrated into the portfolio.

### Architecture
```
src/components/expense-tracker/
├── auth/              # Authentication (ProtectedRoute.jsx)
├── expenses/          # Expense CRUD operations
│   ├── ExpenseForm.jsx    ⚠️ ACTIVE FILE (app uses this)
│   ├── ExpenseList.jsx    ⚠️ ACTIVE FILE (app uses this)
│   └── ExpenseFilters.jsx/tsx (both exist)
├── dashboard/         # Summary stats and export functionality
│   ├── Summary.jsx/tsx (both exist)
│   └── ExportButtons.jsx/tsx (both exist)
└── visualizations/    # Charts (ExpenseCharts.jsx)
```

**CRITICAL: .jsx vs .tsx Files**
- The app currently uses `.jsx` versions of ExpenseForm and ExpenseList
- Duplicate `.tsx` versions exist but are NOT used
- When editing expense tracker components, always check which file extension is actually imported
- Future cleanup: consolidate to TypeScript (.tsx) files

### Expense Tracker Data Flow
1. User authentication via Supabase Auth (`src/hooks/expense-tracker/useAuth.ts`)
2. Protected routes ensure only authenticated users access the tracker
3. Expenses stored in Supabase `expenses` table with Row Level Security (RLS)
4. Categories defined in `src/expense-tracker-utils/constants.ts` (13 categories + colors)
5. Export functionality supports CSV and Excel formats

### Database Schema
The `expenses` table (Supabase):
- `id` - UUID primary key
- `user_id` - Foreign key to auth.users (enforces user isolation)
- `amount` - NUMERIC(10,2)
- `description` - TEXT
- `category` - TEXT (from EXPENSE_CATEGORIES)
- `date` - DATE
- `created_at` - TIMESTAMPTZ

RLS policies ensure users only see their own expenses.

## Styling System

### Tailwind Configuration
- **Design System**: Custom `agency` color palette (navy, charcoal, slate, blue, etc.)
- **CSS Variables**: shadcn/ui theming via CSS custom properties
- **Safelist**: Important utility classes (bg-blue-600, hover:bg-blue-700) are safelisted to prevent purging
- **Animations**: 20+ custom animations defined (fade-up, zoom-in, float, etc.)

### Styling Best Practices
1. **Use Tailwind utility classes** for consistency
2. **Avoid `bg-primary-*` classes** - use explicit colors (bg-blue-600) or agency palette (bg-agency-navy)
3. **For buttons with dynamic classes**: Consider inline styles if Tailwind classes cause issues
4. **Agency palette**: Defined in `tailwind.config.ts:76-85` for brand consistency

## Component Library

- **UI Framework**: shadcn/ui components in `src/components/ui/`
- **Icons**: lucide-react
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts for data visualization
- **Toasts**: Sonner + shadcn toast
- **Carousel**: Embla Carousel React

## Path Aliases

Vite is configured with `@` alias pointing to `src/`:
```typescript
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
```

## Environment Variables

### Required Variables
- `VITE_WEB3FORMS_ACCESS_KEY` - Contact form API key (Web3Forms)

### Supabase Configuration
Supabase credentials are hardcoded in `src/integrations/supabase/client.ts` (auto-generated file). The project uses:
- URL: `https://aqwxunlhnynwrrsdabvj.supabase.co`
- Published key is in the file (safe for client-side use)

## Deployment

### Vercel Configuration
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- Rewrites: All routes → `/index.html` (SPA mode)

### Deployment Token
The active Vercel token is embedded in `package.json` deploy scripts. Do not commit new tokens without updating the scripts.

### Important Files
- `.vercelignore` - Controls which files are excluded from deployment
- `vercel.json` - Vercel build and routing configuration
- `DEPLOYMENT.md` - Manual deployment guide and troubleshooting

### Pre-Deployment Checklist
1. Run `npm run build` locally to verify build succeeds
2. Check for uncommitted changes (`git status`)
3. Ensure large files are in `.vercelignore`
4. Push to GitHub (triggers auto-deploy) OR use `npm run deploy`

## Known Issues and Cleanup Tasks

### File Duplication
Multiple components exist in both `.jsx` and `.tsx` formats:
- `ExpenseForm.jsx` / `ExpenseForm.tsx`
- `ExpenseList.jsx` / `ExpenseList.tsx`
- `Summary.jsx` / `Summary.tsx`
- `ExportButtons.jsx` / `ExportButtons.tsx`

**Current state**: The app imports `.jsx` versions. `.tsx` versions should be deleted after verifying no references exist.

### External Files
An external `/Users/filipuzarevic/expense tracker/` directory exists outside the portfolio repo. This should be archived to avoid confusion.

## Additional Documentation

- `PROJECT_STRUCTURE.md` - Detailed file structure and tech stack
- `DEPLOYMENT.md` - Deployment tokens and manual deployment guide
- `SETUP_INSTRUCTIONS.md` - Web3Forms contact form setup
- `EXPENSE_TRACKER_SETUP.md` - Supabase database setup for expenses table

## Special Directories

- `public/` - Static assets (logos, videos, images)
- `r_code/` - R scripts for Profit Patterns Shiny app
- `supabase/` - Supabase type definitions
- `photo/` - Personal photos for About page
