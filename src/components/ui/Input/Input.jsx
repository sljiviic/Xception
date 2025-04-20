import classes from './Input.module.css'
import clsx from 'clsx'

const Input = ({
  label,
  labelSize = 'medium',
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  className,
  wrapperClassName,
  ref,
  ...props
}) => {
  const inputClass = clsx(
    classes.input,
    { [classes.error]: !!error },
    className
  )

  const wrapperCalss = clsx(
    classes.wrapper,
    wrapperClassName
  )

  const labelClass = clsx(
    classes.label,
    classes[labelSize]
  )

  return (
    <div className={wrapperCalss}>
      {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={inputClass}
        placeholder={placeholder}
        required={required}
        aria-label={label}
        {...props}
      />
      {error && <div className={classes.errorText}>{error}</div>}
    </div>
  )
}

export default Input