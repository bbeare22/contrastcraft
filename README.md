# ContrastCraft — Accessible Palette Generator (React + Tailwind)

A tiny, polished web app to show off UI/UX chops: type/pick a base color, see a 12‑step palette with live WCAG contrast for light/dark text, export tokens (CSS/JSON), and toggle dark mode. Built with **React + Vite + Tailwind + Framer Motion**.

## Tech
- React 18 + Vite
- Tailwind CSS (dark mode class strategy)
- Framer Motion
- No backend needed (perfect for Vercel/Netlify/Render static hosting)

## Run locally
```bash
npm i
npm run dev
```
Then open the printed local URL.

## Build & deploy
```bash
npm run build
npm run preview    # to test the production build
```
Deploy the `dist/` folder to any static host. On **Vercel**, select the repo, use default `npm run build` and framework = Vite.

## What this demonstrates
- Accessible design (WCAG contrast badges)
- Token thinking (export to CSS variables & JSON)
- Dark mode, responsive grid, microinteractions (motion)
- LocalStorage persistence
- Clean React component structure + Tailwind utility design
