import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBackground from './SectionBackground'
import './Exploration.css'

gsap.registerPlugin(ScrollTrigger)

const BEATS = [
  { label: '01', text: 'FROM THE\nSTREETS', color: 'saffron' },
  { label: '02', text: 'TO THE\nSTADIUM', color: 'white' },
  { label: '03', text: '38\nDISTRICTS', color: 'green' },
  { label: '04', text: 'ONE\nDREAM', color: 'saffron' },
]

export default function Exploration() {
  const sectionRef = useRef(null)
  const beatRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const n = BEATS.length

    const ctx = gsap.context(() => {
      gsap.set(beatRefs.current, { opacity: 0, scale: 0.85, filter: 'blur(14px)' })
      gsap.set(beatRefs.current[0], { opacity: 1, scale: 1, filter: 'blur(0px)' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${n * 100}%`,
          pin: true,
          scrub: 0.7,
        },
      })

      beatRefs.current.forEach((el, i) => {
        if (i === 0) return
        tl.to(beatRefs.current[i - 1], { opacity: 0, scale: 1.15, filter: 'blur(14px)', duration: 0.5 })
        tl.to(el, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5 }, '<')
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="exploration">
      <SectionBackground sectionRef={sectionRef} src="/backgrounds/exploration-bg.png" />
      <div className="exploration-grid" />
      <div className="exploration-stage">
        {BEATS.map((beat, i) => (
          <div
            key={beat.label}
            className="exploration-beat"
            ref={(el) => (beatRefs.current[i] = el)}
          >
            <span className="exploration-index">{beat.label}</span>
            <h2 className={`exploration-text exploration-${beat.color}`}>
              {beat.text.split('\n').map((line, j) => (
                <span key={j}>{line}</span>
              ))}
            </h2>
          </div>
        ))}
      </div>
      <div className="exploration-footer">
        <div className="exploration-dots">
          {BEATS.map((beat) => (
            <span key={beat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
