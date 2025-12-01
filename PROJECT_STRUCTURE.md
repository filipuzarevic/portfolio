# Project Structure

## Overview
This is a React + Vite portfolio website with integrated expense tracker functionality.

## Directory Structure

```
portfolio/
├── src/
│   ├── pages/
│   │   ├── Index.tsx              # Homepage
│   │   ├── ExpenseTracker.tsx     # Expense tracker main page (ACTIVE)
│   │   └── ...
│   ├── components/
│   │   ├── expense-tracker/
│   │   │   ├── expenses/
│   │   │   │   ├── ExpenseForm.jsx    # ⚠️ ACTIVE - app uses this
│   │   │   │   ├── ExpenseForm.tsx    # ⚠️ DUPLICATE - not used
│   │   │   │   ├── ExpenseList.jsx    # ⚠️ ACTIVE - app uses this
│   │   │   │   ├── ExpenseList.tsx    # ⚠️ DUPLICATE - not used
│   │   │   │   └── ExpenseFilters.jsx
│   │   │   ├── dashboard/
│   │   │   └── visualizations/
│   │   └── ui/                    # shadcn/ui components
│   ├── expense-tracker-utils/     # Shared utilities
│   │   ├── constants.ts
│   │   ├── types.ts
│   │   └── export.ts
│   └── integrations/
│       └── supabase/              # Database config
├── public/                        # Static assets
├── DEPLOYMENT.md                  # Deployment instructions
└── PROJECT_STRUCTURE.md           # This file
```

## ⚠️ Known Issues to Clean Up

### 1. Duplicate Files
- `ExpenseForm.tsx` and `ExpenseForm.jsx` both exist
- `ExpenseList.tsx` and `ExpenseList.jsx` both exist
- **The app uses `.jsx` files** - `.tsx` versions should be deleted

### 2. External Duplicate App
- `/Users/filipuzarevic/expense tracker/expense-tracker/` exists separately
- Should be archived or deleted to avoid confusion

## File Naming Conventions

- React components: PascalCase (e.g., `ExpenseForm.jsx`)
- Utilities: camelCase (e.g., `constants.ts`)
- Pages: PascalCase (e.g., `ExpenseTracker.tsx`)
- Use `.jsx` for JavaScript React components
- Use `.tsx` for TypeScript React components
- **Current state:** Mixed - needs consolidation

## Tech Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.1
- **Styling:** Tailwind CSS 3.4.11
- **UI Components:** shadcn/ui + Radix UI
- **Forms:** React Hook Form 7.53.0
- **Database:** Supabase 2.49.4
- **Charts:** Recharts 2.12.7
- **Routing:** React Router DOM 6.26.2
- **Deployment:** Vercel

## Important Notes

1. **Always work in the correct file:**
   - Check browser dev tools to see which file is being used
   - Look for `data-component-file` attribute in HTML

2. **Expense Tracker location:**
   - Live at: https://www.simpli-fi.me/expensetracker
   - Source: `/src/pages/ExpenseTracker.tsx`
   - Components: `/src/components/expense-tracker/`

3. **Styling:**
   - Tailwind utility classes preferred
   - For custom buttons with problematic classes, use inline styles
   - Avoid `bg-primary-*` classes (use explicit colors instead)

## Next Steps for Cleanup

See `DEPLOYMENT.md` for recommended cleanup tasks.
