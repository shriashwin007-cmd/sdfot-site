import { useEffect, useState } from 'react'
import './Nav.css'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#registration', label: 'Registration' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#prizes', label: 'Prizes' },
  { href: '#districts', label: 'Districts' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <a href="#top" className="site-nav-brand">
        <img src="/logo/sdfot-logo.png" alt="SDFOT" className="site-nav-logo" />
        <span>SDFOT</span>
      </a>

      <ul className="site-nav-menu">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <button
        className={`site-nav-toggle ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`site-nav-mobile ${open ? 'is-open' : ''}`}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
