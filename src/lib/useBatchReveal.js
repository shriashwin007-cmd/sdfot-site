import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useBatchReveal(containerRef, selector, deps = []) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const els = Array.from(root.querySelectorAll(selector)).filter(
      (el) => !el.dataset.revealed
    )
    if (!els.length) return

    gsap.set(els, { opacity: 0, y: 60 })

    const batch = ScrollTrigger.batch(els, {
      start: 'top 90%',
      onEnter: (batchEls) => {
        batchEls.forEach((el) => (el.dataset.revealed = 'true'))
        gsap.to(batchEls, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          overwrite: true,
        })
      },
      once: true,
    })

    return () => {
      batch.forEach((b) => b.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, selector, ...deps])
}
