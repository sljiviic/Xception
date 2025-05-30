import classes from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.number}>404</h1>
      <div className={classes.text}>Not Found</div>
    </div>
  )
}

export default NotFoundPage