'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { gsap } from 'gsap'

interface VariableSpeed {
  min: number
  max: number
}

interface TextTypeProps extends React.HTMLAttributes<HTMLElement> {
  text: string | string[]
  as?: React.ElementType
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  showCursor?: boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?: React.ReactNode
  cursorClassName?: string
  cursorBlinkDuration?: number
  textColors?: string[]
  variableSpeed?: VariableSpeed
  onSentenceComplete?: (sentence: string, index: number) => void
  onTypingComplete?: (sentence: string, index: number) => void
  startOnVisible?: boolean
  reverseMode?: boolean
}

export default function TextType({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  onTypingComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLElement>(null)
  const typingCompleteFiredRef = useRef(false)

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed
    return Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min
  }, [variableSpeed, typingSpeed])

  const getCurrentTextColor = () =>
    textColors.length === 0 ? 'inherit' : textColors[currentTextIndex % textColors.length]

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setIsVisible(true) }) },
      { threshold: 0.1 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    if (showCursor) {
      gsap.set(cursor, { opacity: 1 })
      gsap.to(cursor, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    }
    return () => { gsap.killTweensOf(cursor) }
  }, [showCursor, cursorBlinkDuration])

  useEffect(() => {
    if (!isVisible) return
    let timeout: ReturnType<typeof setTimeout>
    const currentText = textArray[currentTextIndex]
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText

    const run = () => {
      if (isDeleting) {
        typingCompleteFiredRef.current = false
        if (displayedText === '') {
          setIsDeleting(false)
          if (currentTextIndex === textArray.length - 1 && !loop) return
          onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex)
          setCurrentTextIndex(prev => (prev + 1) % textArray.length)
          setCurrentCharIndex(0)
        } else {
          timeout = setTimeout(() => setDisplayedText(prev => prev.slice(0, -1)), deletingSpeed)
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev + processedText[currentCharIndex])
            setCurrentCharIndex(prev => prev + 1)
          }, variableSpeed ? getRandomSpeed() : typingSpeed)
        } else {
          if (!typingCompleteFiredRef.current) {
            typingCompleteFiredRef.current = true
            onTypingComplete?.(textArray[currentTextIndex], currentTextIndex)
          }
          if (!loop && currentTextIndex === textArray.length - 1) return
          timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      }
    }

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(run, initialDelay)
    } else {
      run()
    }

    return () => clearTimeout(timeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharIndex, displayedText, isDeleting, textArray, currentTextIndex, isVisible])

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting)

  const Tag = Component as React.ElementType

  return (
    <Tag
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap tracking-tight ${className}`}
      {...props}
    >
      <span className="inline" style={{ color: getCurrentTextColor() }}>
        {displayedText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )}
    </Tag>
  )
}
