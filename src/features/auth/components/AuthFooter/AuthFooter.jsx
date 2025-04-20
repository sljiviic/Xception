import classes from './AuthFooter.module.css'
import googleIcon from '@/assets/icons/google.svg'
import steamIcon from '@/assets/icons/steam.svg'

const AuthFooter = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.divider}></div>
      <div className={classes.icons}>
        <button className={classes.iconButton}>
          <img src={googleIcon} alt='Google' />
        </button>
        <button className={classes.iconButton}>
          <img src={steamIcon} alt='Steam' />
        </button>
      </div>
    </div>
  )
}

export default AuthFooter