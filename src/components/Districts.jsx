import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DISTRICTS from '../data/districts'
import SplitHeading from './SplitHeading'
import './Districts.css'

gsap.registerPlugin(ScrollTrigger)

const PANEL_SIZE = 6
const ACCENT_COLORS = ['#ff9933', '#ffffff', '#138808']

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export default function Districts() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const panelRefs = useRef([])
  const [query, setQuery] = useState('')
  const [activePanel, setActivePanel] = useState(0)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DISTRICTS

    return DISTRICTS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.taluks.some((t) => t.toLowerCase().includes(q))
    )
  }, [query])

  const panels = useMemo(() => chunk(filtered, PANEL_SIZE), [filtered])

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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const wrapper = sectionRef.current
    const panelEls = panelRefs.current.filter(Boolean)
    const n = panels.length
    if (!wrapper || n <= 1) {
      setActivePanel(0)
      return
    }

    // Animate every panel with the SAME xPercent (each relative to its own
    // 100vw width) so they all shift left by the identical pixel amount —
    // the standard GSAP horizontal-scroll-jack trick, avoids needing a
    // separately-sized wrapping track element.
    const tween = gsap.to(panelEls, {
      xPercent: -100 * (n - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: `+=${(n - 1) * 100}%`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActivePanel(Math.round(self.progress * (n - 1)))
        },
      },
    })

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(raf)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [panels.length])

  return (
    <section id="districts" ref={sectionRef} className="districts">
      <div className="districts-head">
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
      </div>

      <div className="districts-track-viewport">
        {panels.length > 0 ? (
          <div className="districts-track" ref={trackRef}>
            {panels.map((panel, i) => (
              <div
                className="districts-panel"
                key={i}
                ref={(el) => (panelRefs.current[i] = el)}
              >
                <div className="districts-panel-grid">
                  {panel.map((d, di) => (
                    <div
                      className="district-card"
                      key={d.name}
                      style={{ '--district-accent': ACCENT_COLORS[di % ACCENT_COLORS.length] }}
                    >
                      <h3>{d.name}</h3>
                      <p>{d.taluks.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="districts-empty">No districts or taluks match "{query}".</p>
        )}

        {panels.length > 1 && (
          <div className="districts-progress">
            {panels.map((_, i) => (
              <span key={i} className={i === activePanel ? 'is-active' : ''} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
