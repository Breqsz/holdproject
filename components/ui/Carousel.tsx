'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion'
import { Layers, Star, Users } from 'lucide-react'

export interface CarouselItem {
  title: string
  description: string
  id: number | string
  icon: React.ReactNode
  visual?: React.ReactNode
}

interface CarouselItemProps {
  item: CarouselItem
  index: number
  itemWidth: number
  round: boolean
  trackItemOffset: number
  x: MotionValue<number>
  transition: object
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { title: '+19', description: 'Anos de Experiência', id: 1, icon: <Star className="h-4 w-4 text-[#ae251c]" /> },
  { title: '+60', description: 'Parceiros Comerciais', id: 2, icon: <Users className="h-4 w-4 text-[#ae251c]" /> },
  { title: '4',   description: 'Frentes Integradas',  id: 3, icon: <Layers className="h-4 w-4 text-[#ae251c]" /> },
]

const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const GAP = 16
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 }

function CarouselItemCard({ item, index, itemWidth, round, trackItemOffset, x, transition }: CarouselItemProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset]
  const outputRange = [90, 0, -90]
  const rotateY = useTransform(x, range, outputRange, { clamp: false })

  const hasVisual = !!item.visual && !round

  return (
    <motion.div
      className={`relative shrink-0 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing ${
        round
          ? 'items-center justify-center text-center bg-[#07162a] border-0'
          : 'bg-[#071526] border border-[rgba(201,168,76,0.18)] rounded-[14px]'
      }`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : 'auto',
        rotateY,
        ...(round ? { borderRadius: '50%' } : {}),
      }}
      transition={transition}
    >
      {hasVisual ? (
        <>
          {/* Custom visual area */}
          <div className="h-44 w-full overflow-hidden flex items-center justify-center flex-shrink-0">
            {item.visual}
          </div>

          {/* Hairline divider */}
          <div className="h-px mx-5 flex-shrink-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.22), transparent)' }} />

          {/* Stats footer */}
          <div className="p-5 pt-4">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ae251c]/15 ring-1 ring-[#ae251c]/30 mb-3">
              {item.icon}
            </span>
            <div className="font-black text-4xl leading-none tracking-tight text-white">{item.title}</div>
            <div className="mt-2 h-px w-8 bg-gradient-to-r from-[#ae251c] to-[#c9a84c] rounded-full" />
            <p className="mt-2 text-sm text-[#7a9ab8] leading-snug">{item.description}</p>
          </div>
        </>
      ) : (
        <>
          <div className={round ? 'p-0 m-0' : 'mb-4 p-7'}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ae251c]/15 ring-1 ring-[#ae251c]/30">
              {item.icon}
            </span>
          </div>
          <div className="p-7 pt-0">
            <div className="font-black text-5xl leading-none tracking-tight text-white">{item.title}</div>
            <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#ae251c] to-[#c9a84c] rounded-full" />
            <p className="mt-3 text-base text-[#7a9ab8] leading-snug">{item.description}</p>
          </div>
        </>
      )}
    </motion.div>
  )
}

interface CarouselProps {
  items?: CarouselItem[]
  baseWidth?: number
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
  round?: boolean
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps) {
  const containerPadding = 16
  const itemWidth = baseWidth - containerPadding * 2
  const trackItemOffset = itemWidth + GAP

  const itemsForRender = useMemo(() => {
    if (!loop) return items
    if (items.length === 0) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items, loop])

  const [position, setPosition] = useState(loop ? 1 : 0)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return
    const container = containerRef.current
    const onEnter = () => setIsHovered(true)
    const onLeave = () => setIsHovered(false)
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [pauseOnHover])

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return
    if (pauseOnHover && isHovered) return
    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1))
    }, autoplayDelay)
    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length])

  useEffect(() => {
    const start = loop ? 1 : 0
    setPosition(start)
    x.set(-start * trackItemOffset)
  }, [items.length, loop, trackItemOffset, x])

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1))
    }
  }, [itemsForRender.length, loop, position])

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) { setIsAnimating(false); return }
    const lastClone = itemsForRender.length - 1
    if (position === lastClone) {
      setIsJumping(true)
      const target = 1
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false) })
      return
    }
    if (position === 0) {
      setIsJumping(true)
      const target = items.length
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false) })
      return
    }
    setIsAnimating(false)
  }

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const { offset, velocity } = info
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1
      : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1
      : 0
    if (direction === 0) return
    setPosition(prev => Math.max(0, Math.min(prev + direction, itemsForRender.length - 1)))
  }

  const dragProps = loop ? {} : {
    dragConstraints: {
      left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
      right: 0,
    },
  }

  const activeIndex = items.length === 0
    ? 0
    : loop
      ? (position - 1 + items.length) % items.length
      : Math.min(position, items.length - 1)

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round
          ? 'rounded-full border border-white'
          : 'rounded-[20px] border border-[rgba(255,255,255,0.07)]'
      }`}
      style={{
        width: `${baseWidth}px`,
        ...(round ? { height: `${baseWidth}px` } : {}),
      }}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItemCard
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      <div className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}`}>
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                activeIndex === index
                  ? round ? 'bg-white' : 'bg-[#c9a84c]'
                  : round ? 'bg-[#555]' : 'bg-[#142f54]'
              }`}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
