import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitHeading from './SplitHeading'
import TiltCard from './TiltCard'
import SectionBackground from './SectionBackground'
import { useDepthTransition } from '../lib/useDepthTransition'
import './Prizes.css'

gsap.registerPlugin(ScrollTrigger)

const PRIZES = [
  { place: '1st', amount: '₹4,44,444' },
  { place: '2nd', amount: '₹2,22,222' },
  { place: '3rd', amount: '₹1,11,111' },
  { place: '4th', amount: '₹55,555' },
  { place: '5th', amount: '₹22,000' },
  { place: '6th', amount: '₹22,000' },
  { place: '7th', amount: '₹22,000' },
  { place: '8th', amount: '₹22,000' },
]

export default function Prizes() {
  const ref = useRef(null)

  useDepthTransition(ref)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.prizes-eyebrow',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        }
      )

      gsap.fromTo(
        '.prize-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.prize-grid', start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.bike-card',
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.bike-card', start: 'top 80%' },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section id="prizes" ref={ref} data-depth-section className="prizes">
      <SectionBackground sectionRef={ref} src="/backgrounds/prizes-bg.png" />
      <p className="prizes-eyebrow">Session 1</p>
      <SplitHeading as="h2" className="prizes-heading">
        Tamil Nadu Inter-District Tennis Ball Cricket Tournament
      </SplitHeading>

      <div className="prizes-meta">
        <div>
          <span>38</span>
          <p>Districts</p>
        </div>
        <div>
          <span>₹20L</span>
          <p>Overall Budget</p>
        </div>
        <div>
          <span>FREE</span>
          <p>Entry Fee</p>
        </div>
      </div>

      <div className="bike-card">
        <span className="bike-label">Man of the Series</span>
        <h3>Royal Enfield Bullet Bike</h3>
      </div>

      <div className="prize-grid">
        {PRIZES.map((p) => (
          <TiltCard className="prize-card" key={p.place} max={6}>
            <p className="prize-place">{p.place} Prize</p>
            <p className="prize-amount">{p.amount}</p>
          </TiltCard>
        ))}
      </div>

      <div className="prizes-rules">
        <div>
          <p className="rules-label">Overs</p>
          <p>League 8 overs · Semis &amp; Finals 10 overs</p>
        </div>
        <div>
          <p className="rules-label">Ball</p>
          <p>Bullet Ball</p>
        </div>
      </div>
    </section>
  )
}
