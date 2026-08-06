import { useEffect, useRef } from 'react'
import SplitType from 'split-type'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SplitHeading({ as: Tag = 'h2', className = '', children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const split = new SplitType(el, { types: 'words, chars', tagName: 'span' })

    split.words.forEach((wordEl) => {
      wordEl.style.display = 'inline-block'
      wordEl.style.whiteSpace = 'nowrap'
    })

    split.chars.forEach((charEl) => {
      charEl.style.display = 'inline-block'
      const mask = document.createElement('span')
      mask.className = 'split-mask'
      mask.style.display = 'inline-block'
      mask.style.overflow = 'hidden'
      charEl.parentNode.insertBefore(mask, charEl)
      mask.appendChild(charEl)
    })

    gsap.set(split.chars, { yPercent: 100, opacity: 0 })

    const anim = gsap.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
      split.revert()
    }
  }, [])

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}
