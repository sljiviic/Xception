import ReactDOM from 'react-dom'
import { useRef, useCallback } from 'react'
import clsx from 'clsx'
// import { useModal } from '@/hooks/useModal'
import { useClickOutside } from '@/hooks/useClickOutside'
import classes from './Modal.module.css'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  error,
  footer,
  className
}) => {
  const modalRef = useRef(null)

  // Scroll locking, preventing page shifting, focusing first interactive element when modal opens, and focus trapping
  // useModal(modalRef, isOpen)

  // Handle click outside AND escape key
  const handleClickOutside = useCallback(() => {
    if (isOpen) onClose()
  }, [isOpen, onClose])
  useClickOutside(modalRef, handleClickOutside, isOpen)

  return ReactDOM.createPortal(
    <div
      className={clsx(classes.backdrop, { [classes.hidden]: !isOpen })}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role='dialog'
        aria-modal='true'
        aria-label={`modal-${title}`}
        className={clsx(classes.modal, className, { [classes.hidden]: !isOpen })}
        onClick={e => e.stopPropagation()}
      >
        {title && <h2 className={classes.title}>{title}</h2>}
        <div className={classes.content}>
          {children}
          <div className={clsx(classes.errorText, { [classes.visible]: !!error })}>{error}</div>
          {footer && <div className={classes.footer}>{footer}</div>}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default Modal