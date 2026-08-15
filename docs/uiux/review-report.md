VERDICT: PASS

## Fix verification (1e61199)

- **Article measure:** Fresh Chrome CDP measurements at 1024px, 1280px, and 1440px: `main` is 1009px/1024px/1024px, `article` is 672px at every desktop width, body font is 15px, and document overflow is 0px. This is approximately 45 CJK characters per line.
- **Reduced motion:** With `prefers-reduced-motion: reduce` emulated, fresh computed `transitionDuration` measurements were `0s` for chapter chips, start-here link, chapter cards, prev/next links, and TOC links. Normal mode retains the intended 0.15s transition.
- **Prev/next hover:** Both links now contain `transition-colors motion-reduce:duration-0 ... sm:hover:text-primary`; the built stylesheet contains the corresponding `@media (hover: hover)` rule. Their measured dimensions remain stable (next link 250.53px × 36px). Headless Chrome reports `hover: none`, so direct color interpolation cannot be exposed in that environment; the generated hover rule is present and the supplied desktop hover verification reports the expected foreground change to primary.
- **Header offset:** At 1024px and 1280px, the measured header is 174.25px and the TOC computed sticky `top` is 174px, matching within 0.25px. At 1440px, the one-row navigation reduces the header to 159.125px; `top: 174px` leaves a safe 14.875px gap and causes no overlap.

## Original findings — fixed and verified

1. **FIXED / VERIFIED — major — `src/components/layout/layout.tsx:97`, `src/pages/[chapter].tsx:77-81`:** `main` now uses `max-w-3xl lg:max-w-5xl`; desktop article measure is 672px rather than 448px, with 0px overflow.
2. **FIXED / VERIFIED — major — `src/components/layout/layout.tsx:21`, `src/pages/index.tsx:93,126`:** all newly added transitions now include `motion-reduce:duration-0`; reduced-motion computed duration is 0s.
3. **FIXED / VERIFIED — major — `src/pages/[chapter].tsx:34,48`:** prev/next links now have `transition-colors`, reduced-motion handling, and `sm:hover:text-primary`; dimensions do not shift.

## Gate

`npm run gen && npx tsc -b && npx eslint . && npx vitest run && npm run build` passed. ESLint reports one pre-existing warning in `src/components/ui/badge.tsx`, with 0 errors; Vitest passed 19/19 tests and SSG generated 10 pages.

## Residual risks

- At 1440px the measured header is shorter than the shared 174px desktop offset because the chapter navigation collapses to one row. The resulting 14.875px gap is safe and produces no overlap, but a future dynamic offset could remove the extra space.
- Real mobile Safari/touch behavior was not exercised; the responsive interaction checks used headless Chrome CDP.
- No source files were modified during this re-review; only this report was rewritten.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Re-verified only the three requested fixes and the header offset; scope stayed limited to browser checks, the required gate, and rewriting review-report.md."
    },
    {
      "id": "criterion-2",
      "status": "satisfied",
      "evidence": "Fresh measurements document 672px desktop article width, 0s reduced-motion transitions, hover CSS presence, stable prev/next dimensions, and 174.25px header versus 174px TOC offset."
    }
  ],
  "changedFiles": [
    "review-report.md"
  ],
  "testsAddedOrUpdated": [],
  "commandsRun": [
    {
      "command": "npm run gen && npx tsc -b && npx eslint . && npx vitest run && npm run build",
      "result": "passed",
      "summary": "Generation, strict TypeScript, ESLint (0 errors, 1 pre-existing warning), 19 tests, and 10-page SSG build passed."
    },
    {
      "command": "Headless Chrome CDP responsive checks at 1024px, 1280px, and 1440px",
      "result": "passed",
      "summary": "Article width, overflow, reduced motion, transition classes, and header/TOC offsets were measured."
    },
    {
      "command": "git status --short",
      "result": "passed",
      "summary": "No staged source changes; only existing/untracked review artifacts are present."
    }
  ],
  "validationOutput": [
    "Desktop article width: 672px at 1024/1280/1440px; overflow: 0px.",
    "Reduced-motion transitionDuration: 0s for all requested transition groups.",
    "Header: 174.25px at 1024/1280px; TOC computed top: 174px.",
    "Prev/next links retain stable 250.53px × 36px dimensions while carrying hover and reduced-motion classes."
  ],
  "residualRisks": [
    "1440px header is 159.125px while the shared sticky offset remains 174px, leaving a safe 14.875px gap.",
    "Real mobile Safari/touch behavior remains unverified."
  ],
  "noStagedFiles": true,
  "diffSummary": "Re-review report updated only; commit 1e61199 fixes all three prior major findings.",
  "reviewFindings": [
    "no blockers; all three original major findings are fixed and verified"
  ],
  "manualNotes": "The requested follow-up scope was honored."
}
```