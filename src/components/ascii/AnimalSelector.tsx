"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ANIMALS, ANIMAL_KEYS, type AnimalKey } from "@/lib/ascii-animals";
import { usePortfolioEnv } from "@/context/PortfolioEnvContext";
import styles from "./AnimalSelector.module.scss";

export function AnimalSelector() {
  const { selectedAnimal, setSelectedAnimal } = usePortfolioEnv();
  const choicesRef = useRef<HTMLDivElement>(null);
  const [thumbStyle, setThumbStyle] = useState<{ left: number; width: number }>({
    left: 4,
    width: 0,
  });

  const updateThumb = useCallback(() => {
    if (!choicesRef.current) return;
    const activeBtn = choicesRef.current.querySelector<HTMLButtonElement>(
      `button[data-key="${selectedAnimal}"]`
    );
    if (activeBtn) {
      setThumbStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [selectedAnimal]);

  useEffect(() => {
    updateThumb();
    // Re-check after a tick for fonts/layout settlement
    const t = setTimeout(updateThumb, 50);
    return () => clearTimeout(t);
  }, [selectedAnimal, updateThumb]);

  useEffect(() => {
    window.addEventListener("resize", updateThumb);
    return () => window.removeEventListener("resize", updateThumb);
  }, [updateThumb]);

  return (
    <div className={styles.selectorWrapper}>
      <div
        ref={choicesRef}
        className={`${styles.choices} glass`}
        role="radiogroup"
        aria-label="ASCII Animal Selection"
      >
        <div
          className={styles.thumb}
          style={{
            transform: `translateX(${thumbStyle.left}px)`,
            width: thumbStyle.width > 0 ? `${thumbStyle.width}px` : undefined,
          }}
        />

        {ANIMAL_KEYS.map((key) => {
          const animal = ANIMALS[key];
          const isSelected = selectedAnimal === key;
          const [r, g, b] = animal.swatch;

          return (
            <button
              key={key}
              type="button"
              role="radio"
              data-key={key}
              aria-checked={isSelected}
              className={`${styles.animalBtn} ${isSelected ? styles.active : ""}`}
              onClick={() => setSelectedAnimal(key)}
            >
              <span
                className={styles.swatch}
                style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
              />
              <span className={styles.animalLabel}>{animal.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
