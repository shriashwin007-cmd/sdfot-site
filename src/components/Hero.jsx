import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
      })

      gsap.fromTo(
        '.hero-word',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        src="/video/hero-bg.mp4"
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-headline">
          <span className="hero-word hero-saffron">Identify.</span>{' '}
          <span className="hero-word hero-white">Cultivate.</span>{' '}
          <span className="hero-word hero-green">Empower.</span>
        </h1>
      </div>

      <div className="hero-scroll-hint">
        <span />
      </div>
    </section>
  )
}
