import classes from './Error.module.css'
import clsx from 'clsx'

const Error = ({ error, type, className }) => {
  return (
    <div className={clsx(classes.errorContainer, className)}>
      <p className={clsx(classes.error, classes[type])}>{error}</p>
    </div>
  )
}

export default Error