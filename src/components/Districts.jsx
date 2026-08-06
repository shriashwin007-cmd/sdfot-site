import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DISTRICTS from '../data/districts'
import './Districts.css'

gsap.registerPlugin(ScrollTrigger)

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

    return DISTRICTS.map((d) => {
      const districtMatches = d.name.toLowerCase().includes(q)
      const matchingTaluks = d.taluks.filter((t) => t.toLowerCase().includes(q))
      if (districtMatches) return d
      if (matchingTaluks.length) return { ...d, taluks: matchingTaluks }
      return null
    }).filter(Boolean)
  }, [query])

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

      <div className="districts-grid">
        {filtered.map((d) => (
          <div className="district-card" key={d.name}>
            <h3>{d.name}</h3>
            <p>{d.taluks.join(', ')}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="districts-empty">No districts or taluks match "{query}".</p>
        )}
      </div>
    </section>
  )
}
