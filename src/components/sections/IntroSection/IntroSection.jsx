import classes from './IntroSection.module.css'
import clsx from 'clsx'

const IntroSection = ({ title, subtitle, className, ...props }) => {
  return (
    <div
      className={clsx(classes.introSection, className)}
      {...props}
    >
      <h1 className={classes.introTitle}>{title}</h1>
      {subtitle && <p className={classes.introSubtitle}>{subtitle}</p>}
      <div className={classes.bgShadow}></div>
    </div>
  )
}

export default IntroSection