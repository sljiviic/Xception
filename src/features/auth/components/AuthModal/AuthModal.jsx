import classes from './AuthModal.module.css'
// import { useState } from "react"
import { useAuthStore } from '../../stores/useAuthStore'
import Modal from "@/components/ui/Modal/Modal"
import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import googleIcon from '../../assets/google.svg'
import steamIcon from '../../assets/steam.svg'


const AuthModal = ({
  isOpen,
  onClose,
  defaultView = 'login',
}) => {
  // const [currentView, setCurrentView] = useState(defaultView)
  const error = useAuthStore((state) => state.error)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={defaultView === 'login' ? 'Login' : 'Register'}
      error={error?.message}
      footer={
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
      }
    >
      {defaultView === 'login' ? <LoginForm /> : <RegisterForm />}
    </Modal>
  )

}

export default AuthModal