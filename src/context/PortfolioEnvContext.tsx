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

interface PortfolioEnvContextType {
  selectedAnimal: AnimalKey;
  setSelectedAnimal: (animal: AnimalKey) => void;
  tweaksOpen: boolean;
  setTweaksOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  glassTuning: GlassTuning;
  setGlassTuning: (glass: GlassTuning | ((prev: GlassTuning) => GlassTuning)) => void;
}

const PortfolioEnvContext = createContext<PortfolioEnvContextType>({
  selectedAnimal: "butterflies",
  setSelectedAnimal: () => {},
  tweaksOpen: false,
  setTweaksOpen: () => {},
  glassTuning: DEFAULT_GLASS,
  setGlassTuning: () => {},
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

  // Sync glass CSS custom properties to documentElement
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
