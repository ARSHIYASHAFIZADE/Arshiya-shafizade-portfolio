# Deployment Guide

## Prerequisites
- Node.js 18+
- Git
- GitHub account
- Render/Vercel account (for hosting)

## Local Development
```bash
npm install
npm run dev
```

## Build for Production
```bash
npm run build
npm run preview
```

## Deployment Steps

### Option 1: Render.com
1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push to main

### Option 2: Vercel
1. Import project from GitHub
2. Configure build settings
3. Deploy with automatic CI/CD

### Environment Variables
See `.env.example` for required variables.

### Monitoring
- Monitor performance with Lighthouse
- Track Core Web Vitals
- Set up error logging with Sentry
- Monitor uptime with UptimeRobot

## Rollback Procedure
Git allows easy rollback:
```bash
git revert <commit-hash>
git push origin main
```
