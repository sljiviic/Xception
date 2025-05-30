import { toast } from 'sonner'
import { useAuthStore } from '../stores/useAuthStore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const user = useAuthStore(state => state.user)
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)
  const isLoading = useAuthStore(state => state.isLoading)
  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (userData) => {
      try {
        await login(userData)
        navigate('/', { replace: true })
        toast.success(`Welcome back ${user.username}!`)
      } catch (error) {
        console.error('Login failed:', error)
        toast.error('Login failed. Please check your credentials.')
      }
    },
    [login, navigate, user]
  )

  const handleLogout = useCallback(
    async () => {
      try {
        await logout()
        toast.success('You have logged out. See you next time!')
      } catch (error) {
        console.error('Logout failed:', error)
        toast.error('Logout failed. Please try again.')
      }
    },
    [logout]
  )

  return {
    login: handleLogin,
    logout: handleLogout,
    isLoading
  }
}