import { useEffect } from 'react'
import gsap from 'gsap'

export function useTilt(ref, { max = 7 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.innerWidth < 768) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    el.style.transformStyle = 'preserve-3d'

    const rotateXTo = gsap.quickTo(el, 'rotationX', { duration: 0.4, ease: 'power3.out' })
    const rotateYTo = gsap.quickTo(el, 'rotationY', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      rotateYTo(px * max * 2)
      rotateXTo(-py * max * 2)
    }

    const onLeave = () => {
      rotateXTo(0)
      rotateYTo(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, max])
}
