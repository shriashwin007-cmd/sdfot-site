import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollCanvas.css'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 151
const FRAME_PATH = (i) => `/frames/frame-${String(i).padStart(3, '0')}.jpg`

export default function ScrollCanvas() {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const frameRef = useRef({ index: 1 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    const images = []
    let loadedCount = 0

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        loadedCount += 1
        if (loadedCount === FRAME_COUNT && !cancelled) setLoaded(true)
      }
      images.push(img)
    }
    imagesRef.current = images

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const ctx2d = canvas.getContext('2d')

    const render = () => {
      const img = imagesRef.current[Math.round(frameRef.current.index) - 1]
      if (!img || !img.complete || !img.naturalWidth) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)

      const imgRatio = img.naturalWidth / img.naturalHeight
      const canvasRatio = w / h
      let dw, dh, dx, dy
      if (imgRatio > canvasRatio) {
        dh = h
        dw = h * imgRatio
        dx = (w - dw) / 2
        dy = 0
      } else {
        dw = w
        dh = w / imgRatio
        dx = 0
        dy = (h - dh) / 2
      }
      ctx2d.clearRect(0, 0, w, h)
      ctx2d.drawImage(img, dx, dy, dw, dh)
    }

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        frameRef.current.index = 1 + self.progress * (FRAME_COUNT - 1)
        render()
      },
    })

    render()
    window.addEventListener('resize', render)

    return () => {
      st.kill()
      window.removeEventListener('resize', render)
    }
  }, [loaded])

  return (
    <section ref={wrapperRef} className="scroll-canvas-wrapper">
      <canvas ref={canvasRef} className="scroll-canvas" />
      <div className="scroll-canvas-overlay" />
      <div className="scroll-canvas-caption">
        <p className="scroll-canvas-eyebrow">The Journey</p>
        <h2 className="scroll-canvas-heading">From Dust to Glory</h2>
      </div>
      {!loaded && (
        <div className="scroll-canvas-loader">
          <span />
        </div>
      )}
    </section>
  )
}
