import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DISTRICTS from '../data/districts'
import CircularGallery from './CircularGallery'
import './Districts.css'

gsap.registerPlugin(ScrollTrigger)

const CARD_COLORS = ['ff9933', 'ffffff', '138808']

function districtImage(name, index) {
  const bg = CARD_COLORS[index % CARD_COLORS.length]
  const fg = bg === 'ffffff' ? '0a0c0a' : 'ffffff'
  return `https://placehold.co/800x600/${bg}/${fg}?font=montserrat&text=${encodeURIComponent(name)}`
}

export default function Districts() {
  const ref = useRef(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.districts-eyebrow, .districts-heading, .districts-search',
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

  const galleryItems = useMemo(
    () =>
      filtered.map((d, i) => ({
        image: districtImage(d.name, i),
        text: d.name,
      })),
    [filtered]
  )

  return (
    <section id="districts" ref={ref} className="districts">
      <p className="districts-eyebrow">Coverage</p>
      <h2 className="districts-heading">All 38 Districts &amp; Taluks of Tamil Nadu</h2>

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

      <div className="districts-gallery">
        {galleryItems.length > 0 ? (
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            font="bold 28px Inter"
          />
        ) : (
          <p className="districts-empty">No districts or taluks match "{query}".</p>
        )}
      </div>
      <p className="districts-hint">Drag, scroll, or use ← → to browse districts</p>
    </section>
  )
}
