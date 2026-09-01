import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#registration', label: 'Registration' },
  { href: '/#pipeline', label: 'Pipeline' },
  { href: '/#highlights', label: 'Highlights' },
  { href: '/#prizes', label: 'Prizes' },
  { href: '/#districts', label: 'Districts' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`site-nav ${scrolled || pathname !== '/' ? 'site-nav--scrolled' : ''}`}>
      <Link to="/" className="site-nav-brand">
        <img src="/logo/sdfot-logo.png" alt="SDFOT" className="site-nav-logo" />
        <span>SDFOT</span>
      </Link>

      <ul className="site-nav-menu">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
        <li>
          <Link to="/players" className={pathname === '/players' ? 'is-active' : ''}>
            Players
          </Link>
        </li>
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
        <li>
          <Link to="/players" onClick={() => setOpen(false)}>
            Players
          </Link>
        </li>
      </ul>
    </nav>
  )
}
