# 🎨 ContrastCraft — Accessible Palette Generator

ContrastCraft is a sleek, accessible color palette generator built with **React**, **Vite**, and **Tailwind CSS**.  
It generates 12-step tonal palettes from a base color, checks **WCAG contrast ratios** for both light and dark text, supports **dark mode**, and exports palettes as **CSS variables or JSON tokens**.  
A perfect showcase of modern front-end architecture, responsive UI, and microinteraction polish.

---

## 🚀 Tech Stack
- ⚛️ React 18 (Vite setup)
- 🎨 Tailwind CSS (dark mode via class strategy)
- 💫 Framer Motion for animations
- 🧱 Vanilla JavaScript utilities for color math (HSL/RGB/HEX conversions)
- 💾 LocalStorage persistence (remembers color + mode)
- 🌐 Deploy-ready for Vercel, Netlify, or Render

---

## 🧰 Features
- 🧩 Generate smooth 12-step tonal palettes
- ♿ Live WCAG contrast checks for light/dark text
- 🌙 Toggleable dark mode with persistent state
- 🧾 Export palettes as CSS variables or JSON tokens
- 💅 Responsive design with fluid grid layout
- ⚡ Fast build using Vite and Tailwind

---

## 🧑‍💻 Run Locally
Clone the repo and start the dev server:

```bash
git clone https://github.com/bbeare22/contrastcraft.git
cd contrastcraft
npm install
npm run dev
```

Then open the printed local URL in your browser.

---

## 🏗️ Build & Deploy
Build the optimized production bundle:

```bash
npm run build
npm run preview    # test locally before deploying
```

### Deploy on Vercel
1. Import your GitHub repo in [Vercel](https://vercel.com/new)
2. Framework: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`  
5. Click **Deploy** 🎉

---

## 💡 What This Demonstrates
- Accessible, contrast-aware design (WCAG 2.1)
- Clean UI/UX patterns with modern front-end tools
- Design token generation (CSS/JSON)
- Reusable React component architecture
- Real-world responsive layout with dark mode

---

## 🖼️ Preview
![ContrastCraft Screenshot](public/og-cover.png)

---

## 🪪 License
This project is open source under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

Built with ❤️ by **Brett Beare**
