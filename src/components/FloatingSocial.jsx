import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './FloatingSocial.css'

export default function FloatingSocial() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.floating-social-btn',
        { opacity: 0, scale: 0, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 1.2, ease: 'back.out(1.7)' }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="floating-social">
      <a
        className="floating-social-btn floating-social-whatsapp"
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SDFOT on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.92 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm5.8 14.19c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.13.11-1.82-.11a16.5 16.5 0 0 1-1.65-.61c-2.9-1.25-4.79-4.16-4.94-4.36-.14-.2-1.18-1.57-1.18-3s.75-2.12 1.02-2.41c.26-.28.57-.36.76-.36l.55.01c.17.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.16-.3.36-.43.49-.14.14-.29.29-.13.57.17.28.75 1.24 1.61 2.01 1.11 1 2.05 1.31 2.32 1.46.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.71-.17 1.39z" />
        </svg>
      </a>
      <a
        className="floating-social-btn floating-social-instagram"
        href="https://instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="SDFOT on Instagram"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.34a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.72a4.22 4.22 0 1 1 0-8.44 4.22 4.22 0 0 1 0 8.44zm6.76-10.98a1.52 1.52 0 1 1-3.04 0 1.52 1.52 0 0 1 3.04 0z" />
        </svg>
      </a>
    </div>
  )
}
