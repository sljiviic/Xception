import classes from './Banner.module.css'
import clsx from 'clsx'

const Banner = ({
  as = 'a', // a || button
  onClick, // Only for button
  href,
  target,
  image,
  imageAlt,
  className
}) => {

  if (as === 'button') {
    return (
      <button
        onClick={onClick}
        className={clsx(classes.banner, className)}
      >
        <img
          src={image}
          alt={imageAlt}
          className={classes.image}
        />
      </button>
    )
  }

  return (
    <a
      href={href}
      target={target}
      className={clsx(classes.banner, className)}
    >
      <img
        src={image}
        alt={imageAlt}
        className={classes.image}
      />
    </a>
  )
}

export default Banner