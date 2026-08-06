import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitHeading from './SplitHeading'
import { useDepthTransition } from '../lib/useDepthTransition'
import './Pipeline.css'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 38, suffix: '', label: 'District Teams' },
  { value: 20, suffix: '', label: 'Main Players / Team' },
  { value: 10, suffix: '', label: 'Standby / Team' },
  { value: 1140, suffix: '', label: 'Total Shortlisted' },
  { value: 80, suffix: '', label: 'Top Players Identified' },
  { value: 4, suffix: '', label: 'Elite TN Teams Formed' },
]

export default function Pipeline() {
  const ref = useRef(null)

  useDepthTransition(ref)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pipeline-eyebrow, .pipeline-copy',
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

      const counters = gsap.utils.toArray('.stat-value')
      counters.forEach((el) => {
        const target = Number(el.dataset.value)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString('en-IN')
          },
        })
      })

      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.stat-grid', start: 'top 80%' },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section id="pipeline" ref={ref} data-depth-section className="pipeline">
      <p className="pipeline-eyebrow">The Pipeline</p>
      <SplitHeading as="h2" className="pipeline-heading">
        Team Selection &amp; Development Plan
      </SplitHeading>
      <p className="pipeline-copy">
        1,140 shortlisted players. One ₹20L state tournament. 4 elite Tamil
        Nadu teams.
      </p>

      <div className="stat-grid">
        {STATS.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <p className="stat-value" data-value={stat.value}>
              0
            </p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
