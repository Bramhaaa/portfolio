/**
 * Portfolio Preferences & Storage Manager
 * Namespaced to avoid colliding with standalone ascii-animals
 */
import type { AnimalKey } from "@/lib/ascii-animals";
import { ANIMAL_KEYS } from "@/lib/ascii-animals";

export interface GlassTuning {
  blur: number;
  refraction: number;
  ripple: number;
  tint: number;
  edge: number;
  radius: number;
  width: number;
}

export const DEFAULT_GLASS: GlassTuning = {
  blur: 6,
  refraction: 40,
  ripple: 0.007,
  tint: 1,
  edge: 1,
  radius: 24,
  width: 720,
};

export const STORAGE_KEYS = {
  animalSession: "bramha-portfolio:animal-session",
  tweaks: "bramha-portfolio:tweaks",
  glass: "bramha-portfolio:glass",
  tweaksOpen: "bramha-portfolio:tweaks-open",
} as const;

export function getStoredAnimal(defaultAnimal: AnimalKey = "butterflies"): AnimalKey {
  if (typeof window === "undefined") return defaultAnimal;
  try {
    // 1. Clear any legacy localStorage values that cached previous animals like "koi"
    try {
      localStorage.removeItem("bramha-portfolio:animal");
      localStorage.removeItem("bramha-portfolio:animal-v2");
    } catch {
      // Ignore if localStorage is restricted
    }

    // 2. URL search parameter (?animal=...) takes highest precedence
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get("animal") as AnimalKey;
    if (param && ANIMAL_KEYS.includes(param)) {
      return param;
    }

    // 3. User session selection (only if user explicitly clicked an animal during this active tab session)
    const sessionAnimal = sessionStorage.getItem(STORAGE_KEYS.animalSession) as AnimalKey;
    if (sessionAnimal && ANIMAL_KEYS.includes(sessionAnimal)) {
      return sessionAnimal;
    }
  } catch (e) {
    console.warn("Storage access failed:", e);
  }
  return defaultAnimal;
}

export function saveStoredAnimal(animal: AnimalKey) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEYS.animalSession, animal);
    // Ensure old localStorage key is cleaned up
    try {
      localStorage.removeItem("bramha-portfolio:animal");
    } catch {}
  } catch (e) {
    console.warn("Storage save failed:", e);
  }
}

export function getStoredGlass(): GlassTuning {
  if (typeof window === "undefined") return DEFAULT_GLASS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.glass);
    if (raw) {
      return { ...DEFAULT_GLASS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn("Glass storage read failed:", e);
  }
  return DEFAULT_GLASS;
}

export function saveStoredGlass(glass: GlassTuning) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.glass, JSON.stringify(glass));
  } catch (e) {
    console.warn("Glass storage write failed:", e);
  }
}
