import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitHeading from './SplitHeading'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const glowRef = useRef(null)
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
        onUpdate: (self) => {
          gsap.set(videoRef.current, {
            scale: 1 + self.progress * 0.25,
            filter: `saturate(1.15) contrast(1.05) brightness(${0.85 - self.progress * 0.35})`,
          })
        },
      })

      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-badge', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-subtext', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '+=0.9')
        .fromTo('.hero-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, '-=0.3')

      gsap.to(glowRef.current, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero">
      <video
        ref={videoRef}
        className="hero-video"
        src="/video/hero-cricket.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-grid" />
      <div ref={glowRef} className="hero-glow" />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">
          <img src="/logo/sdfot-logo.png" alt="SDFOT crest" />
          <span>Est. 2026 · Tamil Nadu</span>
        </div>

        <p className="hero-eyebrow">Sports Development Federation of Tamil Nadu</p>

        <SplitHeading as="h1" className="hero-headline">
          <span className="hero-word hero-saffron">Identify.</span>
          <span className="hero-word hero-white">Cultivate.</span>
          <span className="hero-word hero-green">Empower.</span>
        </SplitHeading>

        <div className="hero-foot">
          <div className="hero-divider" />
          <p className="hero-subtext">
            A grassroots cricket pathway across all 38 districts of Tamil Nadu.
          </p>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span />
      </div>
    </section>
  )
}
