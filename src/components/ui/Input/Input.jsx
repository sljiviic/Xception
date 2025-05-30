import classes from './Input.module.css'
import clsx from 'clsx'

const Input = ({
  label,
  labelSize = 'medium',
  name,
  error = '',
  className,
  wrapperClassName,
  ...props
}) => {
  const inputClass = clsx(
    classes.input,
    { [classes.error]: !!error },
    className
  )

  const labelClass = clsx(
    classes.label,
    classes[labelSize]
  )

  const errorClass = clsx(
    classes.errorText,
    { [classes.visible]: !!error }
  )

  return (
    <>
      <div className={clsx(classes.wrapper, wrapperClassName)}>
        {label && (
          <label htmlFor={name} className={labelClass}>
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          className={inputClass}
          aria-label={label}
          {...props}
        />
      </div>
      <div className={errorClass}>{error}</div>
    </>
  )
}

export default Input