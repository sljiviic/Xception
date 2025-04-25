import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'
import clsx from 'clsx'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  error,
  footer
}) => {
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const errorClass = clsx(
    classes.errorText,
    { [classes.visible]: !!error }
  )

  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`modal-${title}`}
        className={classes.modal}
        onClick={e => e.stopPropagation()}
      >
        {title && <h2 className={classes.title}>{title}</h2>}
        <div className={classes.content}>{children}</div>
        <div className={errorClass}>{error}</div>
        {footer && <div className={classes.footer}>{footer}</div>}
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default Modal