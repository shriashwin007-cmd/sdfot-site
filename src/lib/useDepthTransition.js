import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function findPrevDepthSection(el) {
  let prev = el.previousElementSibling
  while (prev && !prev.hasAttribute('data-depth-section')) {
    prev = prev.previousElementSibling
  }
  return prev
}

export function useDepthTransition(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.innerWidth < 768) return

    const prev = findPrevDepthSection(el)

    // transformPerspective is scoped to this element's own transform (adds
    // perspective() inline), unlike an ancestor CSS `perspective` property,
    // which would create a containing block that breaks position:fixed for
    // any pinned ScrollTrigger sections elsewhere in the tree.
    gsap.set(el, {
      transformPerspective: 1200,
      transformStyle: 'preserve-3d',
      willChange: 'transform, opacity',
      z: -200,
      opacity: 0,
    })

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'top top',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        gsap.set(el, {
          z: gsap.utils.interpolate(-200, 0, p),
          opacity: gsap.utils.interpolate(0, 1, p),
        })
        if (prev) {
          gsap.set(prev, {
            scale: gsap.utils.interpolate(1, 0.94, p),
            filter: `brightness(${gsap.utils.interpolate(1, 0.7, p)})`,
          })
        }
      },
    })

    return () => {
      st.kill()
      gsap.set(el, { clearProps: 'transform,opacity,willChange' })
      if (prev) gsap.set(prev, { clearProps: 'transform,filter' })
    }
  }, [ref])
}
