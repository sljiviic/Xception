import ReactDOM from 'react-dom'
import { useRef } from 'react'
import clsx from 'clsx'
import { useModal } from '@/hooks/useModal'
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
  useModal(modalRef, isOpen)

  // Handle click outside AND escape key
  useClickOutside(modalRef, () => {
    if (isOpen) onClose()
  }, isOpen)


  if (!isOpen) return null

  const errorClass = clsx(
    classes.errorText,
    { [classes.visible]: !!error }
  )

  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={onClose}>
      <div
        ref={modalRef}
        tabIndex={-1}
        role='dialog'
        aria-modal='true'
        aria-label={`modal-${title}`}
        className={clsx(classes.modal, className)}
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