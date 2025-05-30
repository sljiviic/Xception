import classes from './AuthModal.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore'
import { useUiStore } from '@/stores/useUiStore'
import Modal from '@/components/ui/Modal/Modal'
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'
import googleIcon from '@/assets/icons/google.svg'
import steamIcon from '@/assets/icons/steam.svg'

const AuthModal = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const authModal = useUiStore(state => state.authModal)
  const toggleDefaultView = useUiStore(state => state.toggleDefaultView)
  const closeAuthModal = useUiStore(state => state.closeAuthModal)
  const error = useAuthStore(state => state.error)
  const clearError = useAuthStore(state => state.clearError)

  const handleSuccess = () => {
    const redirectPath = authModal.redirectPath || location.state?.from || '/'
    navigate(redirectPath)
    closeAuthModal()
    clearError()
  }

  return (
    <Modal
      isOpen={authModal.isOpen}
      onClose={() => {
        closeAuthModal()
        clearError()
      }}
      title={authModal.defaultView === 'login' ? 'Login' : 'Register'}
      error={error?.response?.data?.message || error?.message}
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
          <button
            className={classes.changeViewButton}
            onClick={() => toggleDefaultView()}
            type="button"
          >
            {authModal.defaultView === 'login'
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      }
    >
      {authModal.defaultView === 'login' ? (
        <LoginForm onSuccess={handleSuccess} />
      ) : (
        <RegisterForm onSuccess={handleSuccess} />
      )}
    </Modal>
  )

}

export default AuthModal