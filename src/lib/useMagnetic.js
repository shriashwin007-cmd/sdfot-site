import { useEffect } from 'react'
import gsap from 'gsap'

export function useMagnetic(ref, { strength = 0.4, radius = 90 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.innerWidth < 768) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const scaleTo = gsap.quickTo(el, 'scale', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < radius) {
        xTo(dx * strength)
        yTo(dy * strength)
        scaleTo(1.05)
        el.classList.add('is-magnetic-active')
      } else {
        xTo(0)
        yTo(0)
        scaleTo(1)
        el.classList.remove('is-magnetic-active')
      }
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
      scaleTo(1)
      el.classList.remove('is-magnetic-active')
    }

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, strength, radius])
}
