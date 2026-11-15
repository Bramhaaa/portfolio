"use client";

import { useEffect, useRef } from "react";
import { AnimalEngine } from "@/lib/ascii-animals";
import { usePortfolioEnv } from "@/context/PortfolioEnvContext";
import styles from "./ascii.module.scss";

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AnimalEngine | null>(null);
  const { selectedAnimal } = usePortfolioEnv();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new AnimalEngine(canvas, {
      animal: selectedAnimal,
      theme: "dark",
    });
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
    // Initialize once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (engine && engine.animal.key !== selectedAnimal) {
      engine.setAnimal(selectedAnimal);
    }
  }, [selectedAnimal]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={styles.background}
    />
  );
}
