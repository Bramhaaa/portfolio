/**
 * Tweak panel: a scene's engine knobs plus the chat glass, as live sliders.
 * Changes persist in localStorage; Copy exports what differs from the
 * defaults as JSON, ready to bake in.
 */

const GLASS_DEFAULTS = {
  /** Frost behind the chat input, px. */
  blur: 3.5,
  /** How far the liquid glass bends what's behind it, px. */
  refraction: 40,
  /** Size of the refraction ripples: higher is finer. */
  ripple: 0.007,
  /** Opacity multiplier for the glass tint (0: perfectly clear). */
  tint: 0,
  /** Strength of the glass borders and rim highlights (chat box, animal bar, this panel); 1 is full. */
  edge: 0.55,
  radius: 24,
  width: 720,
};

type Glass = typeof GLASS_DEFAULTS;

interface Range {
  kind: "range";
  label: string;
  /** What it does, shown in a tooltip. */
  hint?: string;
  min: number;
  max: number;
  step: number;
  def: number;
  get(): number;
  set(v: number): void;
  disabled?(): boolean;
}

interface Toggle {
  kind: "toggle";
  label: string;
  hint?: string;
  def: boolean;
  get(): boolean;
  set(v: boolean): void;
}

export type Control = Range | Toggle;

type Knobs = Record<string, number | boolean>;

/** What the panel needs from a scene's engine. */
export interface Tunable<T extends Knobs> {
  readonly tuning: T;
  set<K extends keyof T>(key: K, value: T[K]): void;
}

/** Builders for a scene's controls, bound to its engine. */
export interface ControlKit<T extends Knobs> {
  knob(key: keyof T, label: string, min: number, max: number, step: number, hint?: string): Range;
  toggle(key: keyof T, label: string, hint?: string): Toggle;
}

const OPEN_KEY = "ascii-animals:tweaks-open";

function load<T>(storageKey: string): { tuning?: Partial<T>; glass?: Partial<Glass> } {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "{}");
  } catch {
    return {};
  }
}

/** Only the values that differ from their defaults. */
function changed<T extends object>(values: T, defaults: T): Partial<T> {
  const out: Partial<T> = {};
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    if (values[key] !== defaults[key]) out[key] = values[key];
  }
  return out;
}

function applyGlass(g: Glass) {
  const composer = document.querySelector<HTMLElement>(".composer")!;
  composer.style.setProperty("--blur", `${g.blur}px`);
  composer.style.borderRadius = `${g.radius}px`;
  composer.style.width = `min(${g.width}px, calc(100vw - 32px))`;
  document.documentElement.style.setProperty("--tint", String(g.tint));
  document.documentElement.style.setProperty("--edge", String(g.edge));
  document.querySelector("#liquid-glass feDisplacementMap")?.setAttribute("scale", String(g.refraction));
  document.querySelector("#liquid-glass feTurbulence")?.setAttribute("baseFrequency", `${g.ripple} ${g.ripple * 1.5}`);
}

const decimals = (step: number) => (step >= 1 ? 0 : Math.min(3, Math.ceil(-Math.log10(step))));

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

/**
 * Mounts the panel. `groups` lays out the scene's controls; the chat glass group is added after them.
 * `onChange` runs after any knob changes from inside the panel; call the returned `sync()` after
 * changing knobs from outside it, so the sliders catch up and the change is saved. Each scene saves
 * under its own `storageKey`; `destroy()` removes the panel so another can take its place.
 */
export function mountTweakPanel<T extends Knobs>(
  engine: Tunable<T>,
  defaults: T,
  groups: (kit: ControlKit<T>) => [string, Control[]][],
  { storageKey = "tweaks", onChange }: { storageKey?: string; onChange?: () => void } = {},
) {
  const t = engine.tuning;
  const saved = load<T>(storageKey);
  const glass: Glass = { ...GLASS_DEFAULTS, ...saved.glass };
  for (const [key, value] of Object.entries(saved.tuning ?? {})) {
    if (key in defaults) engine.set(key as keyof T, value as never);
  }
  applyGlass(glass);

  const save = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ tuning: changed(t, defaults), glass: changed(glass, GLASS_DEFAULTS) }));
    } catch {
      // Storage unavailable: tweaks still apply for this visit.
    }
    onChange?.();
  };

  const kit: ControlKit<T> = {
    knob: (key, label, min, max, step, hint) => ({
      kind: "range", label, min, max, step, hint,
      def: defaults[key] as number,
      get: () => t[key] as number,
      set: (v) => engine.set(key, v as T[typeof key]),
    }),
    toggle: (key, label, hint) => ({
      kind: "toggle", label, hint,
      def: defaults[key] as boolean,
      get: () => t[key] as boolean,
      set: (v) => engine.set(key, v as T[typeof key]),
    }),
  };
  const pane = <K extends keyof Glass>(key: K, label: string, min: number, max: number, step: number, hint: string): Range => ({
    kind: "range", label, min, max, step, hint,
    def: GLASS_DEFAULTS[key],
    get: () => glass[key],
    set: (v) => {
      glass[key] = v;
      applyGlass(glass);
    },
  });

  const sections: [string, Control[]][] = [
    ...groups(kit),
    ["Chat glass", [
      pane("blur", "Blur (px)", 0, 30, 0.5, "How frosted the chat box is: how much it blurs what's behind it."),
      pane("refraction", "Refraction", 0, 150, 1, "How strongly the glass bends what's behind it, like liquid glass (Chrome and Edge only)."),
      pane("ripple", "Ripple", 0.001, 0.04, 0.001, "Size of the refraction ripples: higher is finer and busier, lower is broad and smooth."),
      pane("tint", "Tint", 0, 3, 0.05, "How milky the glass is. 0 is perfectly clear."),
      pane("edge", "Edge", 0, 2, 0.05, "How strong the glass borders and their bright rims are, on the chat box, the animal bar at the top and this panel. 0 hides them."),
      pane("radius", "Corner radius", 0, 48, 1, "How rounded the chat box's corners are."),
      pane("width", "Width", 320, 960, 10, "How wide the chat box is."),
    ]],
  ];

  // ── DOM ─────────────────────────────────────────────────────────────

  const panel = el("aside", "tweaks glass");
  panel.setAttribute("aria-label", "Tweaks");
  const header = el("header", "tweaks-head");
  const title = el("h2", "", "Tweaks");
  const copy = el("button", "tweaks-action", "Copy");
  const reset = el("button", "tweaks-action", "Reset");
  const close = el("button", "tweaks-close");
  close.setAttribute("aria-label", "Close tweaks");
  close.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`;
  header.append(title, copy, reset, close);
  const body = el("div", "tweaks-body");
  panel.append(header, body);

  const opener = el("button", "tweaks-open glass");
  opener.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg><span>Tweaks</span>`;

  const refreshers: (() => void)[] = [];
  const refreshAll = () => refreshers.forEach((r) => r());

  // One tooltip, shown beside the panel next to whichever setting is hovered or focused.
  const tip = el("div", "tweaks-tip");
  tip.setAttribute("role", "tooltip");
  tip.hidden = true;
  const showTip = (row: HTMLElement, hint?: string) => {
    if (!hint) return;
    tip.innerHTML = "";
    tip.append(el("span", "", hint), el("small", "", "Double-click the name to reset it."));
    tip.hidden = false;
    const r = row.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    tip.style.right = `${window.innerWidth - p.left + 10}px`;
    tip.style.top = `${Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, r.top + r.height / 2 - tip.offsetHeight / 2))}px`;
  };
  const hideTip = () => (tip.hidden = true);

  for (const [name, controls] of sections) {
    const section = el("section", "tweaks-group");
    section.append(el("h3", "", name));
    for (const c of controls) {
      const row = el("label", `tweaks-row ${c.kind}`);
      const label = el("span", "tweaks-label", c.label);
      row.addEventListener("pointerenter", () => showTip(row, c.hint));
      row.addEventListener("pointerleave", hideTip);
      row.addEventListener("focusin", () => showTip(row, c.hint));
      row.addEventListener("focusout", hideTip);
      if (c.kind === "toggle") {
        const box = el("input");
        box.type = "checkbox";
        box.addEventListener("change", () => {
          c.set(box.checked);
          refreshAll();
          save();
        });
        refreshers.push(() => (box.checked = c.get()));
        label.addEventListener("dblclick", (e) => {
          e.preventDefault();
          c.set(c.def);
          refreshAll();
          save();
        });
        row.append(label, box);
      } else {
        const out = el("output", "tweaks-value");
        const input = el("input");
        input.type = "range";
        input.min = String(c.min);
        input.max = String(c.max);
        input.step = String(c.step);
        const show = () => {
          const v = c.get();
          input.value = String(v);
          out.textContent = v.toFixed(decimals(c.step));
          input.style.setProperty("--fill", `${((v - c.min) / (c.max - c.min)) * 100}%`);
          const off = c.disabled?.() ?? false;
          input.disabled = off;
          row.classList.toggle("off", off);
        };
        input.addEventListener("input", () => {
          c.set(Number(input.value));
          show();
          save();
        });
        label.addEventListener("dblclick", (e) => {
          e.preventDefault();
          c.set(c.def);
          show();
          save();
        });
        refreshers.push(show);
        row.append(label, out, input);
      }
      section.append(row);
    }
    body.append(section);
  }
  refreshAll();

  copy.addEventListener("click", async () => {
    const json = JSON.stringify({ tuning: changed(t, defaults), glass: changed(glass, GLASS_DEFAULTS) }, null, 2);
    try {
      await navigator.clipboard.writeText(json);
      copy.textContent = "Copied";
    } catch {
      console.log(json);
      copy.textContent = "In console";
    }
    setTimeout(() => (copy.textContent = "Copy"), 1400);
  });

  // Reset asks first: the first click arms it ("Reset all?"), a second click within a few seconds resets.
  let armed = 0;
  const disarm = () => {
    clearTimeout(armed);
    armed = 0;
    reset.textContent = "Reset";
    reset.classList.remove("confirm");
  };
  reset.addEventListener("click", () => {
    if (!armed) {
      reset.textContent = "Reset all?";
      reset.classList.add("confirm");
      armed = window.setTimeout(disarm, 3000);
      return;
    }
    disarm();
    for (const key of Object.keys(defaults) as (keyof T)[]) engine.set(key, defaults[key]);
    Object.assign(glass, GLASS_DEFAULTS);
    applyGlass(glass);
    refreshAll();
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Nothing saved to clear.
    }
    onChange?.();
  });

  const setOpen = (open: boolean) => {
    panel.hidden = !open;
    opener.hidden = open;
    try {
      localStorage.setItem(OPEN_KEY, open ? "1" : "0");
    } catch {
      // Not remembered across visits, that's all.
    }
  };
  close.addEventListener("click", () => {
    hideTip();
    setOpen(false);
  });
  opener.addEventListener("click", () => setOpen(true));

  document.body.append(panel, opener, tip);
  // Closed until someone opens it: first-time visitors see the scene, not the knobs.
  let open = false;
  try {
    open = localStorage.getItem(OPEN_KEY) === "1";
  } catch {
    // Default to closed.
  }
  setOpen(open);

  return {
    sync() {
      refreshAll();
      save();
    },
    /** Take the panel off the page, e.g. to mount another scene's. */
    destroy() {
      panel.remove();
      opener.remove();
      tip.remove();
    },
  };
}
