# Desktop handoff (≥1024px) — for the desktop scout

The mobile worker OWNS `src/components/layout/layout.tsx` entirely and delivers the desktop
header variant there. Do NOT edit `layout.tsx` from the desktop spec.

- Already satisfied in `layout.tsx` (desktop variant, `lg:`): inline nav of all 9 chapters as
  wrapping chips (`flex-wrap`, NO `overflow-x-auto` — no horizontal scroll), search input
  `h-11` and wider (`max-w-xl`), disclaimer strip retained at all viewports (AC-6).
- If the desktop pass needs different chip density/one-row guarantee at ≥1280px, a larger
  search, or sticky-header height changes, request it here — the `--header-h` variable in
  `src/index.css` (currently `180px` at `lg`) is the single knob for anchor offsets.
