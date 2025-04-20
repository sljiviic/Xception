import classes from './SectionBox.module.css'
import clsx from 'clsx'

const SectionBox = ({
  title,
  subtitle,
  children,
  className
}) => {
  const sectionClass = clsx(
    classes.section,
    className
  )

  return (
    <div className={sectionClass}>
      <div className={classes.header}>
        <h2 className={classes.title}>{title}</h2>
        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default SectionBox