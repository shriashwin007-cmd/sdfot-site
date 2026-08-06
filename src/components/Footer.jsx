import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

const SPONSORS = [
  { name: 'Fuze', src: '/sponsors/fuze.png' },
  { name: 'C7', src: '/sponsors/c7.png' },
  { name: 'Bullet Cricket', src: '/sponsors/bullet-cricket.png' },
]

export default function Footer() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-cta, .sponsor-logo',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <footer id="contact" ref={ref} className="site-footer">
      <div className="footer-cta">
        <h2>Ready to be discovered?</h2>
        <p>
          Register for your district selection and take the first step
          toward Tamil Nadu's biggest grassroots cricket pathway.
        </p>
        <a className="footer-btn" href="#registration">
          Register Now
        </a>
      </div>

      <div className="footer-sponsors">
        <p className="footer-sponsors-label">Backed By</p>
        <div className="footer-sponsors-row">
          {SPONSORS.map((s) => (
            <img
              key={s.name}
              className="sponsor-logo"
              src={s.src}
              alt={s.name}
            />
          ))}
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <img src="/logo/sdfot-logo.png" alt="SDFOT" />
            <span>SDFOT</span>
          </div>
          <p className="footer-tagline">
            Sports Development Federation of Tamil Nadu — discovering
            talent, building champions.
          </p>
        </div>

        <div>
          <p className="footer-col-heading">Explore</p>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#registration">Registration</a></li>
            <li><a href="#pipeline">Pipeline</a></li>
            <li><a href="#prizes">Prizes</a></li>
            <li><a href="#districts">Districts</a></li>
          </ul>
        </div>

        <div>
          <p className="footer-col-heading">Registered Office</p>
          <p className="footer-address">
            Shop No. 201, First Floor, Thirrumagal Complex, Veppamara Bus
            Stop, Kannivadi Rd, Dindigul – 624 705, Tamil Nadu.
          </p>
        </div>

        <div>
          <p className="footer-col-heading">Legal</p>
          <p className="footer-legal">
            Section 8 License No. 186064
            <br />
            CIN: U93120TZ2026NPL039350
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} SDFOT — Association of Tamil Nadu</span>
      </div>
    </footer>
  )
}
