
**Project:** Bramha Bajannavar — Personal Portfolio\
**Reference implementation:** [DesignerStephen1/ascii-animals](https://github.com/DesignerStephen1/ascii-animals?utm_source=chatgpt.com)\
**Live reference:** [ASCII Animals](https://www.pocketstudio.design/ascii-animals-app/index.html?utm_source=chatgpt.com)\
**Target:** [Current portfolio](https://bramhabajannavar.dev?utm_source=chatgpt.com)\
**Specification version:** 1.0\
**Date:** 15 November 2026

## **1. Product vision**

The objective is to transform the existing developer portfolio into an immersive, interactive ASCII environment inspired by ASCII Animals.

This is not a request to add an ASCII animation to the background of the existing portfolio.

The intended transformation is much deeper:

- The entire visual identity should revolve around animated ASCII creatures.
- The background should feel like a living environment rather than a static webpage.
- A translucent, liquid-glass interface should float above the animated environment.
- Navigation should be integrated into the visual experience.
- The homepage should feel like an interactive desktop environment rather than a traditional developer portfolio.
- The existing portfolio's content, projects, experience, education, technical information and SEO must remain intact.

The reference's defining composition is:

[Ann Nguyen - Frontend Developer & AI Design Enthusiast](https://images.openai.com/static-rsc-4/txp6KCDWF39BVSQ2BTGnQAbJC_uKSzPTPQptj3t-OQfKOAz8IAxD-jrlRNY9CiGct37IxOoiy3KODpGU7rptop_yoenOnfpdViEQb1D1_zh32TA5QRqWA6l7UR_M6bcJIyQ4m3ez8Xkb2MmAdeqvipbCuh_xqObcaVXc1Lc7rRg?purpose=inline)

The reference has four core visual layers:

1. A full-screen ASCII animation engine.
2. A depth-based population of animated creatures.
3. A floating animal-selection bar.
4. A centered glass interface containing a greeting and interactive composer.

It also has a configurable Tweaks panel.

The critical design principle is that the animation and interface must coexist. Neither should make the other difficult to use.

## **2. Reference implementation: verified architecture**

The reference repository is unusually useful because it exposes the actual animation engine instead of hiding it behind an external animation library.

### **2.1 Repository structure**

The repository contains:

```
ascii-animals/
│
├── public/
│   └── dia-logo.png
│
├── src/
│   ├── animals/
│   │   ├── index.ts
│   │   ├── butterflies.ts
│   │   ├── koi.ts
│   │   ├── jellyfish.ts
│   │   ├── dragonflies.ts
│   │   ├── frogs.ts
│   │   ├── cranes.ts
│   │   └── crabs.ts
│   │
│   ├── engine.ts
│   ├── flock.ts
│   ├── renderer.ts
│   ├── ink.ts
│   ├── math.ts
│   └── index.ts
│
├── index.html
├── page.css
├── ui.ts
├── panel.ts
├── demo.ts
├── compare.ts
├── compare.html
├── package.json
├── package-lock.json
└── tsconfig.json
```

The architecture separates the animation simulation from the presentation layer.

| File               | Responsibility                                            |
| ------------------ | --------------------------------------------------------- |
| `engine.ts`        | Animation lifecycle, timing, resizing, input              |
| `flock.ts`         | Creature population, movement, depth, steering            |
| `renderer.ts`      | ASCII character rendering                                 |
| `ink.ts`           | Colour generation and visual properties                   |
| `math.ts`          | Mathematical utilities and deterministic random functions |
| `animals/index.ts` | Animal registration                                       |
| `animals/*.ts`     | Individual animal shapes and behaviours                   |
| `ui.ts`            | Animal selector, greeting and composer                    |
| `panel.ts`         | Tweaks panel and settings persistence                     |
| `page.css`         | Visual styling and glass effects                          |
| `demo.ts`          | Demo application bootstrap                                |

This separation should be retained when integrating it into the portfolio.

### **2.2 Actual technology stack**

The reference is built with:

| Technology            | Usage                          |
| --------------------- | ------------------------------ |
| TypeScript            | Simulation and interface logic |
| Vite                  | Development server and build   |
| HTML5 Canvas          | ASCII animation                |
| CSS                   | Interface and glass effects    |
| SVG filters           | Liquid-glass refraction        |
| LocalStorage          | Persistent tuning preferences  |
| ResizeObserver        | Canvas resizing                |
| IntersectionObserver  | Visibility-based pausing       |
| requestAnimationFrame | Animation loop                 |

Its package configuration:

```
{
  "name": "ascii-animals",
  "version": "0.1.0",
  "private": true,
  "license": "MIT",
  "type": "module",
  "main": "src/index.ts",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "vite": "^6.0.0"
  }
}
```

There are no runtime dependencies.

The implementation does not require React, Three.js, PixiJS, GSAP or a physics engine.

**Important integration decision:** Do not replace the existing portfolio's Next.js application with Vite. Port or import the TypeScript animation engine into the existing application.

The existing portfolio already uses Next.js 16, React 19, Once UI, TypeScript, Sass and MDX. Those technologies should remain. The animation engine should be an independent client-side module.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub+4



### **2.3 The seven animal species**

The reference registers seven species in this exact order:

| Order | Species     | Colour identity                | Behaviour                   |
| ----- | ----------- | ------------------------------ | --------------------------- |
| 1     | Butterflies | Blue                           | Fluttering migration        |
| 2     | Koi         | Yellow/gold, white, red, black | Lazy S-curves, feeding      |
| 3     | Jellyfish   | Magenta                        | Pulsating, drifting         |
| 4     | Dragonflies | Emerald                        | Hovering, darting           |
| 5     | Frogs       | Green                          | Sitting, breathing, jumping |
| 6     | Cranes      | Red crown, white and black     | Flying and gliding          |
| 7     | Crabs       | Orange/red                     | Sideways scuttling          |

These are seven separate animation implementations, not seven recoloured copies of one generic animal.

#### **Butterflies**

- Blue morpho butterflies.
- Wings represented by separate forewing and hindwing lobes.
- Wings flap with a travelling motion.
- Downstroke creates thrust.
- Flutter includes random deviation that gradually returns to zero.
- Periodic gliding holds the wings flat.
- Wing patterns are generated procedurally.

#### **Koi**

- Fourteen-node follow-the-leader spine.
- Head leads the movement.
- Each node follows the node ahead.
- Joint stiffness prevents unnatural folding.
- A travelling body wave produces swimming motion.
- Five varieties: Kohaku, Sanke, Showa, Ogon and Chagoi.
- Food causes nearby fish to turn and swim towards it.
- Fish gulp pellets when they reach them.
- Leftover food fades.
- Ripples are left behind.

#### **Jellyfish**

- Magenta bioluminescent bodies.
- Bell expands and contracts.
- Glow intensifies with the pulse.
- Glow gradually fades.
- Frilly arms twist independently.
- Marine snow particles provide environmental depth.

#### **Dragonflies**

- Emerald body.
- Hovering and sudden directional movement.
- Periods of sustained cruising.
- White eyes with black pupils on nearer specimens.
- Striped thorax.
- Transparent, veined wings.
- Moving highlights along the wings.

#### **Frogs**

- Spotted leopard frogs.
- Stationary resting periods.
- Breathing animation.
- Periodic blinking.
- Leaps follow an arc.
- Apparent size changes with depth and position.
- Splash effects when landing.

#### **Cranes**

- Japanese red-crowned crane visual treatment.
- Independent flight paths.
- Individual flap frequencies.
- Occasional gliding.
- White wings with black secondary feathers.
- Red crown and dark eyes.
- Folding wing animation.

#### **Crabs**

- Sideways locomotion.
- Burst-based movement.
- Individually stepping legs.
- Footprints in the sand.
- Clicking startles them.
- They escape with claws raised.

**Product requirement:** These animal definitions should remain independent. Avoid consolidating all seven into a generic particle system.

The animal selector must actually change the underlying simulation, not just change a selected label.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub+3



## **3. Visual design specification**

This section establishes the visual values that should be reproduced, with a distinction between reference values and proposed portfolio adaptations.

### **3.1 Overall visual direction**

Reference characteristics

The visual language should be:

- Dark, atmospheric and immersive.
- Low-contrast background with bright creatures.
- Minimal interface chrome.
- Soft translucent glass.
- Large amounts of negative space.
- Rounded controls.
- Monospace character rendering.
- Subtle depth through size, opacity and movement.
- No conventional card-heavy dashboard aesthetic.

The result should feel like a living desktop environment.

### **3.2 Colour system**

The reference stylesheet defines both light and dark themes. The HTML explicitly initializes the application in dark mode.

For this portfolio, dark mode should be the primary and default appearance.

**Exact reference colour tokens**

```
:root {
  --bg: #f6f3ec;

  --text: #1b1f30;
  --text-soft: rgba(27, 31, 48, 0.72);
  --muted: rgba(27, 31, 48, 0.42);

  --tint-a: 0.34;
  --tint-b: 0.08;

  --glass-edge: rgba(255, 255, 255, 0.8);
  --glass-rim: rgba(255, 255, 255, 0.95);
  --glass-rim-low: rgba(255, 255, 255, 0.35);
  --glass-glow: rgba(255, 255, 255, 0.35);
  --glass-sheen: rgba(255, 255, 255, 0.35);

  --glass-shadow:
    0 12px 40px rgba(28, 40, 96, 0.14),
    0 2px 8px rgba(28, 40, 96, 0.08);

  --chip: rgba(255, 255, 255, 0.4);
  --chip-hover: rgba(255, 255, 255, 0.7);
  --chip-edge: rgba(27, 31, 48, 0.1);

  --accent: #2a5fe6;
  --accent-soft: rgba(42, 95, 230, 0.12);
  --accent-edge: rgba(42, 95, 230, 0.35);

  --thumb: rgba(255, 255, 255, 0.85);
  --focus: rgba(42, 95, 230, 0.28);
}
```

Dark theme:

```
[data-theme="dark"] {
  --bg: #06070c;

  --text: #e8ebf7;
  --text-soft: rgba(232, 235, 247, 0.72);
  --muted: rgba(232, 235, 247, 0.4);

  --tint-a: 0.1;
  --tint-b: 0.03;

  --glass-edge:
    rgba(255, 255, 255, calc(0.14 * var(--edge, 1)));

  --glass-rim:
    rgba(255, 255, 255, calc(0.32 * var(--edge, 1)));

  --glass-rim-low:
    rgba(255, 255, 255, calc(0.08 * var(--edge, 1)));

  --glass-glow: rgba(140, 170, 255, 0.07);
  --glass-sheen: rgba(255, 255, 255, 0.1);

  --glass-shadow:
    0 16px 48px rgba(0, 0, 0, 0.55),
    0 2px 8px rgba(0, 0, 0, 0.4);

  --chip: rgba(255, 255, 255, 0.05);
  --chip-hover: rgba(255, 255, 255, 0.12);
  --chip-edge: rgba(255, 255, 255, 0.1);

  --accent: #7aa2ff;
  --accent-soft: rgba(122, 162, 255, 0.14);
  --accent-edge: rgba(122, 162, 255, 0.4);

  --thumb: rgba(255, 255, 255, 0.14);
  --focus: rgba(122, 162, 255, 0.3);

  color-scheme: dark;
}
```

These values are from the actual source stylesheet.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub+1



**Portfolio implementation decision**

Retain these values for the animated environment and glass interface.

Do not introduce the previous portfolio's electric cyan as a competing primary accent. It would create a different visual identity from the reference.

The portfolio's brand should instead appear through its content, personal mark and selected animal colours.

### **3.3 Animal colours**

The renderer uses RGB arrays and individual animal palettes.

For koi, the exact base colours are:

```
const WHITE: RGB = [244, 240, 230];
const RED: RGB = [222, 66, 40];
const BLACK: RGB = [34, 34, 40];
const GOLD: RGB = [238, 182, 64];
const ORANGE: RGB = [236, 124, 44];
const FIN: RGB = [236, 226, 214];
```

The renderer has these exact shared character ramps:

```
const SCALE_RAMP = ".:;+=*%#";
const DARK_GLYPHS = "#%@";
const SPOT_GLYPHS = "o*";
const BODY_GLYPHS = "8#@";
const GLOW_RAMP = ".:+*";
const EDGE_HEAVY = ":;";
const EDGE_LIGHT = ".'`,";
```

The renderer also has three sparkle colours:

```
const SPARKLES: RGB[] = [
  [255, 255, 255],
  [228, 246, 255],
  [200, 244, 255]
];
```

Do not substitute emoji, SVG illustrations or raster animal images for the primary animal rendering.

The reference's visual identity comes from the combination of actual creature silhouettes, ASCII glyphs, coloured cells and trails.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://raw.githubusercontent.com\&sz=32)

GitHub+1



### **3.4 Typography**

The reference loads two Google Fonts:

```
<link
  href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&family=Geist+Mono:wght@600&display=swap"
  rel="stylesheet"
/>
```

Typography configuration:

| Usage                | Font                            | Weight |
| -------------------- | ------------------------------- | ------ |
| Main interface       | Geist                           | 400    |
| Greeting             | SF Pro Display fallback / Geist | 500    |
| Animal selector      | Geist                           | 500    |
| ASCII creatures      | Geist Mono                      | 600    |
| Tweak panel headings | Geist Mono                      | 600    |
| Tweak values         | Geist Mono                      | 600    |

Main CSS:

```
body {
  font-family: Geist, ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

canvas {
  font-family: "Geist Mono", ui-monospace, Menlo, monospace;
}
```

Greeting:

```
.greeting {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "SF Pro Display",
    Geist,
    system-ui,
    sans-serif;

  font-size: clamp(24px, 5vw, 32px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;

  color: #e8e8e8;

  text-shadow:
    0 0 6px var(--bg),
    0 0 24px var(--bg);
}
```

Composer text:

```
.composer textarea {
  font-size: 17px;
  font-weight: 400;
  line-height: 1.55;
}
```

Tweak panel category headings:

```
font: 600 10px/1 "Geist Mono", ui-monospace, monospace;
letter-spacing: 0.08em;
text-transform: uppercase;
```

**Portfolio requirement:** Use Geist as the primary font throughout the site. Use Geist Mono for technical metadata, labels, terminal-style information and ASCII rendering.

Avoid introducing a second decorative display font.

### **3.5 Glassmorphism specification**

The glass panel is one of the most important parts of the reference.

It is not simply a semi-transparent rectangle with `backdrop-filter: blur()`.

It combines:

1. A translucent gradient.
2. A border.
3. An inset top rim.
4. A lower rim.
5. A subtle internal glow.
6. A soft external shadow.
7. Backdrop blur.
8. Saturation enhancement.
9. An overlay sheen.
10. Optional SVG-based refraction.

The actual CSS:

```
.glass {
  position: fixed;
  isolation: isolate;

  background: linear-gradient(
    135deg,
    rgba(
      255,
      255,
      255,
      calc(var(--tint-a) * var(--tint, 1))
    ),
    rgba(
      255,
      255,
      255,
      calc(var(--tint-b) * var(--tint, 1))
    )
  );

  border: 1px solid var(--glass-edge);

  box-shadow:
    inset 1px 1px 0 var(--glass-rim),
    inset -1px -1px 0 var(--glass-rim-low),
    inset 0 0 24px var(--glass-glow),
    var(--glass-shadow);

  -webkit-backdrop-filter:
    blur(var(--blur, 6px)) saturate(180%);

  backdrop-filter:
    blur(var(--blur, 6px)) saturate(180%);

  transition:
    background 0.4s,
    border-color 0.4s,
    box-shadow 0.4s;
}
```

Sheen:

```
.glass::after {
  content: "";

  position: absolute;
  inset: 0;
  z-index: -1;

  border-radius: inherit;

  background:
    linear-gradient(
      180deg,
      var(--glass-sheen),
      transparent 48%
    );

  pointer-events: none;
}
```

### **Refraction filter**

The reference uses an SVG filter:

```
<filter
  id="liquid-glass"
  x="0"
  y="0"
  width="100%"
  height="100%"
  color-interpolation-filters="sRGB"
>
  <feTurbulence
    type="fractalNoise"
    baseFrequency="0.007 0.011"
    numOctaves="2"
    seed="11"
    result="noise"
  />

  <feGaussianBlur
    in="noise"
    stdDeviation="2"
    result="map"
  />

  <feDisplacementMap
    in="SourceGraphic"
    in2="map"
    scale="40"
    xChannelSelector="R"
    yChannelSelector="G"
  />
</filter>
```

The reference only activates this SVG displacement treatment in Chromium-based browsers. Other browsers fall back to frosted glass.

**Required portfolio behaviour:**

- Chromium: liquid refraction plus blur.
- Safari: translucent frosted glass.
- Firefox: translucent frosted glass.
- Unsupported filters: no broken or invisible UI.
- All versions must retain the same panel dimensions and hierarchy.

Do not make the refraction filter a prerequisite for rendering the page.

### **3.6 Geometry and spacing**

Reference values:

| Component                        | Value                  |
| -------------------------------- | ---------------------- |
| Animal bar top offset            | 18px                   |
| Animal bar internal padding      | 4px                    |
| Animal button height             | 32px                   |
| Animal button horizontal padding | 11px / 13px            |
| Animal selector gap              | 2px                    |
| Animal swatch                    | 9px                    |
| Main composer width              | 720px maximum          |
| Composer side clearance          | 16px                   |
| Composer border radius           | 24px                   |
| Composer padding                 | 18px 12px 12px 18px    |
| Composer internal gap            | 18px                   |
| Greeting logo width              | 76px                   |
| Logo aspect ratio                | 159:129                |
| Masthead gap                     | 16px                   |
| Masthead bottom spacing          | 28px                   |
| Tweaks panel width               | 288px                  |
| Tweaks panel radius              | 20px                   |
| Tweaks panel top/right offset    | 16px                   |
| Tweaks panel maximum height      | viewport height − 32px |

These values should be used as the starting point for the portfolio.

## **4. Animation engine specification**

This is the most technically important part of the project.

The objective is to reproduce the reference's behaviour, not to create a generic floating-particle background.

### **4.1 World model**

The environment consists of a population of creatures moving through a shared directional course.

The simulation maintains:

- Creature identity.
- Position.
- Velocity.
- Heading.
- Depth.
- Size.
- Individual movement deviation.
- Startled state.
- Visibility/removal state.
- Species-specific animation state.

The creature interface:

```
export interface Creature {
  id: number;
  roll: number;
  depth: number;
  span: number;

  x: number;
  y: number;

  vx: number;
  vy: number;

  heading: number;
  bias: number;

  startledUntil: number;
  gone: boolean;
}
```

Depth is important.

It determines:

- Apparent creature size.
- Movement speed.
- Visibility.
- Rendering order.
- Colour intensity.
- Distance perception.

The population is sorted from farthest to nearest, allowing nearer animals to render over farther ones.

### **4.2 Shared movement configuration**

These are the actual shared defaults:

```
export const SHARED_TUNING = {
  density: 1,
  corner: false,
  direction: 49,
  speed: 1,

  sway: 0.04,
  spread: 0.06,

  size: 1,
  farthest: 0.45,
  farBias: 1.6,

  grip: 2,
  separation: 300,

  hueShift: 0,
  shimmer: 0.3,
  sparkle: 0.12,
  fog: 0.75,

  trail: 1,
  trailFade: 1.3,
  grid: 1.05,
  detail: 1.3
};
```

Meaning:

| Parameter  | Default | Function                               |
| ---------- | ------- | -------------------------------------- |
| Density    | 1       | Population multiplier                  |
| Corner     | false   | Corner-to-corner travel                |
| Direction  | 49°     | Default course                         |
| Speed      | 1       | Global speed multiplier                |
| Sway       | 0.04    | Group deviation                        |
| Spread     | 0.06    | Individual deviation                   |
| Size       | 1       | Size multiplier                        |
| Farthest   | 0.45    | Minimum relative depth                 |
| Far bias   | 1.6     | Distribution towards distant creatures |
| Grip       | 2       | Course adherence                       |
| Separation | 300     | Neighbour separation                   |
| Hue shift  | 0°      | Colour wheel rotation                  |
| Shimmer    | 0.3     | Iridescence strength                   |
| Sparkle    | 0.12    | White sparkle probability              |
| Fog        | 0.75    | Distance fading                        |
| Trail      | 1       | Trail strength                         |
| Trail fade | 1.3     | Trail fade rate                        |
| Grid       | 1.05    | Character grid strength                |
| Detail     | 1.3     | ASCII resolution multiplier            |

These are not arbitrary designer values. They are actual simulation defaults.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://raw.githubusercontent.com\&sz=32)

GitHub+1



### **4.3 Course movement**

The simulation supports two modes.

**Mode A: Directional movement**

A shared course direction controls the general trajectory.

```
0°   = right
90°  = up
180° = left
270° = down
```

Individual creatures may deviate from the shared course.

**Mode B: Corner-to-corner movement**

```
Bottom-left  →  Top-right
```

The trajectory adapts to the viewport shape.

The stream also has shared sway and individual spread.

This produces movement that feels coordinated without making every creature move identically.

### **4.4 Re-entry**

When an animal exits downstream, it re-enters upstream.

Requirements:

- No obvious teleporting within the visible region.
- Re-entry must happen outside the viewport.
- Depth must remain consistent with the creature's new position.
- Creatures must not accumulate at the edges.
- Movement should continue without a visible reset.

This behaviour is explicitly documented by the reference.

### **4.5 Parallax**

The engine uses depth as a distance approximation.

A proposed visual model for implementation:

```
const size = baseSize * depthScale;
const velocity = baseSpeed * speedScale;
const opacity = depthOpacity;
```

The exact reference calculations should be retained when porting the engine; the above is a conceptual model, not a replacement formula.

Expected appearance:

- Far creatures: smaller, slower and less saturated.
- Mid-distance creatures: normal size and contrast.
- Near creatures: larger, more vivid and visually dominant.

This depth model should remain visible even on a dark, nearly uniform background.

### **4.6 Species-specific animation**

Each animal should implement its own:

```
interface Animal<T> {
  key: string;
  label: string;
  swatch: RGB;

  defaults: T;
  controls: ControlGroup[];

  area: number;
  scale: number;
  speed: number;

  create(): T;
  enter(): void;
  update(): void;
  draw(): void;
}
```

This is a conceptual summary of the reference's animal-definition contract. Preserve the actual repository interface when importing its code.

Do not implement a single animation function with seven conditional branches. Keep species behaviour isolated.

### **4.7 Koi-specific defaults**

The actual Koi configuration:

```
const DEFAULTS = {
  ...SHARED_TUNING,

  fog: 0.64,
  density: 1.6,
  speed: 1.6,

  spread: 0,
  sway: 0,

  farthest: 0.33,
  farBias: 1.3,

  grip: 2.65,
  separation: 780,

  trail: 4,
  trailFade: 0.4,

  shimmer: 0.35,
  sparkle: 0.08,

  meander: 0.4,
  foodRange: 200,
  tailBeat: 1
};
```

Additional exact parameters:

```
const NODES = 14;

area: 75000;
scale: 1.15;
speed: 50;
```

Koi control groups:

| Group    | Setting    | Min | Max | Step |
| -------- | ---------- | --- | --- | ---- |
| Swimming | Meander    | 0   | 3   | 0.05 |
| Swimming | Tail beat  | 0.2 | 3   | 0.05 |
| Feeding  | Food range | 0   | 500 | 10   |

### **4.8 Interaction and reactions**

The reference has two interaction categories.

**Global canvas interaction**

A click/tap on the canvas startles nearby creatures.

```
private onPointerDown = (e: PointerEvent) => {
  if (this.reducedMotion.matches || e.target !== this.canvas) return;

  const rect = this.canvas.getBoundingClientRect();

  this.flock.startle(
    e.clientX - rect.left,
    e.clientY - rect.top
  );
};
```

**Species-specific interaction**

Examples:

| Species   | Reaction                              |
| --------- | ------------------------------------- |
| Butterfly | Disturbed flight path                 |
| Koi       | Moves away; separate food interaction |
| Jellyfish | Movement/pulse reaction               |
| Dragonfly | Darting response                      |
| Frog      | Leap                                  |
| Crane     | Flight disturbance                    |
| Crab      | Escapes with claws raised             |

For Koi, a tap drops food.

The food system:

1. Creates multiple pellets.
2. Assigns landing locations.
3. Animates their descent.
4. Produces landing ripples.
5. Checks which koi are within food range.
6. Steers nearby koi towards the closest meal.
7. Removes or fades consumed/remaining food.

**Portfolio adaptation:** Keep canvas interactions. Add an explicit click/tap interaction on the animals, but ensure clicking a project link or navigation control never triggers the animal disturbance.

### **4.9 Animation timing**

The reference uses a fixed simulation step:

```
const STEP = 1 / 60;
const MAX_STEPS = 4;
```

Frame handling:

```
const dt = Math.min(0.1, (now - this.last) / 1000);

this.last = now;
this.acc += dt;

let steps = 0;

while (this.acc >= STEP && steps < MAX_STEPS) {
  this.flock.step(STEP);
  this.acc -= STEP;
  steps++;
}

if (steps === MAX_STEPS) {
  this.acc = 0;
}

this.renderer.render(this.flock, dt);

this.raf = requestAnimationFrame(this.frame);
```

Requirements:

- Fixed-step simulation at 60Hz.
- Render with requestAnimationFrame.
- Maximum four simulation catch-up steps per frame.
- Clamp frame delta to 100ms.
- Discard excess accumulated time if the catch-up limit is reached.
- Never let a suspended tab accumulate an enormous simulation backlog.

A 60Hz simulation does not mean every device renders at exactly 60 FPS. Actual rendering depends on display refresh rate and available processing power.

### **4.10 Visibility and lifecycle**

The engine uses:

- ResizeObserver.
- IntersectionObserver.
- MediaQueryList for reduced motion.
- requestAnimationFrame.
- Canvas disposal.

The canvas should stop consuming animation resources when it is not visible.

On destruction:

- Cancel the pending animation frame.
- Disconnect ResizeObserver.
- Disconnect IntersectionObserver.
- Remove event listeners.
- Dispose of any engine references.

This is especially important when switching between Next.js routes.

### **4.11 Device pixel ratio**

The reference caps device pixel ratio at 2:

```
const dpr = Math.min(
  window.devicePixelRatio || 1,
  2
);
```

This should be retained.

A higher DPR can substantially increase canvas rendering cost without providing enough perceptual improvement for the ASCII grid.

### **4.12 Reduced motion**

The engine explicitly detects:

```
window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
```

The portfolio must:

- Render a still ASCII scene.
- Stop continuous simulation.
- Keep the content and controls usable.
- Re-render when settings change.
- Avoid continuous decorative transitions.
- Respect preference changes while the page is open.

Do not disable the entire animation layer by hiding the canvas. A static scene should remain visible.

[image](https://www.google.com/s2/favicons?domain=https://raw.githubusercontent.com\&sz=32)

GitHub+4

# **5. Portfolio product requirements**

The reference is an interactive animal application. The target is a developer portfolio.

Simply copying its interface without changing its information architecture would produce a beautiful but ineffective portfolio.

The following adaptation is the recommended product direction.

## **5.1 Overall application structure**

The portfolio should have five principal routes:

```
/
├── Home
│   ├── Animated ASCII environment
│   ├── Personal greeting
│   ├── Glass portfolio launcher
│   ├── Featured work
│   └── Introduction
│
├── /about
│   ├── About me
│   ├── Experience
│   ├── Education
│   ├── Skills
│   └── Social links
│
├── /work
│   ├── Project directory
│   └── Project details
│
├── /blog
│   ├── Featured article
│   └── Article directory
│
└── /blog/[slug]
    └── Individual article
```

The gallery is optional and should not be introduced unless there is actual content for it.

### **Global experience**

The ASCII environment should be persistent across all routes.

Recommended architecture:

```
Root Layout
│
├── Global ASCII Background
│   └── AnimalEngine
│
├── Global Navigation
│
├── Route Content
│   ├── Home
│   ├── About
│   ├── Work
│   └── Blog
│
├── Global Tweaks Panel
│
└── Global Footer / Contact
```

The canvas should sit behind the content.

The reference uses a fixed full-screen canvas and an application that fits within the viewport. The portfolio must support scrolling pages, so the canvas should remain fixed while route content scrolls above it.

**Important:** Do not apply `overflow: hidden` globally to the Next.js application. That would break the existing portfolio's long-form pages.

The homepage's first viewport should reproduce the reference composition closely. Other pages should preserve the same background atmosphere while presenting readable content.

## **5.2 Homepage**

Highest priority

The homepage is where the reference should be reproduced most closely.

### **Desktop composition**

Butterfly

Koi

Jellyfish

Dragonfly

Frog

Crane

Crab

# **BB**

# Good evening, Bramha

Software Engineer · AI & Mobile Applications

Explore my work, experience and projects...

Projects

About me

Illustrative layout reconstruction — not a live screenshot.

### **Layout hierarchy**

| Element         | Position       | Requirement                      |
| --------------- | -------------- | -------------------------------- |
| Animal selector | Top centre     | Floating glass segmented control |
| Tweaks button   | Top right      | Small floating glass pill        |
| Personal mark   | Centre         | Above greeting                   |
| Greeting        | Centre         | Dynamic time-based greeting      |
| Role            | Below greeting | Short professional positioning   |
| Composer        | Centre         | Main interactive surface         |
| ASCII creatures | Full viewport  | Background layer                 |

### **Personal greeting**

The reference has a time-based greeting.

Its exact logic:

```
export function greetingFor(
  name: string,
  date = new Date()
) {
  const h = date.getHours();

  if (h >= 5 && h < 12)
    return `Good morning, ${name}`;

  if (h >= 12 && h < 17)
    return `Good afternoon, ${name}`;

  if (h >= 17 && h < 22)
    return `Good evening, ${name}`;

  return `Still up, ${name}?`;
}
```

For the portfolio:

```
Good morning, Bramha
Good afternoon, Bramha
Good evening, Bramha
Still up, Bramha?
```

The greeting should update every 60 seconds while the page remains open.

Use the browser's local time, not a hardcoded timezone.

### **Personal identity**

Do not copy the Dia logo.

The reference uses a Dia logo extracted from a screenshot, specifically for its concept redesign. That asset is not an appropriate portfolio identity.

Use:

- BB monogram.
- Your existing profile image, if suitable.
- A custom minimal glass symbol.

Preferred initial implementation: BB monogram in a translucent circular or softly rounded glass container.

### **Role and supporting text**

Suggested content:

```
Bramha Bajannavar

Software Engineer · AI & Mobile Applications

Building practical software, intelligent systems
and thoughtful digital experiences.
```

Keep this short.

Do not put the complete biography into the first viewport.

## **5.3 Glass composer: portfolio adaptation**

This is the main interaction surface.

The original reference has a fake chat interface that dispatches:

```
new CustomEvent("chat:submit", {
  detail: { text }
});
```

It does not actually connect to an AI backend.

For the portfolio, the composer should be a real navigation and discovery interface.

### **Recommended default appearance**

Placeholder:

```
Explore my work, projects and experience...
```

Bottom-left action:

```
Explore projects
```

Right-side actions:

- About.
- Send / navigate.

### **Functional behaviour**

The composer should support:

| Action                 | Behaviour                               |
| ---------------------- | --------------------------------------- |
| Enter                  | Execute the selected navigation command |
| Shift + Enter          | New line                                |
| Click Explore projects | Navigate to `/work`                     |
| Click About            | Navigate to `/about`                    |
| Type project name      | Show matching projects                  |
| Type `about`           | Suggest About                           |
| Type `experience`      | Suggest About / experience section      |
| Type `blog`            | Navigate to Blog                        |
| Type `contact`         | Open contact action                     |
| Escape                 | Close suggestions                       |

Suggested commands:

```
projects
work
about
experience
education
skills
blog
contact
resume
github
```

The composer should not pretend to be an AI chatbot.

If you later want an actual portfolio assistant, that can be added as a separate feature with an explicit backend.

### **Composer behaviour**

- Auto-growing textarea.
- Minimum height of 27px.
- Maximum height of 200px.
- Disabled send button for empty input.
- Enter submits.
- Shift + Enter inserts a newline.
- Do not submit during IME composition.
- Focus automatically on desktop only.
- Do not automatically open the mobile keyboard.

These reproduce the reference's input behaviour while adapting the action to real portfolio navigation.

## **5.4 Animal selection bar**

Retain all seven animals.

Use the original order:

```
Butterfly | Koi | Jellyfish | Dragonfly |
Frog | Crane | Crab
```

Each button:

- Has a coloured circular indicator.
- Has a species label.
- Uses a translucent glass background.
- Has an animated selected-state indicator.
- Changes the entire creature simulation.

Exact reference button styling:

```
.choices {
  display: flex;
  gap: 2px;

  padding: 4px;
  border-radius: 999px;

  overflow-x: auto;
  scrollbar-width: none;
}

.choices button {
  height: 32px;
  padding: 0 13px 0 11px;

  border: 0;
  border-radius: 999px;

  background: none;

  font-size: 13px;
  font-weight: 500;

  white-space: nowrap;
  cursor: pointer;

  transition: color 0.3s;
}
```

Selected state:

```
.choices button[aria-checked="true"] {
  color: var(--text);
}
```

The selected background is a separate moving element:

```
.choices .thumb {
  position: absolute;

  top: 4px;
  bottom: 4px;
  left: 0;

  border-radius: 999px;
  background: var(--thumb);

  transition:
    translate 0.35s cubic-bezier(0.3, 1.3, 0.5, 1),
    width 0.35s cubic-bezier(0.3, 1.3, 0.5, 1);
}
```

The moving thumb is important. Do not replace it with seven static selected backgrounds.

### **Selection persistence**

When the user selects an animal:

1. Update the selected species.
2. Reset the simulation to the new species' defaults.
3. Render the new population.
4. Update the selected tab.
5. Save the selected species in localStorage.

Persist the last selected animal between visits.

The reference already supports URL selection:

```
?animal=koi
?count=60
```

For the portfolio, support:

```
?animal=butterflies
?animal=koi
?animal=jellyfish
?animal=dragonflies
?animal=frogs
?animal=cranes
?animal=crabs
```

The URL parameter should override the stored selection on initial load.

## **5.5 Tweaks panel**

This is a secondary feature, but it contributes significantly to the reference's character.

The original panel is positioned in the top-right corner.

Desktop:

```
.tweaks {
  top: 16px;
  right: 16px;

  width: 288px;
  max-height: calc(100vh - 32px);

  display: flex;
  flex-direction: column;

  border-radius: 20px;
  font-size: 12px;
}
```

The panel contains:

```
Tweaks

[Copy] [Reset] [Close]

MOVEMENT
  Density
  Corner to corner
  Direction
  Speed
  Sway
  Spread
  Size
  Farthest depth
  Far bias
  Grip
  Separation

LOOK
  Hue shift
  Shimmer
  Sparkle
  Fog
  Trail
  Trail fade
  Grid
  Detail

ANIMAL-SPECIFIC SETTINGS

CHAT GLASS
  Blur
  Refraction
  Ripple
  Tint
  Edge
  Corner radius
  Width
```

The complete animal-specific settings are determined by each animal definition.

### **Shared settings**

Use the actual reference ranges:

| Setting          | Minimum | Maximum | Step   |
| ---------------- | ------- | ------- | ------ |
| Density          | 0.1     | 4       | 0.05   |
| Corner to corner | Off     | On      | Toggle |
| Direction        | 0       | 360     | 1      |
| Speed            | 0.1     | 3       | 0.05   |
| Sway             | 0       | 0.6     | 0.01   |
| Spread           | 0       | 0.8     | 0.01   |
| Size             | 0.3     | 2.5     | 0.05   |
| Farthest depth   | 0.1     | 1       | 0.01   |

The remaining shared visual controls should be ported from `SHARED_CONTROLS` in `flock.ts`, rather than recreated with guessed values.

### **Glass settings**

These exact ranges are defined in `panel.ts`:

| Setting       | Minimum | Maximum | Step  |
| ------------- | ------- | ------- | ----- |
| Blur          | 0px     | 30px    | 0.5   |
| Refraction    | 0       | 150     | 1     |
| Ripple        | 0.001   | 0.04    | 0.001 |
| Tint          | 0       | 3       | 0.05  |
| Edge          | 0       | 2       | 0.05  |
| Corner radius | 0px     | 48px    | 1     |
| Width         | 320px   | 960px   | 10    |

### **Panel functionality**

- Live updates when sliders change.
- Each animal has its own tuning defaults.
- Shared settings are reused across species.
- Double-click a label to reset that setting.
- Copy exports changed settings as JSON.
- Reset uses a confirmation state.
- Close dismisses the panel.
- Settings persist between visits.

Persistence uses localStorage.

The reference saves only the changed settings and merges them with the defaults when loading.

The portfolio should namespace its settings:

```
bramha-portfolio:animal
bramha-portfolio:tweaks
bramha-portfolio:glass
bramha-portfolio:tweaks-open
```

Do not reuse the reference's `ascii-animals:` keys. This avoids collisions and gives the portfolio independent settings.

The panel should be implemented after the core portfolio and animation are stable.

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub+4

# **6. Other portfolio pages**

The home page should be the closest reproduction of ASCII Animals. Other pages should extend its design language rather than becoming copies of the landing screen.

## **6.1 About page**

The About page should feel like a glass information panel placed over a living environment.

Suggested section structure:

```
ABOUT

[Profile / BB identity]

Bramha Bajannavar
CSE Undergraduate
Software Engineer

Introduction

WORK EXPERIENCE
  Samsung PRISM
  Antariksha Labs

EDUCATION
  BMS College of Engineering

TECHNICAL SKILLS
  Programming
  Application Development
  Backend & Data
  AI & Machine Learning
  Cloud & DevOps

SOCIAL LINKS
  GitHub
  LinkedIn
  Email
  Codolio
```

### **Design requirements**

- Keep the animated canvas fixed behind the page.
- Use translucent dark sections.
- Use Geist for all normal content.
- Use Geist Mono for section metadata.
- Use fine glass borders.
- Use small accent indicators.
- Avoid excessive card grids.
- Use vertical timelines for work experience.
- Use tags for technologies.
- Preserve the existing content and links.

### **Experience presentation**

Each experience entry should include:

```
COMPANY NAME
Role

Employment dates
Location

Description

Key contributions
Technology tags
```

Use a vertical timeline with a subtle glowing line and small circular markers.

The animation should never make experience descriptions difficult to read.

## **6.2 Work page**

The Work page should be a project directory, not a conventional portfolio card wall.

Recommended layout:

```
SELECTED WORK

A collection of systems, tools
and experiments I've built.

[All] [AI/ML] [Mobile] [Backend] [Systems]

PROJECT DIRECTORY

01  PaperMind Workspace
02  Hover Dock
03  EdgeECG / Other projects
04  Search & Chat System
05  Other projects...
```

Use the actual existing project inventory from the portfolio repository. Do not invent new project records.

### **Project row specification**

Each row should contain:

- Project index.
- Project title.
- Short description.
- Technology tags.
- Project category.
- External repository/live link.
- Optional image preview.

On hover:

- Row background becomes slightly brighter.
- Border becomes more visible.
- Project title gains emphasis.
- A preview image may fade in or appear.
- A small arrow indicates navigation.

### **Individual project page**

Each project should have:

```
PROJECT NAME

Overview

Problem
Approach
Architecture
Implementation
Technical decisions
Challenges
Outcome

Technology stack

Screenshots / diagrams

GitHub
Live demo
```

Keep the content sourced from the existing MDX system.

Do not convert every project into hardcoded JSX.

## **6.3 Blog**

The blog should retain the existing MDX pipeline.

Visual direction:

- Minimal editorial layout.
- Translucent reading surface.
- Strong typographic hierarchy.
- Small metadata labels.
- Date and reading-time information.
- Subtle animal animation in the background.
- No intrusive moving elements over paragraphs.

Suggested listing:

```
WRITING

Notes on engineering,
AI, systems and things I build.

FEATURED ARTICLE

ALL ARTICLES

Article title
Date · Reading time
Summary
Tags
```

Individual posts should prioritize readability over visual experimentation.

Use a sufficiently opaque reading surface rather than a highly transparent glass layer.

## **6.4 Navigation**

The reference's animal bar should remain the primary visual navigation element.

However, animals should not replace actual website navigation.

Recommended global navigation:

```
Top centre:
[Butterfly] [Koi] [Jellyfish] ...

Top right:
[Tweaks] [Menu]
```

The Menu opens a compact glass navigation panel:

```
HOME
ABOUT
WORK
BLOG
RESUME
CONTACT
```

On desktop, this can be a small popover.

On mobile, it should open as a compact sheet.

Use actual Next.js links for route navigation.

Do not depend exclusively on the composer for discoverability.

## **6.5 Footer and contact**

The footer should retain the same visual language.

Contents:

- Bramha Bajannavar.
- Copyright.
- Email.
- GitHub.
- LinkedIn.
- Resume.

Use minimal typography and small glass icon buttons.

A contact section should contain an actual email link:

```
mailto:altbramhabajannavar@gmail.com
```

No fake submit forms.

# **7. Mobile and responsive specification**

Mobile behaviour is particularly important because the reference has a fixed full-screen canvas.

The reference's breakpoint is:

```
@media (max-width: 720px)
```

It changes the animal bar and Tweaks panel layout.

### **Desktop: above 720px**

- Animal selector centred at the top.
- Tweaks button top-right.
- Tweaks panel top-right.
- Composer centred.
- Full-width canvas.
- All animal labels visible where space permits.

### **Mobile: 720px and below**

Actual reference behaviour:

```
@media (max-width: 720px) {
  .top-bar {
    top: max(12px, env(safe-area-inset-top));
    left: 12px;
    right: 12px;

    translate: none;
    justify-content: center;
  }

  .choices {
    max-width: 100%;
  }

  .tweaks-open {
    top: auto;
    bottom: max(12px, env(safe-area-inset-bottom));
    right: 12px;
  }

  .tweaks {
    top: auto;
    bottom: 12px;
    left: 12px;
    right: 12px;

    width: auto;
    max-height: 70vh;
  }
}
```

Additional breakpoint:

```
@media (max-width: 520px) {
  .pill span {
    display: none;
  }

  .pill {
    padding: 0 9px;
  }
}
```

### **Portfolio-specific responsive requirements**

| Component         | Desktop             | Mobile                  |
| ----------------- | ------------------- | ----------------------- |
| Animal selector   | Centred row         | Horizontally scrollable |
| Greeting          | 24–32px             | 24–28px                 |
| Composer          | Max 720px           | Viewport minus 32px     |
| Tweaks            | 288px panel         | Bottom sheet            |
| Navigation        | Popover             | Sheet                   |
| Project directory | Full metadata       | Compact rows            |
| About timeline    | Normal layout       | Single column           |
| Blog              | Wide reading layout | Single column           |

The homepage should not shrink the animal characters until they become unreadable.

If performance or space is limited, reduce creature population before reducing glyph readability.

### **Safe areas**

The HTML reference uses:

```
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```

Retain safe-area support for iPhones with notches and home indicators.

Also test:

- iPhone Safari.
- iPad Safari.
- Android Chrome.
- Desktop Chrome.
- Desktop Safari.
- Firefox.

# **8. Technical integration with the existing portfolio**

Recommended implementation architecture

The most important technical decision is how to integrate the reference engine without disrupting the current Next.js application.

## **8.1 Existing stack to preserve**

```
Next.js 16
React 19
TypeScript
Once UI
Sass / SCSS Modules
MDX
Existing project content
Existing About content
Existing SEO infrastructure
```

Do not rebuild the entire portfolio from scratch.

Do not replace the MDX content architecture.

Do not remove Once UI globally.

The new design should replace the visual presentation layer while preserving the working content and routing infrastructure.

## **8.2 Recommended file structure**

Add the following structure to the existing repository:

```
src/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   ├── work/
│   └── blog/
│
├── components/
│   │
│   ├── ascii/
│   │   ├── AsciiBackground.tsx
│   │   ├── AnimalSelector.tsx
│   │   ├── AnimalEngineController.ts
│   │   ├── TweaksPanel.tsx
│   │   ├── GlassPanel.tsx
│   │   └── ascii.module.scss
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── PortfolioComposer.tsx
│   │   ├── CommandSuggestions.tsx
│   │   ├── FeaturedProjects.tsx
│   │   └── Introduction.tsx
│   │
│   ├── navigation/
│   │   ├── NavigationMenu.tsx
│   │   └── NavigationSheet.tsx
│   │
│   ├── about/
│   ├── work/
│   └── blog/
│
├── lib/
│   │
│   ├── ascii-animals/
│   │   ├── animals/
│   │   ├── engine.ts
│   │   ├── flock.ts
│   │   ├── renderer.ts
│   │   ├── ink.ts
│   │   ├── math.ts
│   │   └── index.ts
│   │
│   ├── portfolio/
│   │   ├── commands.ts
│   │   ├── navigation.ts
│   │   └── search.ts
│   │
│   └── preferences/
│       ├── storage.ts
│       └── settings.ts
│
└── resources/
    ├── content.tsx
    ├── once-ui.config.ts
    └── custom.css
```

This is the proposed target structure, not the existing repository structure.

## **8.3 Animation engine integration**

The animation engine should be initialized only on the client.

Recommended:

```
"use client";

import { useEffect, useRef } from "react";
import { AnimalEngine } from "@/lib/ascii-animals";

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const engine = new AnimalEngine(canvas, {
      animal: "butterflies",
      theme: "dark"
    });

    return () => {
      engine.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="ascii-background"
    />
  );
}
```

The exact constructor options should follow the reference's exported TypeScript interface.

### **Canvas positioning**

```
.ascii-background {
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100%;

  z-index: 0;
  pointer-events: auto;

  display: block;

  font-family:
    "Geist Mono",
    ui-monospace,
    monospace;

  touch-action: none;
}
```

For the complete application, add an interaction-layer strategy:

- Canvas remains behind all controls.
- Controls have a higher stacking context.
- Canvas events should only trigger startle effects when the canvas itself receives the event.
- Interactive content must never be blocked by the canvas.
- Decorative canvas areas must not intercept normal text selection or page scrolling.

Use an appropriate `z-index` hierarchy:

```
Canvas background          0
Page content                1
Glass composer               5
Animal selector             10
Tweaks panel                20
Navigation modal            30
```

The exact stacking context should be tested against the existing Once UI components.

## **8.4 Global layout**

The existing root layout should mount the background once.

Conceptual structure:

```
<body>
  <AsciiBackground />

  <div className="app-content">
    <NavigationMenu />

    {children}

    <Footer />
  </div>
</body>
```

Avoid mounting a separate AnimalEngine on every page.

Otherwise:

- Multiple animation loops could run.
- State could reset unexpectedly.
- Memory consumption would increase.
- Navigation would cause visible animation restarts.

The root should own the engine.

## **8.5 State management**

Recommended state:

```
interface PortfolioEnvironmentState {
  selectedAnimal: AnimalKey;

  tweaksOpen: boolean;

  theme: "dark";

  reducedMotion: boolean;

  tuning: Record<string, number | boolean>;
}
```

Recommended ownership:

| State                     | Owner                         |
| ------------------------- | ----------------------------- |
| Selected animal           | Global environment controller |
| Engine instance           | Canvas controller             |
| Animal tuning             | Global preferences            |
| Glass tuning              | Glass preferences             |
| Tweaks panel visibility   | UI controller                 |
| Composer text             | Composer component            |
| Search suggestions        | Composer component            |
| Current route             | Next.js router                |
| Reduced-motion preference | Environment controller        |

Use React context only if multiple distant components genuinely need the state.

Do not introduce Redux or another global state library for this feature.

## **8.6 Persistence**

Use localStorage for user preferences.

Suggested schema:

```
interface PortfolioPreferences {
  version: 1;

  animal: AnimalKey;

  tweaks: {
    movement: Record<string, number | boolean>;
    look: Record<string, number | boolean>;
  };

  glass: {
    blur: number;
    refraction: number;
    ripple: number;
    tint: number;
    edge: number;
    radius: number;
    width: number;
  };
}
```

Implementation requirements:

- Validate saved values.
- Merge saved values with current defaults.
- Handle invalid JSON.
- Handle storage being unavailable.
- Migrate preferences if the schema changes.
- Do not read localStorage during server rendering.
- Restore preferences after client hydration.

## **8.7 Next.js routing and server rendering**

The animation engine is browser-only.

Requirements:

- Keep the engine out of server-rendered code.
- Use a client component for canvas initialization.
- Prevent `window` and `document` access during SSR.
- Do not use browser APIs in server components.
- Keep page metadata server-rendered.
- Avoid turning every page into a client component.
- Preserve Next.js navigation and MDX rendering.

The animation should survive route navigation if the root layout remains mounted.

## **8.8 Performance**

The target should be smooth on an ordinary modern laptop and usable on mid-range mobile hardware.

Reference performance characteristics:

| Property               | Reference             |
| ---------------------- | --------------------- |
| Simulation timestep    | 1/60 second           |
| Maximum catch-up steps | 4                     |
| Maximum frame delta    | 100ms                 |
| Device pixel ratio     | Maximum 2             |
| Animation mechanism    | requestAnimationFrame |
| Off-screen pause       | IntersectionObserver  |
| Resize                 | ResizeObserver        |
| Reduced motion         | matchMedia            |

### **Additional portfolio requirements**

1. Do not render seven species simultaneously.
2. Only one animal simulation should be active.
3. Reuse the reference's typed-array and rendering optimizations.
4. Avoid React state updates on every animation frame.
5. Avoid generating new arrays and objects unnecessarily inside the render loop.
6. Cache static resources.
7. Do not repeatedly rebuild the renderer when changing unrelated UI state.
8. Pause when the tab becomes hidden.
9. Pause when the canvas is not intersecting the viewport.
10. Use the still-rendering path for reduced motion.
11. Keep the animation behind text and controls.
12. Avoid expensive filter effects across the entire viewport.

### **Performance targets**

These are proposed acceptance targets, not measured reference results.

| Metric                              | Target                                          |
| ----------------------------------- | ----------------------------------------------- |
| Desktop animation                   | 60 FPS where hardware permits                   |
| Mobile animation                    | 30–60 FPS                                       |
| Simulation timestep                 | Fixed 60Hz                                      |
| Canvas DPR                          | Maximum 2                                       |
| Main-thread blocking from animation | No long tasks attributable to routine rendering |
| CLS                                 | Below 0.1                                       |
| LCP                                 | Below 2.5s                                      |
| INP                                 | Below 200ms                                     |
| Memory                              | No continuous growth during extended use        |

The background should be treated as progressive enhancement. The content must appear immediately, even if the engine takes longer to initialize.

## **8.9 Accessibility**

The reference uses native HTML controls, labelled inputs and keyboard focus states.

The portfolio must retain that approach.

Required:

- Animal selector uses `role="radiogroup"`.
- Each animal option is keyboard accessible.
- Selected animal exposes `aria-checked`.
- Tweaks button has an accessible label.
- Slider values are announced.
- Composer has an accessible name.
- Focus states remain visible.
- Colour is never the only indicator of selection.
- Canvas is decorative and `aria-hidden="true"`.
- Content remains available with JavaScript disabled.
- Reduced-motion preference is respected.

The animal selector should support arrow-key navigation.

The tweaks panel should support:

```
Escape → Close panel
Tab → Next control
Shift + Tab → Previous control
Enter / Space → Activate buttons
Arrow keys → Adjust sliders
```

Do not make any critical information available only through the animation.

# **9. Detailed acceptance criteria**

The following checklist should be used to decide whether the implementation is complete.

## **9.1 Visual acceptance**

- Dark background matches `#06070c`.
- Primary text matches `#e8ebf7`.
- Main accent matches `#7aa2ff`.
- Geist is used for interface text.
- Geist Mono is used for ASCII rendering.
- Background canvas covers the viewport.
- Animal selector floats at the top.
- Selected tab has an animated thumb.
- Greeting is vertically centred above the composer.
- Personal mark replaces Dia branding.
- Composer has translucent glass.
- Composer has visible top and bottom rims.
- Composer has subtle internal glow.
- Composer uses 24px radius initially.
- Glass refraction works where supported.
- Frosted fallback works elsewhere.
- Tweaks panel uses glass styling.
- No traditional cyan neo-brutalist elements remain as competing primary styling.
- No generic animal emojis replace ASCII creatures.

## **9.2 Animation acceptance**

- All seven animals render.
- Each animal has its own behaviour.
- Each animal has its own colour identity.
- Depth affects apparent size.
- Depth affects speed.
- Depth affects opacity.
- Creatures follow a shared course.
- Creatures re-enter upstream.
- Near creatures render above far creatures.
- Canvas resize works.
- DPR is capped at 2.
- Click/tap startles creatures.
- Koi food interaction works.
- Trails are visible.
- Trails fade naturally.
- Species switching works.
- Simulation uses fixed timesteps.
- Background pauses when hidden.
- Reduced-motion mode renders a still frame.
- Animation does not restart unnecessarily on navigation.

## **9.3 Interaction acceptance**

- Animal selector works with mouse.
- Animal selector works with keyboard.
- Animal selector works with touch.
- Last selected animal persists.
- URL animal parameter works.
- Tweaks panel opens and closes.
- Sliders update the simulation immediately.
- Double-click resets individual settings.
- Copy exports settings as JSON.
- Reset confirms before clearing.
- Glass settings update the UI.
- Preferences persist across visits.
- Composer expands as text is entered.
- Enter submits.
- Shift + Enter inserts a newline.
- Composer suggestions work.
- Commands navigate to actual portfolio routes.
- Mobile navigation works.

## **9.4 Portfolio acceptance**

- Homepage retains real personal information.
- About page remains complete.
- Work page retains all projects.
- Project detail pages work.
- Blog listing works.
- Individual blog posts work.
- Resume link works.
- GitHub link works.
- LinkedIn link works.
- Email link works.
- SEO metadata remains correct.
- Canonical domain uses `bramhabajannavar.dev`.
- Open Graph images work.
- No template identity remains.
- No broken navigation links.
- No hydration warnings.
- No animation errors after route transitions.

# **10. Implementation roadmap**

This should be built in controlled phases rather than attempting to implement the entire design in one large change.

## **Development phases**

1. **Phase 1 — Reference engine integration**

   Foundation
   - Obtain the original source.
   - Preserve MIT attribution and licence.
   - Port the engine into the existing Next.js project.
   - Build the background canvas component.
   - Verify rendering and cleanup.
   - Test resize and reduced motion.
   **Deliverable:** Working full-screen ASCII background.
2. **Phase 2 — Species and interaction**
   - Integrate all seven species.
   - Add the selection bar.
   - Implement selection transitions.
   - Add click/tap reactions.
   - Add Koi feeding.
   - Add URL parameters.
   - Add selection persistence.
   **Deliverable:** Complete animal environment.
3. **Phase 3 — Visual identity**
   - Implement the dark colour system.
   - Load Geist and Geist Mono.
   - Implement glass tokens.
   - Implement SVG refraction.
   - Build the personal mark.
   - Implement the centred greeting.
   **Deliverable:** Reference-style landing composition.
4. **Phase 4 — Portfolio composer**
   - Implement the glass composer.
   - Add command suggestions.
   - Implement project search.
   - Add navigation commands.
   - Add contact and resume actions.
   - Implement keyboard behaviour.
   **Deliverable:** Functional portfolio launcher.
5. **Phase 5 — Tweaks and persistence**
   - Build settings panel.
   - Add shared movement controls.
   - Add species-specific controls.
   - Add glass controls.
   - Implement JSON export.
   - Implement reset confirmation.
   - Persist settings.
   **Deliverable:** Configurable environment.
6. **Phase 6 — Inner portfolio pages**
   - Redesign About.
   - Redesign Work.
   - Redesign project details.
   - Redesign Blog.
   - Redesign navigation and footer.
   - Preserve MDX content.
   **Deliverable:** Complete redesigned portfolio.
7. **Phase 7 — Mobile and optimization**
   - Implement mobile layout.
   - Test touch interactions.
   - Optimize rendering.
   - Test Safari fallbacks.
   - Test reduced motion.
   - Check performance.
   **Deliverable:** Responsive production implementation.
8. **Phase 8 — Production QA**
   - Verify routes.
   - Verify metadata.
   - Check accessibility.
   - Check broken links.
   - Check console errors.
   - Deploy preview.
   - Compare screenshots against references.
   **Deliverable:** Production-ready portfolio.

### **Suggested implementation order**

Do not begin by redesigning the About page or building the Tweaks panel.

The first meaningful milestone should be:

```
Existing portfolio
       |
       v
Integrate AnimalEngine
       |
       v
Render butterflies
       |
       v
Render all seven species
       |
       v
Add top animal selector
       |
       v
Add glass composer
       |
       v
Match the reference homepage
       |
       v
Adapt remaining portfolio pages
```

This order reduces the risk of building the entire visual system around an animation engine that has not yet been integrated successfully.

# **11. Source-code reuse, licensing and implementation constraints**

The reference repository identifies its licence as MIT.

Repository:

[https://github.com/DesignerStephen1/ascii-animals](https://github.com/DesignerStephen1/ascii-animals?utm_source=chatgpt.com)

Before copying source files:

1. Preserve the original MIT licence.
2. Preserve copyright notices.
3. Include the appropriate attribution in the project.
4. Keep original source comments where practical.
5. Record which files were imported and which were modified.
6. Do not represent the original engine as entirely your own work.

The engine is built on `ascii-sharks`, which is separately credited in the README. Review its licence and attribution requirements too if importing its underlying work indirectly through the reference.

### **Assets**

Do not blindly copy `public/dia-logo.png`.

It is described by the author as a logo cut out of a screenshot for a concept redesign and explicitly not affiliated with Dia.

Use a new BB identity instead.

### **Build process**

The reference's original build:

```
npm install
npm run dev
npm run build
npm run typecheck
```

Those commands apply to the standalone reference repository.

For your portfolio, use the existing Next.js development and build commands. Do not introduce a second independent Vite build process unless there is a demonstrated technical need.

### **Files that should be inspected during implementation**

```
src/engine.ts
src/flock.ts
src/renderer.ts
src/ink.ts
src/math.ts

src/animals/index.ts
src/animals/butterflies.ts
src/animals/koi.ts
src/animals/jellyfish.ts
src/animals/dragonflies.ts
src/animals/frogs.ts
src/animals/cranes.ts
src/animals/crabs.ts

ui.ts
panel.ts
page.css
index.html
```

**Do not rewrite these files based solely on this document.** The repository itself is the authoritative implementation reference for behaviour and calculations.

# **12. Design decisions: what to copy exactly and what to adapt**

This is the most important decision table in the specification.

| Element                    | Decision             | Reason                         |
| -------------------------- | -------------------- | ------------------------------ |
| Full-screen ASCII canvas   | Copy                 | Defines the experience         |
| Seven animal species       | Copy                 | Central interaction            |
| Species-specific animation | Copy                 | Core differentiator            |
| Depth and parallax         | Copy                 | Creates physicality            |
| Shared movement course     | Copy                 | Creates coherent environment   |
| Glyph rendering            | Copy                 | Essential visual language      |
| Dark palette               | Copy                 | Establishes the mood           |
| Glass controls             | Copy                 | Defines interface style        |
| Refraction effect          | Copy                 | Distinctive glass treatment    |
| Top animal selector        | Copy                 | Main visual control            |
| Tweaks panel               | Copy                 | Configurable experience        |
| Greeting                   | Adapt                | Use Bramha's identity          |
| Dia logo                   | Replace              | Use personal mark              |
| AI chat functionality      | Replace              | Use portfolio navigation       |
| Add tabs or files          | Adapt                | Use real portfolio actions     |
| Voice button               | Omit initially       | No real voice implementation   |
| Send button                | Adapt                | Execute navigation/search      |
| Fixed full-screen app      | Adapt                | Portfolio requires scrolling   |
| Dark-only default          | Copy initially       | Closest reference match        |
| Blog and project content   | Preserve             | Existing portfolio information |
| SEO infrastructure         | Preserve and fix     | Search visibility              |
| Existing Once UI           | Preserve selectively | Avoid unnecessary rebuild      |

## **13. Non-goals**

The following should not be included in the first implementation:

- A real AI chatbot.
- User accounts.
- Backend animal simulation.
- Database storage for visual preferences.
- WebSocket connections.
- Three-dimensional animal rendering.
- Sound effects.
- Music.
- A second theme system.
- Multiple concurrent animal populations.
- A complex mobile settings dashboard.
- Unnecessary animation libraries.
- Rebuilding the entire site in plain HTML.
- Replacing MDX with manually maintained project components.

The reference works because its core system is relatively small and focused. Preserve that simplicity.

# **14. Final visual quality benchmark**

The implementation should be compared against the original reference using the same viewport dimensions.

Recommended comparison viewports:

```
Desktop:
1440 × 900

Laptop:
1280 × 800

Tablet:
768 × 1024

Mobile:
390 × 844

Small mobile:
360 × 800
```

### **Visual comparison categories**

| Category                  | Weight |
| ------------------------- | ------ |
| Animal rendering fidelity | 20%    |
| Movement and depth        | 15%    |
| Glass interface fidelity  | 20%    |
| Layout and spacing        | 15%    |
| Typography and colours    | 10%    |
| Interaction fidelity      | 10%    |
| Responsive behaviour      | 10%    |
| Total                     | 100%   |

These weights are proposed design-review priorities, not measurements of the reference.

The first viewport should be judged particularly strictly.

The intended result is that someone opening the portfolio immediately recognises the same visual language as ASCII Animals, while also recognising that the experience belongs to Bramha.

# **15. Authoritative reference links**

These are the files that should be kept open during implementation.

**Original repository**

- [README and complete feature description](https://github.com/DesignerStephen1/ascii-animals?utm_source=chatgpt.com)
- [Engine](https://github.com/DesignerStephen1/ascii-animals/blob/main/src/engine.ts?utm_source=chatgpt.com)
- [Flock simulation](https://github.com/DesignerStephen1/ascii-animals/blob/main/src/flock.ts?utm_source=chatgpt.com)
- [ASCII renderer](https://github.com/DesignerStephen1/ascii-animals/blob/main/src/renderer.ts?utm_source=chatgpt.com)
- [Animal registration](https://github.com/DesignerStephen1/ascii-animals/blob/main/src/animals/index.ts?utm_source=chatgpt.com)
- [Koi implementation](https://github.com/DesignerStephen1/ascii-animals/blob/main/src/animals/koi.ts?utm_source=chatgpt.com)
- [Butterfly implementation](https://github.com/DesignerStephen1/ascii-animals/blob/main/src/animals/butterflies.ts?utm_source=chatgpt.com)
- [UI implementation](https://github.com/DesignerStephen1/ascii-animals/blob/main/ui.ts?utm_source=chatgpt.com)
- [Tweaks panel](https://github.com/DesignerStephen1/ascii-animals/blob/main/panel.ts?utm_source=chatgpt.com)
- [Page stylesheet](https://github.com/DesignerStephen1/ascii-animals/blob/main/page.css?utm_source=chatgpt.com)
- [HTML structure](https://github.com/DesignerStephen1/ascii-animals/blob/main/index.html?utm_source=chatgpt.com)
- [Package configuration](https://github.com/DesignerStephen1/ascii-animals/blob/main/package.json?utm_source=chatgpt.com)

**Live experience**

\- [ASCII Animals live application](https://www.pocketstudio.design/ascii-animals-app/index.html?utm_source=chatgpt.com)

**Existing portfolio**

- [Portfolio repository](https://github.com/Bramhaaa/portfolio?utm_source=chatgpt.com)
- [Current live portfolio](https://bramhabajannavar.dev?utm_source=chatgpt.com)

# **16. Final product definition**

Definition of done

The project is complete when the portfolio has:

1. A full-screen, continuously rendered ASCII animal environment.
2. All seven original species with their individual behaviours.
3. Depth-based motion and visual fading.
4. An animated glass animal selector.
5. A centred personal greeting and identity.
6. A functional liquid-glass portfolio composer.
7. A configurable Tweaks panel.
8. Persistent animal and visual preferences.
9. A responsive interface matching the reference's mobile behaviour.
10. Existing About, Work, Blog and project-detail content integrated into the new visual system.
11. Correct SEO and domain metadata.
12. Proper reduced-motion, accessibility and performance handling.
13. No broken routes, controls or placeholder actions.

**The intended experience:**

A visitor opens `bramhabajannavar.dev`. They see an atmospheric, dark environment populated by animated ASCII creatures moving naturally across the screen. A glass interface floats in the centre, greeting them personally. They can change the creatures, interact with the environment, discover projects and navigate the portfolio through the same interface. As they explore, the visual language remains consistent.

The portfolio should feel like an interactive digital environment that happens to contain a developer's work, rather than a conventional developer portfolio with an animated background.

