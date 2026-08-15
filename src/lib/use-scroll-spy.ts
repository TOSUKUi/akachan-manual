import { useEffect, useState } from 'react'

/**
 * Track which section id is "current" under a sticky-header reading position.
 *
 * SSG-safe: all work happens inside useEffect (client-only); SSR renders
 * `undefined`. The `ids` list must be referentially stable (the caller
 * memoizes it) so the observer is not re-created on every render.
 *
 * Semantics: a thin "spy band" sits just below the sticky header
 * (from `topOffset + 8px` down to about one-third of the viewport). The
 * active section is the one whose top edge is closest to `topOffset` while
 * it is inside the band. A passive scroll listener adds a bottom-edge
 * fallback so the last (often short) section still becomes active at the
 * bottom of the page. State only changes when the announced id changes
 * (hysteresis, no re-render storms).
 */
export function useScrollSpy(ids: readonly string[], topOffset: number): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (typeof window === 'undefined' || ids.length === 0) return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    // Section ids currently inside the spy band (kept fresh by IO entries).
    const inBand = new Set<string>()
    let lastId: string | undefined

    const announce = (id: string | undefined) => {
      if (id !== lastId) {
        lastId = id
        setActiveId(id)
      }
    }

    const pickClosest = () => {
      let best: string | undefined
      let bestDist = Infinity
      for (const id of inBand) {
        const el = document.getElementById(id)
        if (!el) continue
        const dist = Math.abs(el.getBoundingClientRect().top - topOffset)
        if (dist < bestDist) {
          bestDist = dist
          best = id
        }
      }
      announce(best)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) inBand.add(id)
          else inBand.delete(id)
        }
        pickClosest()
      },
      { rootMargin: `${-topOffset - 8}px 0px -66% 0px`, threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))

    // Bottom-edge fallback: short final sections never cross the spy line.
    const onScroll = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        announce(ids[ids.length - 1])
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids, topOffset])

  return activeId
}
