"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./PortfolioComposer.module.scss";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  action: () => void;
  category: string;
}

export function PortfolioComposer() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const commands: CommandItem[] = [
    {
      id: "projects",
      label: "Selected Work & Projects",
      description: "Explore PaperMind, Hover Dock, and open source",
      action: () => router.push("/work"),
      category: "Work",
    },
    {
      id: "about",
      label: "About Bramha",
      description: "Experience, education, tech stack & background",
      action: () => router.push("/about"),
      category: "About",
    },
    {
      id: "resume",
      label: "Resume / CV",
      description: "Download or preview latest resume",
      action: () => window.open("/resume.pdf", "_blank"),
      category: "Document",
    },
    {
      id: "github",
      label: "GitHub Profile",
      description: "@bramhaaa repositories & stats",
      action: () => window.open("https://github.com/bramhaaa", "_blank"),
      category: "Social",
    },
    {
      id: "contact",
      label: "Send Email",
      description: "altbramhabajannavar@gmail.com",
      action: () => window.open("mailto:altbramhabajannavar@gmail.com"),
      category: "Contact",
    },
  ];

  const filteredCommands = input.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(input.toLowerCase()) ||
          c.description.toLowerCase().includes(input.toLowerCase()) ||
          c.id.toLowerCase().includes(input.toLowerCase())
      )
    : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        filteredCommands[0].action();
      } else if (input.trim()) {
        router.push("/work");
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        160
      )}px`;
    }
  }, [input]);

  return (
    <div className={styles.composerWrapper}>
      <form
        className={`${styles.composer} glass`}
        onSubmit={(e) => {
          e.preventDefault();
          if (filteredCommands.length > 0) {
            filteredCommands[0].action();
          }
        }}
      >
        <div className={styles.composerField}>
          <svg
            className={styles.composerIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Explore my work, experience, or type 'about'..."
            aria-label="Portfolio search and quick navigation"
            className={styles.composerTextarea}
          />
        </div>

        <div className={styles.composerBar}>
          <div className={styles.pillsRow}>
            <button
              type="button"
              className={styles.pillBtn}
              onClick={() => router.push("/work")}
            >
              <span>Explore Projects</span>
            </button>
            <button
              type="button"
              className={styles.pillBtn}
              onClick={() => router.push("/about")}
            >
              <span>About Bramha</span>
            </button>
          </div>

          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!input.trim()}
            aria-label="Submit command"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </form>

      {showSuggestions && filteredCommands.length > 0 && (
        <div className={`${styles.suggestionsBox} glass`}>
          {filteredCommands.map((cmd) => (
            <div
              key={cmd.id}
              className={styles.suggestionItem}
              onClick={() => {
                cmd.action();
                setShowSuggestions(false);
              }}
            >
              <div>
                <strong>{cmd.label}</strong>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                  {cmd.description}
                </div>
              </div>
              <span className={styles.suggestionCat}>{cmd.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
