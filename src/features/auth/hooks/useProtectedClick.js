import { useAuthStore } from '../stores/useAuthStore'
import { useUiStore } from '@/stores/useUiStore'
import { useLocation } from 'react-router-dom'

export const useProtectedClick = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const openAuthModal = useUiStore(state => state.openAuthModal)
  const location = useLocation()

  const handleProtectedClick = (callback) => {
    return (e) => {
      if (!isAuthenticated) {
        e?.preventDefault()
        e?.stopPropagation()
        openAuthModal({
          redirectPath: location.pathname
        })
        return
      }
      callback?.(e)
    }
  }

  return handleProtectedClick
}