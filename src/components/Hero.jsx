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

      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          '.hero-word',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          '-=0.2'
        )
        .fromTo('.hero-subtext', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
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

      <nav className="hero-nav">
        <div className="hero-logo">SDFOT</div>
        <ul className="hero-menu">
          <li><a href="#about">About</a></li>
          <li><a href="#registration">Registration</a></li>
          <li><a href="#selections">Selections</a></li>
          <li><a href="#prizes">Prizes</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="hero-content">
        <p className="hero-eyebrow">South District Football &amp; Talent</p>
        <h1 className="hero-headline">
          <span className="hero-word hero-saffron">Identify.</span>{' '}
          <span className="hero-word hero-white">Cultivate.</span>{' '}
          <span className="hero-word hero-green">Empower.</span>
        </h1>
        <p className="hero-subtext">
          A district-wide talent hunt uncovering football's next generation
          across 38 districts.
        </p>
      </div>

      <div className="hero-scroll-hint">
        <span />
      </div>
    </section>
  )
}
