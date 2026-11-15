"use client";

import React, { useState } from "react";
import { usePortfolioEnv } from "@/context/PortfolioEnvContext";
import { DEFAULT_GLASS } from "@/lib/portfolio/storage";
import styles from "./TweaksPanel.module.scss";

export function TweaksPanel() {
  const { tweaksOpen, setTweaksOpen, glassTuning, setGlassTuning } = usePortfolioEnv();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(glassTuning, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setGlassTuning(DEFAULT_GLASS);
  };

  if (!tweaksOpen) {
    return (
      <button
        type="button"
        className={`${styles.tweaksOpen} glass`}
        onClick={() => setTweaksOpen(true)}
        aria-label="Open Tweaks panel"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span>Tweaks</span>
      </button>
    );
  }

  return (
    <aside className={`${styles.tweaksPanel} glass`} aria-label="Tweaks panel">
      <div className={styles.tweaksHeader}>
        <span className={styles.tweaksTitle}>Tweaks</span>
        <button type="button" className={styles.tweaksAction} onClick={handleCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" className={styles.tweaksAction} onClick={handleReset}>
          Reset
        </button>
        <button
          type="button"
          className={styles.tweaksClose}
          onClick={() => setTweaksOpen(false)}
          aria-label="Close Tweaks panel"
        >
          ✕
        </button>
      </div>

      <div className={styles.tweaksBody}>
        <div className={styles.tweaksGroup}>
          <h3>Glass Material</h3>

          <div className={styles.tweaksRow}>
            <span className={styles.tweaksLabel}>Blur</span>
            <span className={styles.tweaksValue}>{glassTuning.blur}px</span>
            <input
              type="range"
              min="0"
              max="24"
              step="0.5"
              value={glassTuning.blur}
              onChange={(e) =>
                setGlassTuning((prev) => ({ ...prev, blur: parseFloat(e.target.value) }))
              }
              className={styles.tweaksRange}
            />
          </div>

          <div className={styles.tweaksRow}>
            <span className={styles.tweaksLabel}>Tint Strength</span>
            <span className={styles.tweaksValue}>{glassTuning.tint.toFixed(2)}</span>
            <input
              type="range"
              min="0"
              max="3"
              step="0.05"
              value={glassTuning.tint}
              onChange={(e) =>
                setGlassTuning((prev) => ({ ...prev, tint: parseFloat(e.target.value) }))
              }
              className={styles.tweaksRange}
            />
          </div>

          <div className={styles.tweaksRow}>
            <span className={styles.tweaksLabel}>Edge Glow</span>
            <span className={styles.tweaksValue}>{glassTuning.edge.toFixed(2)}</span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={glassTuning.edge}
              onChange={(e) =>
                setGlassTuning((prev) => ({ ...prev, edge: parseFloat(e.target.value) }))
              }
              className={styles.tweaksRange}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
