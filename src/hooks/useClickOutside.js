import { useEffect } from 'react'

export const useClickOutside = (ref, handler, isActive = true) => {
  useEffect(() => {
    if (!isActive || !handler) return

    const handleInteraction = (event) => {
      // handle both mouse and touch events
      if (!ref.current || ref.current.contains(event.target)) return
      // setTimeout for click handling avoids race conditions
      setTimeout(() => handler(event), 0)
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') handler(e)
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [ref, handler, isActive])
}