import { useRef } from 'react'
import { useParallaxBg } from '../lib/useParallaxBg'
import './SectionBackground.css'

export default function SectionBackground({ sectionRef, src }) {
  const bgRef = useRef(null)
  useParallaxBg(sectionRef, bgRef)

  return (
    <div className="section-bg">
      <div ref={bgRef} className="section-bg-image" style={{ backgroundImage: `url(${src})` }} />
      <div className="section-bg-overlay" />
    </div>
  )
}
