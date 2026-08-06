import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll, destroySmoothScroll } from '../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  useEffect(() => {
    initSmoothScroll()

    // Images, sponsor logos, and web fonts load asynchronously after mount
    // and reflow the page — ScrollTrigger's cached start/end positions go
    // stale unless we refresh once everything has settled.
    const refresh = () => ScrollTrigger.refresh()

    const images = Array.from(document.images)
    const pending = images.filter((img) => !img.complete)
    let remaining = pending.length
    pending.forEach((img) => {
      const onDone = () => {
        remaining -= 1
        if (remaining === 0) refresh()
      }
      img.addEventListener('load', onDone, { once: true })
      img.addEventListener('error', onDone, { once: true })
    })

    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    const settleTimers = [200, 800, 2000].map((t) => setTimeout(refresh, t))

    return () => {
      destroySmoothScroll()
      window.removeEventListener('load', refresh)
      settleTimers.forEach(clearTimeout)
    }
  }, [])

  return null
}
