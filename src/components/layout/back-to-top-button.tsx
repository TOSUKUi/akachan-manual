import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * 浮遊「ページの先頭へ戻る」ボタン（spec-mobile.md §2.6）。
 * 600px スクロール以降に表示。prefers-reduced-motion では即表示/非表示（No 9/99）。
 */
export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="ページの先頭へ戻る"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo(0, 0)}
      className={`fixed bottom-4 right-4 z-30 mb-[env(safe-area-inset-bottom)] flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-opacity duration-150 motion-reduce:transition-none active:bg-primary-deep focus-visible:outline-2 focus-visible:outline-ring ${
        visible ? '' : 'pointer-events-none opacity-0'
      }`}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  )
}
