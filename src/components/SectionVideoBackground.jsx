import { useRef } from 'react'
import { useParallaxBg } from '../lib/useParallaxBg'
import './SectionBackground.css'

export default function SectionVideoBackground({ sectionRef, src }) {
  const bgRef = useRef(null)
  useParallaxBg(sectionRef, bgRef)

  return (
    <div className="section-bg">
      <video
        ref={bgRef}
        className="section-bg-image section-bg-video"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="section-bg-overlay" />
    </div>
  )
}
