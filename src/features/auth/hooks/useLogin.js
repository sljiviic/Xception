import { useAuthStore } from '../stores/useAuthStore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (userData) => {
      try {
        await login(userData)
        navigate('/', { replace: true })
      } catch (error) {
        console.error(error)
      }
    },
    [login, navigate]
  )

  const handleLogout = useCallback(
    async () => {
      try {
        await logout()
      } catch (error) {
        console.error(error)
      }
    },
    [logout]
  )

  return {
    login: handleLogin,
    logout: handleLogout,
  }
}