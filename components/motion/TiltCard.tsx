'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  rotateAmplitude?: number
  scaleOnHover?: number
}

const SPRING = { damping: 30, stiffness: 100, mass: 2 }

export function TiltCard({
  children,
  className = '',
  rotateAmplitude = 8,
  scaleOnHover = 1.03,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const scale = useMotionValue(1)
  const springX = useSpring(rotX, SPRING)
  const springY = useSpring(rotY, SPRING)
  const springScale = useSpring(scale, SPRING)

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotX.set(-dy * rotateAmplitude)
    rotY.set(dx * rotateAmplitude)
  }

  const handleMouseEnter = () => scale.set(scaleOnHover)
  const handleMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: springX,
        rotateY: springY,
        scale: springScale,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
