import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { contrastRatio, wcagBadge, buildPalette } from "./utils/colors";

const defaultBase = "#6366F1";

export default function App() {
  const [base, setBase] = useState(
    () => localStorage.getItem("cc:base") || defaultBase
  );
  const [mode, setMode] = useState(
    () => localStorage.getItem("cc:mode") || "light"
  );
  const [copied, setCopied] = useState("");
  const textOn = mode === "light" ? "#0B0B0F" : "#FFFFFF";
  const bg = mode === "light" ? "#FFFFFF" : "#0B0B0F";

  useEffect(() => {
    localStorage.setItem("cc:base", base);
  }, [base]);
  useEffect(() => {
    localStorage.setItem("cc:mode", mode);
  }, [mode]);

  const palette = useMemo(() => buildPalette(base), [base]);

  const exportTokens = (type) => {
    const name = `contrastcraft-${Date.now()}`;
    if (type === "json") {
      const data = palette.map((p) => ({
        token: `--accent-${p.step}`,
        value: p.hex,
      }));
      const blob = new Blob([JSON.stringify({ name, tokens: data }, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      download(url, `${name}.json`);
    } else {
      const css = [
        ":root {",
        ...palette.map((p) => `  --accent-${p.step}: ${p.hex};`),
        "}",
      ].join("\n");
      const blob = new Blob([css], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      download(url, `${name}.css`);
    }
  };

  function download(url, filename) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  }

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(""), 1000);
    } catch (e) {}
  };

  const variants = {
    fadeUp: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } },
    pop: {
      initial: { scale: 0.98, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    },
  };

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [mode]);

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-10 py-8"
      style={{ background: bg, color: textOn }}
    >
      {/* Header / Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <motion.div
          {...variants.fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            ContrastCraft
          </h1>
          <p className="mt-2 text-sm opacity-80">
            Generate accessible, on-brand palettes. Built with React + Tailwind.
          </p>
        </motion.div>

        <motion.div
          {...variants.fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex items-center gap-3"
        >
          <div className="inline-flex rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
            <button
              onClick={() => setMode("light")}
              className={`px-3 py-2 text-sm ${
                mode === "light" ? "bg-gray-100 dark:bg-white/10" : ""
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setMode("dark")}
              className={`px-3 py-2 text-sm ${
                mode === "dark" ? "bg-gray-100 dark:bg-white/10" : ""
              }`}
            >
              Dark
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs opacity-70">Base</label>
            <input
              type="color"
              value={base}
              onChange={(e) => setBase(e.target.value.toUpperCase())}
              className="h-10 w-14 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 cursor-pointer"
            />
            <input
              type="text"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="h-10 w-28 rounded-xl px-3 border border-gray-200 dark:border-white/10 bg-transparent"
              placeholder="#6366F1"
            />
          </div>
        </motion.div>
      </div>

      {/* Hero Card */}
      <motion.div
        {...variants.pop}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.35 }}
        className="mt-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur p-6 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              Accessible palettes that pop ✨
            </h2>
            <p className="text-sm opacity-80 mt-1">
              12-step scale with live WCAG checks for light/dark text.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => exportTokens("css")}
              className="px-4 py-2 rounded-2xl text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
            >
              Export CSS
            </button>
            <button
              onClick={() => exportTokens("json")}
              className="px-4 py-2 rounded-2xl text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
            >
              Export JSON
            </button>
          </div>
        </div>
      </motion.div>

      {/* Palette Grid */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {palette.map((p, idx) => {
          const ratioLight = contrastRatio(p.hex, "#FFFFFF");
          const ratioDark = contrastRatio(p.hex, "#0B0B0F");
          const badgeLight = wcagBadge(ratioLight);
          const badgeDark = wcagBadge(ratioDark);

          return (
            <motion.div
              key={p.step}
              {...variants.pop}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.25, delay: idx * 0.01 }}
              className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
            >
              <div className="p-4 flex items-center justify-between bg-white/70 dark:bg-white/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-lg border border-gray-200 dark:border-white/10">
                    accent-{p.step}
                  </span>
                  <button
                    onClick={() => copy(p.hex)}
                    className="text-xs underline decoration-dotted"
                  >
                    {copied === p.hex ? "Copied!" : p.hex}
                  </button>
                </div>
                <span className="text-xs opacity-70">
                  {p.h} / {p.s}% / {p.l}%
                </span>
              </div>
              <div className="grid grid-cols-2">
                <Swatch
                  hex={p.hex}
                  text="#FFFFFF"
                  label="Light text"
                  badge={badgeLight}
                />
                <Swatch
                  hex={p.hex}
                  text="#0B0B0F"
                  label="Dark text"
                  badge={badgeDark}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <footer className="text-xs opacity-70 text-center py-6">
        © {new Date().getFullYear()} Brett Beare ContrastCraft · React +
        Tailwind
      </footer>
    </div>
  );
}

function Swatch({ hex, text, label, badge }) {
  const ratio = contrastRatio(hex, text).toFixed(2);
  return (
    <div className="p-5" style={{ background: hex, color: text }}>
      <div className="flex items-center justify-between text-xs">
        <span>{label}</span>
        <span
          className={`px-2 py-1 rounded-lg border ${
            badge.ok ? "border-white/40" : "border-red-500/60"
          }`}
        >
          {badge.level} · {ratio}
        </span>
      </div>
      <div className="mt-8 flex items-end justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Aa</div>
          <div className="opacity-80 text-sm">The quick brown fox</div>
        </div>
      </div>
    </div>
  );
}
