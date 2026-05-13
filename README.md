# MD Arsalan Portfolio

Premium Next.js portfolio for MD Arsalan, built with animated canvas storytelling, Three.js particles, Dribbble work thumbnails, and conversion-focused portfolio sections.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- GSAP / ScrollTrigger
- Three.js

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Check

```bash
npm run lint
npm run build
```

## Vercel Deployment

This project is ready for Vercel as a standard Next.js app.

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave empty
- Node.js Version: `20.x` or newer

The app uses remote Dribbble thumbnails from `cdn.dribbble.com`, already configured in `next.config.ts`.
