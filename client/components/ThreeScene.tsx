'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeSceneProps {
  modelType: string
}

export default function ThreeScene({ modelType }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0f172a)

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )

    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    )

    renderer.shadowMap.enabled = true

    container.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(5, 10, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xff6600, 3, 100)
    pointLight.position.set(0, 0, 5)
    scene.add(pointLight)

    const sphereGeometry = new THREE.SphereGeometry(2, 128, 128)

    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      roughness: 0.2,
      metalness: 1,
      clearcoat: 1
    })

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    sphere.castShadow = true
    sphere.receiveShadow = true

    scene.add(sphere)

    const textureLoader = new THREE.TextureLoader()

    const dragonTexture = textureLoader.load('/dragon.png')

    const planeGeometry = new THREE.PlaneGeometry(2.5, 2.5)

    const planeMaterial = new THREE.MeshBasicMaterial({
      map: dragonTexture,
      transparent: true
    })

    const dragonLogo = new THREE.Mesh(
      planeGeometry,
      planeMaterial
    )

    dragonLogo.position.z = 2.02

    sphere.add(dragonLogo)

    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      sphere.rotation.y += 0.01
      sphere.rotation.x += 0.003

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!container) return

      const width = container.clientWidth
      const height = container.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      cancelAnimationFrame(animationId)

      sphereGeometry.dispose()
      sphereMaterial.dispose()
      planeGeometry.dispose()
      planeMaterial.dispose()
      dragonTexture.dispose()
      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [modelType])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[500px] rounded-xl overflow-hidden"
    />
  )
}