import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HIGHLIGHTS from '../data/highlights'
import './Highlights.css'

gsap.registerPlugin(ScrollTrigger)

const SPACING = 300
const DEPTH = 260
const TILT = 34
const MAX_VISIBLE = 3

export default function Highlights() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const counterRef = useRef(null)
  const titleRef = useRef(null)
  const tagRef = useRef(null)
  const progressState = useRef({ index: 0, mx: 0, my: 0 })

  useEffect(() => {
    const n = HIGHLIGHTS.length
    const section = sectionRef.current
    const stage = stageRef.current

    const layout = () => {
      const continuous = progressState.current.index
      const activeIdx = Math.round(continuous)

      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const delta = i - continuous
        const abs = Math.abs(delta)
        const tx = delta * SPACING
        const tz = -abs * DEPTH
        const ry = gsap.utils.clamp(-TILT, TILT, -delta * TILT)
        const opacity = abs > MAX_VISIBLE ? 0 : gsap.utils.mapRange(0, MAX_VISIBLE, 1, 0.05, abs)
        const scale = gsap.utils.mapRange(0, MAX_VISIBLE, 1, 0.62, abs)

        el.style.transform = `translate3d(${tx}px, 0, ${tz}px) rotateY(${ry}deg) scale(${Math.max(scale, 0.5)})`
        el.style.opacity = opacity.toFixed(3)
        el.style.zIndex = String(1000 - Math.round(abs * 10))
        el.classList.toggle('is-active', i === activeIdx)
      })

      if (stage) {
        stage.style.transform = `rotateX(${progressState.current.my * -6}deg) rotateY(${progressState.current.mx * 6}deg)`
      }

      const item = HIGHLIGHTS[gsap.utils.clamp(0, n - 1, activeIdx)]
      if (counterRef.current) {
        counterRef.current.textContent = `${String(activeIdx + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`
      }
      if (titleRef.current) titleRef.current.textContent = item.title
      if (tagRef.current) tagRef.current.textContent = item.tag
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${(n - 1) * 90}%`,
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        progressState.current.index = self.progress * (n - 1)
        layout()
      },
    })

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      progressState.current.mx = (e.clientX - rect.left) / rect.width - 0.5
      progressState.current.my = (e.clientY - rect.top) / rect.height - 0.5
      layout()
    }
    const onMouseLeave = () => {
      progressState.current.mx = 0
      progressState.current.my = 0
      layout()
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    layout()

    return () => {
      st.kill()
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section id="highlights" ref={sectionRef} className="highlights">
      <div className="highlights-head">
        <p className="highlights-eyebrow">Highlights</p>
        <h2 className="highlights-heading">On The Ground</h2>
      </div>

      <div className="highlights-viewport">
        <div className="highlights-stage" ref={stageRef}>
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.image}
              className="highlights-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <img src={item.image} alt={item.title} draggable={false} />
            </div>
          ))}
        </div>
      </div>

      <div className="highlights-caption">
        <span className="highlights-counter" ref={counterRef}>
          01 / 06
        </span>
        <div className="highlights-caption-text">
          <p className="highlights-tag" ref={tagRef}>
            The Run-Up
          </p>
          <p className="highlights-title" ref={titleRef}>
            Every Delivery Counts
          </p>
        </div>
      </div>
    </section>
  )
}
