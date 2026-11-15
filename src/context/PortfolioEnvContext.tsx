"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { AnimalKey } from "@/lib/ascii-animals";
import {
  getStoredAnimal,
  saveStoredAnimal,
  getStoredGlass,
  saveStoredGlass,
  type GlassTuning,
  DEFAULT_GLASS,
} from "@/lib/portfolio/storage";

export interface AnimalTheme {
  name: string;
  accent: string;
  accentRgb: string;
  glassGlow: string;
  glassBgStart: string;
  glassBgEnd: string;
}

export const ANIMAL_THEMES: Record<AnimalKey, AnimalTheme> = {
  butterflies: {
    name: "Cyan",
    accent: "#00d4ff",
    accentRgb: "0, 212, 255",
    glassGlow: "rgba(0, 212, 255, 0.12)",
    glassBgStart: "rgba(10, 20, 32, 0.90)",
    glassBgEnd: "rgba(6, 12, 20, 0.82)",
  },
  dragonflies: {
    name: "Emerald Green",
    accent: "#00ff9d",
    accentRgb: "0, 255, 157",
    glassGlow: "rgba(0, 255, 157, 0.12)",
    glassBgStart: "rgba(10, 26, 20, 0.90)",
    glassBgEnd: "rgba(6, 16, 12, 0.82)",
  },
  koi: {
    name: "Warm Amber",
    accent: "#ffaa00",
    accentRgb: "255, 170, 0",
    glassGlow: "rgba(255, 170, 0, 0.12)",
    glassBgStart: "rgba(26, 20, 10, 0.90)",
    glassBgEnd: "rgba(16, 11, 6, 0.82)",
  },
  jellyfish: {
    name: "Neon Magenta",
    accent: "#ff3399",
    accentRgb: "255, 51, 153",
    glassGlow: "rgba(255, 51, 153, 0.12)",
    glassBgStart: "rgba(26, 10, 22, 0.90)",
    glassBgEnd: "rgba(16, 6, 14, 0.82)",
  },
  frogs: {
    name: "Electric Lime",
    accent: "#70e000",
    accentRgb: "112, 224, 0",
    glassGlow: "rgba(112, 224, 0, 0.12)",
    glassBgStart: "rgba(14, 24, 10, 0.90)",
    glassBgEnd: "rgba(8, 16, 6, 0.82)",
  },
  cranes: {
    name: "Ice Sapphire",
    accent: "#8ec5fc",
    accentRgb: "142, 197, 252",
    glassGlow: "rgba(142, 197, 252, 0.12)",
    glassBgStart: "rgba(14, 18, 30, 0.90)",
    glassBgEnd: "rgba(8, 11, 20, 0.82)",
  },
  crabs: {
    name: "Coral Ember",
    accent: "#ff5533",
    accentRgb: "255, 85, 51",
    glassGlow: "rgba(255, 85, 51, 0.12)",
    glassBgStart: "rgba(26, 12, 10, 0.90)",
    glassBgEnd: "rgba(16, 8, 6, 0.82)",
  },
};

interface PortfolioEnvContextType {
  selectedAnimal: AnimalKey;
  setSelectedAnimal: (animal: AnimalKey) => void;
  tweaksOpen: boolean;
  setTweaksOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  glassTuning: GlassTuning;
  setGlassTuning: (glass: GlassTuning | ((prev: GlassTuning) => GlassTuning)) => void;
  currentTheme: AnimalTheme;
}

const PortfolioEnvContext = createContext<PortfolioEnvContextType>({
  selectedAnimal: "butterflies",
  setSelectedAnimal: () => {},
  tweaksOpen: false,
  setTweaksOpen: () => {},
  glassTuning: DEFAULT_GLASS,
  setGlassTuning: () => {},
  currentTheme: ANIMAL_THEMES.butterflies,
});

export function PortfolioEnvProvider({ children }: { children: React.ReactNode }) {
  const [selectedAnimal, setSelectedAnimalState] = useState<AnimalKey>("butterflies");
  const [tweaksOpen, setTweaksOpen] = useState<boolean>(false);
  const [glassTuning, setGlassTuningState] = useState<GlassTuning>(DEFAULT_GLASS);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const animal = getStoredAnimal("butterflies");
    setSelectedAnimalState(animal);
    const glass = getStoredGlass();
    setGlassTuningState(glass);
    setMounted(true);
  }, []);

  const setSelectedAnimal = (animal: AnimalKey) => {
    setSelectedAnimalState(animal);
    saveStoredAnimal(animal);
  };

  const setGlassTuning = (
    updater: GlassTuning | ((prev: GlassTuning) => GlassTuning)
  ) => {
    setGlassTuningState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveStoredGlass(next);
      return next;
    });
  };

  // Sync animal theme hue & glow custom properties to documentElement
  useEffect(() => {
    if (!mounted) return;
    const theme = ANIMAL_THEMES[selectedAnimal] || ANIMAL_THEMES.butterflies;
    const root = document.documentElement;

    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-soft", `rgba(${theme.accentRgb}, 0.14)`);
    root.style.setProperty("--accent-edge", `rgba(${theme.accentRgb}, 0.45)`);
    root.style.setProperty("--focus", `rgba(${theme.accentRgb}, 0.35)`);
    root.style.setProperty("--glass-glow", theme.glassGlow);
    root.style.setProperty("--glass-bg-start", theme.glassBgStart);
    root.style.setProperty("--glass-bg-end", theme.glassBgEnd);
    root.style.setProperty("--ds-accent", theme.accent);
    root.style.setProperty("--ds-accent-2", theme.accent);
    root.style.setProperty("--ds-accent-glow", `rgba(${theme.accentRgb}, 0.14)`);
  }, [selectedAnimal, mounted]);

  // Sync glass blur/tint/edge custom properties to documentElement
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.style.setProperty("--blur", `${glassTuning.blur}px`);
    root.style.setProperty("--tint", `${glassTuning.tint}`);
    root.style.setProperty("--edge", `${glassTuning.edge}`);
  }, [glassTuning, mounted]);

  const currentTheme = ANIMAL_THEMES[selectedAnimal] || ANIMAL_THEMES.butterflies;

  return (
    <PortfolioEnvContext.Provider
      value={{
        selectedAnimal,
        setSelectedAnimal,
        tweaksOpen,
        setTweaksOpen,
        glassTuning,
        setGlassTuning,
        currentTheme,
      }}
    >
      {children}
    </PortfolioEnvContext.Provider>
  );
}

export const usePortfolioEnv = () => useContext(PortfolioEnvContext);
