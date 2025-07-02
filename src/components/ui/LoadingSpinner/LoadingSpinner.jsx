import classes from './LoadingSpinner.module.css'
import clsx from 'clsx'

const LoadingSpinner = ({ text, size = 'medium', ...props }) => {
  return (
    <div className={classes.loadingContainer} {...props}>
      <div className={clsx(
        classes.loadingSpinner,
        classes[size]
      )} />
      <p>{text}</p>
    </div>
  )
}

export default LoadingSpinner