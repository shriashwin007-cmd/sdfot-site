import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitHeading from './SplitHeading'
import { useDepthTransition } from '../lib/useDepthTransition'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const PATHWAY = [
  {
    n: '01',
    title: 'District-wise process',
    text: 'SDFOT conducts a district-wise selection process across all 38 districts of Tamil Nadu.',
  },
  {
    n: '02',
    title: 'Best talent identification',
    text: 'The objective is to identify the best cricket talent from each district.',
  },
  {
    n: '03',
    title: 'District teams formed',
    text: 'Selected players form their District Representative Team.',
  },
  {
    n: '04',
    title: 'Grassroots to platform',
    text: 'This creates a strong grassroots pathway, taking talented players from the local level to bigger competitive platforms.',
  },
]

export default function About() {
  const ref = useRef(null)

  useDepthTransition(ref)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-eyebrow, .about-copy',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        }
      )

      gsap.fromTo(
        '.pathway-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.pathway-grid', start: 'top 80%' },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={ref} data-depth-section className="about">
      <div className="about-intro">
        <p className="about-eyebrow">About SDFOT</p>
        <SplitHeading as="h2" className="about-heading">
          Discovering talent in the streets.
          <br />
          Building champions for the nation.
        </SplitHeading>
        <p className="about-copy">
          A vision-led federation finding tennis-ball cricket talent in
          street cricket and local tournaments across Tamil Nadu — and
          taking it to stadiums, pro tournaments, and the national stage.
        </p>
      </div>

      <div className="pathway-grid">
        {PATHWAY.map((step) => (
          <div className="pathway-card" key={step.n}>
            <span className="pathway-number">{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
