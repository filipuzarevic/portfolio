# Deployment Guide

## Current Setup

- **Live URL:** https://www.simpli-fi.me
- **Vercel Account:** filips-projects-0dee303f
- **Project Name:** portfolio
- **Branch:** main (auto-deploys on push)

## Deployment Tokens

**Active Token (KB8P6pydtWcawvJgTP8elnlL):**
- Account: filips-projects-0dee303f
- Domain: simpli-fi.me
- Status: Active
- Use this for manual deployments

**Old Tokens (DO NOT USE):**
- 7ObbQvM3NVuTgJoC68J9YORX (different account)
- za8NoDLdkZb91H3kavZABuIn (deprecated)

## Manual Deployment

```bash
# Always commit changes first!
git add .
git commit -m "Your message"
git push

# Manual deployment (if auto-deploy fails)
npx vercel --prod --yes --token KB8P6pydtWcawvJgTP8elnlL
```

## Pre-Deployment Checklist

- [ ] All changes committed to git
- [ ] Changes pushed to GitHub
- [ ] Build passes locally: `npm run build`
- [ ] Dev server works: `npm run dev`
- [ ] No large files in dist (>100MB total)

## Troubleshooting

**Changes not appearing:**
1. Check git status - are changes committed?
2. Check Vercel dashboard - did deployment succeed?
3. Clear browser cache (Cmd+Shift+R)
4. Wait 2-3 minutes for CDN propagation

**Build failures:**
1. Check node_modules size
2. Verify .vercelignore excludes large files
3. Check build logs in Vercel dashboard
