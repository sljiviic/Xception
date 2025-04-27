import { useState, useEffect, useRef, useCallback } from 'react'

export const useScrollTrigger = (threshold = 10) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const animationFrameRef = useRef(null)
  const scrollYRef = useRef(0)

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      if ((currentScrollY > threshold) !== (scrollYRef.current > threshold)) {
        setIsScrolled(currentScrollY > threshold)
      }
      scrollYRef.current = currentScrollY
    })
  }, [threshold])

  useEffect(() => {
    scrollYRef.current = window.scrollY
    setIsScrolled(window.scrollY > threshold)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleScroll, threshold])

  return isScrolled
}