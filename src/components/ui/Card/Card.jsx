import classes from './Card.module.css'
import clsx from 'clsx'

const Card = ({
  variant = 'primary',
  title,
  image,
  children,
  footer,
  wrapperClassName,
  contentClassName
}) => {
  const cardClass = clsx(
    classes.card,
    classes[variant],
    wrapperClassName
  )

  const contentClass = clsx(
    classes.content,
    contentClassName
  )

  return (
    <div className={cardClass}>
      {image && (
        <div className={classes.imageWrapper}>
          <img src={image} alt={title || 'Card image'} className={classes.image} />
        </div>
      )}
      <div className={contentClass}>
        <div className={classes.main}>
          {title && <h3 className={classes.title}>{title}</h3>}
          <div className={classes.body}>{children}</div>
        </div>
        {footer && <div className={classes.footer}>{footer}</div>}
      </div>
    </div>
  )
}

export default Card