import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useBatchReveal(containerRef, selector) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const els = root.querySelectorAll(selector)
    if (!els.length) return

    gsap.set(els, { opacity: 0, y: 60 })

    const batch = ScrollTrigger.batch(els, {
      start: 'top 85%',
      onEnter: (batchEls) => {
        gsap.to(batchEls, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          overwrite: true,
        })
      },
      once: true,
    })

    return () => {
      batch.forEach((b) => b.kill())
    }
  }, [containerRef, selector])
}
