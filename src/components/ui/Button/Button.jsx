import classes from './Button.module.css'
import clsx from 'clsx'

const Button = ({
  children,
  as = 'button', // 'button' or 'a'
  type = 'button', // only used if `as='button'`
  href, // required if `as='a'`
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
  ...props
}) => {
  const buttonClass = clsx(
    classes.button,
    classes[variant],
    classes[size],
    { [classes.disabled]: disabled },
    className
  )

  // common props for both button and anchor
  const commonProps = {
    className: buttonClass,
    onClick,
    disabled: disabled,
    tabIndex: !disabled ? -1 : 0,
    ['aria-disabled']: disabled,
    ...props,
  }

  if (as === 'a') {
    return (
      <a href={href} target='_blank' {...commonProps}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} {...commonProps}>
      {children}
    </button>
  )
}

export default Button