import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import SplitHeading from '../components/SplitHeading'
import SectionBackground from '../components/SectionBackground'
import PlayerAvatar from '../components/PlayerAvatar'
import PlayerModal from '../components/PlayerModal'
import { useBatchReveal } from '../lib/useBatchReveal'
import './PlayersPage.css'

const PAGE_SIZE = 60

export default function PlayersPage() {
  const heroRef = useRef(null)
  const gridSectionRef = useRef(null)
  const [players, setPlayers] = useState(null)
  const [query, setQuery] = useState('')
  const [district, setDistrict] = useState('All')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/data/players.json')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setPlayers(data)
      })
      .catch(() => {
        if (!cancelled) setPlayers([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
    gsap.fromTo(
      '.players-hero-heading, .players-hero-sub, .players-hero-stats',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  const districts = useMemo(() => {
    if (!players) return []
    return [...new Set(players.map((p) => p.district).filter(Boolean))].sort()
  }, [players])

  const filtered = useMemo(() => {
    if (!players) return []
    const q = query.trim().toLowerCase()
    return players.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.district.toLowerCase().includes(q)
      const matchesDistrict = district === 'All' || p.district === district
      return matchesQuery && matchesDistrict
    })
  }, [players, query, district])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [query, district])

  const visible = filtered.slice(0, visibleCount)
  useBatchReveal(gridSectionRef, '.player-card', [visible.length])

  return (
    <div className="players-page">
      <section className="players-hero" ref={heroRef}>
        <SectionBackground sectionRef={heroRef} src="/backgrounds/districts-bg.png" />
        <p className="players-hero-eyebrow">The Roster</p>
        <SplitHeading as="h1" className="players-hero-heading">
          Registered Players of Tamil Nadu
        </SplitHeading>
        <p className="players-hero-sub">
          Every athlete who has stepped forward for district selection — one search away from
          their profile.
        </p>
        <div className="players-hero-stats">
          <div>
            <span>{players ? players.length.toLocaleString('en-IN') : '—'}</span>
            <p>Registered Players</p>
          </div>
          <div>
            <span>38</span>
            <p>Districts Represented</p>
          </div>
        </div>
      </section>

      <section className="players-controls">
        <input
          type="text"
          className="players-search"
          placeholder="Search by name or district…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="players-district-select"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="All">All Districts</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <span className="players-count">
          {players ? `${filtered.length.toLocaleString('en-IN')} players` : 'Loading…'}
        </span>
      </section>

      <section className="players-grid-section" ref={gridSectionRef}>
        {players === null && <p className="players-status">Loading the roster…</p>}

        {players !== null && filtered.length === 0 && (
          <p className="players-status">No players match "{query}".</p>
        )}

        <div className="players-grid">
          {visible.map((p, i) => (
            <button
              className="player-card"
              key={`${p.name}-${i}`}
              onClick={() => setSelected(p)}
            >
              <PlayerAvatar name={p.name} photoId={p.photoId} size="card" />
              <div className="player-card-info">
                <p className="player-card-name">{p.name}</p>
                <p className="player-card-district">{p.district}</p>
              </div>
              <span className={`player-card-tag player-card-tag--${p.preference?.toLowerCase().includes('bowl') ? 'bowl' : 'bat'}`}>
                {p.preference}
              </span>
            </button>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <button className="players-load-more" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
            Load More Players
          </button>
        )}
      </section>

      <PlayerModal player={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
