import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 768) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    if (!dot) return

    document.body.classList.add('has-custom-cursor')

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' })

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onEnter = (e) => {
      if (e.target.closest('a, button, input, .district-card, .pathway-card, .stat-card, .prize-card')) {
        dot.classList.add('is-active')
      }
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, input, .district-card, .pathway-card, .stat-card, .prize-card')) {
        dot.classList.remove('is-active')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return <div className="custom-cursor" ref={dotRef} />
}
