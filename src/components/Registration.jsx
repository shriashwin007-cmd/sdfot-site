import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitHeading from './SplitHeading'
import { useDepthTransition } from '../lib/useDepthTransition'
import './Registration.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  'Players register online through the official SDFOT registration link.',
  "The link is shared through District SPOCs and SDFOT's social media platforms.",
  'Players select their district, fill in details, and submit the registration form.',
]

const BENEFITS = [
  { icon: '👕', label: 'SDFOT Official T-Shirt' },
  { icon: '🍽️', label: 'Lunch & Refreshment' },
  { icon: '🪪', label: 'One-Year SDFOT Membership Card' },
  { icon: '🏏', label: 'Eligibility for the District Selection Process' },
]

export default function Registration() {
  const ref = useRef(null)

  useDepthTransition(ref)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reg-eyebrow, .reg-steps li',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 65%' },
        }
      )

      gsap.fromTo(
        '.reg-card',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.reg-card', start: 'top 75%' },
        }
      )

      gsap.fromTo(
        '.benefit-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.benefit-list', start: 'top 85%' },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section id="registration" ref={ref} data-depth-section className="registration">
      <div className="reg-left">
        <p className="reg-eyebrow">Getting Involved</p>
        <SplitHeading as="h2" className="reg-heading">
          Inter-District Selections &amp; Player Registration
        </SplitHeading>
        <p className="reg-lead">
          District-wise selections across all 38 districts to find the best
          talent and form District Representative Teams.
        </p>

        <ol className="reg-steps">
          {STEPS.map((step, i) => (
            <li key={i}>
              <span className="reg-step-num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="reg-right">
        <div className="reg-card">
          <p className="reg-card-label">Registration Fee</p>
          <p className="reg-card-amount">
            ₹299 <span>/ player</span>
          </p>

          <ul className="benefit-list">
            {BENEFITS.map((b) => (
              <li className="benefit-item" key={b.label}>
                <span className="benefit-icon">{b.icon}</span>
                <span>{b.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
