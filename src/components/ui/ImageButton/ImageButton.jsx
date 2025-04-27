import classes from './ImageButton.module.css'
import clsx from 'clsx'

const ImageButtonn = ({
  image,
  imageAlt,
  onClick,
  disabled = false,
  isNew,
  className
}) => {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
    } else {
      onClick && onClick()
    }
  }

  const handleKeyDown = (e) => {
    if (disabled) return

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick && onClick()
    }
  }

  const buttonClass = clsx(
    classes.button,
    { [classes.disabled]: disabled },
    className
  )

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={!disabled ? -1 : 0}
      role='button'
      aria-disabled={disabled}
    >
      {isNew && <div className={classes.badge}>NEW</div>}
      <img
        src={image}
        alt={imageAlt}
        className={classes.image}
      />
    </button>
  )
}

export default ImageButtonn