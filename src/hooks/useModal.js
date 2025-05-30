import { useEffect, useRef } from 'react'

export const useModal = (ref, isOpen) => {
  const headerRef = useRef(null)

  // Scroll locking and preventing from page shifting
  useEffect(() => {
    headerRef.current = document.querySelector('header')
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollBarWidth}px`

    if (headerRef.current) {
      const currentPadding = window.getComputedStyle(headerRef.current).paddingRight
      headerRef.current.style.paddingRight = `calc(${currentPadding} + ${scrollBarWidth}px)`
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''

      if (headerRef.current) {
        headerRef.current.style.paddingRight = ''
      }
    }
  }, [isOpen])


  // Focus first interactive element when modal opens
  useEffect(() => {
    if (isOpen && ref.current) {
      const focusableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }
  }, [ref, isOpen])

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return

      const focusableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      } else if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [ref, isOpen])
}