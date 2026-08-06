import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SceneCanvas.css'

gsap.registerPlugin(ScrollTrigger)

const SHAPE_COLORS = [0xff9933, 0xffffff, 0x138808, 0xff9933, 0x138808]

function buildGeometry(index) {
  switch (index % 5) {
    case 0:
      return new THREE.IcosahedronGeometry(1.6, 0)
    case 1:
      return new THREE.OctahedronGeometry(1.8, 0)
    case 2:
      return new THREE.TorusGeometry(1.4, 0.4, 8, 24)
    case 3:
      return new THREE.DodecahedronGeometry(1.5, 0)
    default:
      return new THREE.TetrahedronGeometry(1.9, 0)
  }
}

export default function SceneCanvas() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [enabled, setEnabled] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )

  useEffect(() => {
    const onResize = () => setEnabled(window.innerWidth >= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.z = 20

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // Background video plane (abstract texture only, screen-blended via CSS)
    let videoTexture = null
    const video = videoRef.current
    if (video) {
      videoTexture = new THREE.VideoTexture(video)
      videoTexture.colorSpace = THREE.SRGBColorSpace
      const planeAspect = 16 / 9
      const distance = 34
      const vFov = (camera.fov * Math.PI) / 180
      const height = 2 * Math.tan(vFov / 2) * distance
      const width = height * Math.max(planeAspect, window.innerWidth / window.innerHeight)
      const planeGeo = new THREE.PlaneGeometry(width, height)
      const planeMat = new THREE.MeshBasicMaterial({
        map: videoTexture,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      })
      const plane = new THREE.Mesh(planeGeo, planeMat)
      plane.position.z = -distance
      scene.add(plane)
    }

    // Floating abstract shapes along the z-axis path
    const shapes = []
    const depths = [-4, -11, -18, -25, -32]
    depths.forEach((z, i) => {
      const geo = buildGeometry(i)
      const mat = new THREE.MeshBasicMaterial({
        color: SHAPE_COLORS[i],
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(
        (i % 2 === 0 ? 1 : -1) * (3 + i * 0.6),
        (i % 2 === 0 ? -1 : 1) * (1.5 + i * 0.3),
        z
      )
      mesh.userData.spin = {
        x: (Math.random() - 0.5) * 0.006,
        y: (Math.random() - 0.5) * 0.008,
      }
      scene.add(mesh)
      shapes.push(mesh)
    })

    // Scroll-scrubbed camera move through the scene
    const camState = { z: 20, rotY: 0 }
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        camState.z = gsap.utils.interpolate(20, -14, self.progress)
        camState.rotY = Math.sin(self.progress * Math.PI * 2) * 0.06
      },
    })

    let raf = null
    const animate = () => {
      camera.position.z = camState.z
      camera.rotation.y = camState.rotY
      shapes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.spin.x
        mesh.rotation.y += mesh.userData.spin.y
      })
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      st.kill()
      window.removeEventListener('resize', onResize)
      shapes.forEach((mesh) => {
        mesh.geometry.dispose()
        mesh.material.dispose()
      })
      if (videoTexture) videoTexture.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="scene-canvas" ref={containerRef}>
      <video
        ref={videoRef}
        className="scene-canvas-video-source"
        src="/video/scene-abstract.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  )
}
