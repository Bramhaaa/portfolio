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
}

export const ANIMAL_THEMES: Record<AnimalKey, AnimalTheme> = {
  butterflies: { name: "Cyan", accent: "#00d4ff", accentRgb: "0, 212, 255" },
  dragonflies: { name: "Emerald Green", accent: "#00ff9d", accentRgb: "0, 255, 157" },
  koi:         { name: "Warm Amber", accent: "#ffaa00", accentRgb: "255, 170, 0" },
  jellyfish:   { name: "Neon Magenta", accent: "#ff3399", accentRgb: "255, 51, 153" },
  frogs:       { name: "Electric Lime", accent: "#70e000", accentRgb: "112, 224, 0" },
  cranes:      { name: "Ice Sapphire", accent: "#8ec5fc", accentRgb: "142, 197, 252" },
  crabs:       { name: "Coral Ember", accent: "#ff5533", accentRgb: "255, 85, 51" },
};

interface PortfolioEnvContextType {
  selectedAnimal: AnimalKey;
  setSelectedAnimal: (animal: AnimalKey) => void;
  tweaksOpen: boolean;
  setTweaksOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  glassTuning: GlassTuning;
  setGlassTuning: (glass: GlassTuning | ((prev: GlassTuning) => GlassTuning)) => void;
}

const PortfolioEnvContext = createContext<PortfolioEnvContextType>({
  selectedAnimal: "koi",
  setSelectedAnimal: () => {},
  tweaksOpen: false,
  setTweaksOpen: () => {},
  glassTuning: DEFAULT_GLASS,
  setGlassTuning: () => {},
});

export function PortfolioEnvProvider({ children }: { children: React.ReactNode }) {
  const [selectedAnimal, setSelectedAnimalState] = useState<AnimalKey>("koi");
  const [tweaksOpen, setTweaksOpen] = useState<boolean>(false);
  const [glassTuning, setGlassTuningState] = useState<GlassTuning>(DEFAULT_GLASS);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const animal = getStoredAnimal("koi");
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

  // Sync glass blur/tint/edge custom properties to documentElement
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.style.setProperty("--blur", `${glassTuning.blur}px`);
    root.style.setProperty("--tint", `${glassTuning.tint}`);
    root.style.setProperty("--edge", `${glassTuning.edge}`);
  }, [glassTuning, mounted]);

  return (
    <PortfolioEnvContext.Provider
      value={{
        selectedAnimal,
        setSelectedAnimal,
        tweaksOpen,
        setTweaksOpen,
        glassTuning,
        setGlassTuning,
      }}
    >
      {children}
    </PortfolioEnvContext.Provider>
  );
}

export const usePortfolioEnv = () => useContext(PortfolioEnvContext);
