import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DISTRICTS from '../data/districts'
import DepthCarousel from './DepthCarousel'
import SplitHeading from './SplitHeading'
import { useDepthTransition } from '../lib/useDepthTransition'
import './Districts.css'

gsap.registerPlugin(ScrollTrigger)

const CARD_COLORS = ['ff9933', 'ffffff', '138808']

function districtImage(name, index) {
  const bg = CARD_COLORS[index % CARD_COLORS.length]
  const fg = bg === 'ffffff' ? '0a0c0a' : 'ffffff'
  return `https://placehold.co/800x1000/${bg}/${fg}?font=montserrat&text=${encodeURIComponent(name)}`
}

export default function Districts() {
  const ref = useRef(null)
  const [query, setQuery] = useState('')

  useDepthTransition(ref)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.districts-eyebrow, .districts-search',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DISTRICTS

    return DISTRICTS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.taluks.some((t) => t.toLowerCase().includes(q))
    )
  }, [query])

  const carouselItems = useMemo(
    () =>
      filtered.map((d, i) => ({
        image: districtImage(d.name, i),
        alt: d.name,
      })),
    [filtered]
  )

  return (
    <section id="districts" ref={ref} data-depth-section className="districts">
      <p className="districts-eyebrow">Coverage</p>
      <SplitHeading as="h2" className="districts-heading">
        All 38 Districts &amp; Taluks of Tamil Nadu
      </SplitHeading>

      <div className="districts-search">
        <input
          type="text"
          placeholder="Search a district or taluk…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="districts-count">
          {filtered.length} / {DISTRICTS.length} districts
        </span>
      </div>

      <div className="districts-carousel">
        {carouselItems.length > 0 ? (
          <DepthCarousel
            key={carouselItems.length}
            items={carouselItems}
            cardWidth={260}
            cardHeight={340}
            radius={16}
            tint="#0a0c0a"
            depth={200}
            spread={80}
            tilt={20}
            tiltDirection="right"
            perspective={1300}
            visibleCards={4}
            falloff={0.18}
            blur={5}
            autoplay
            loop
          />
        ) : (
          <p className="districts-empty">No districts or taluks match "{query}".</p>
        )}
      </div>
      <p className="districts-hint">Drag, scroll, or use ← → to browse districts</p>
    </section>
  )
}
