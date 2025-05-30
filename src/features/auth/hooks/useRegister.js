import { toast } from 'sonner'
import { useAuthStore } from '../stores/useAuthStore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const register = useAuthStore((state) => state.register)
  const isLoading = useAuthStore((state) => state.isLoading)
  const navigate = useNavigate()

  const handleRegister = useCallback(
    async (userData) => {
      try {
        await register(userData)
        navigate('/', { replace: true })
        toast.success('Account created! Welcome aboard.')
      } catch (error) {
        console.error('Registration failed:', error)
        toast.error('Registration failed. Please try again.')
      }
    },
    [register, navigate]
  )

  return {
    register: handleRegister,
    isLoading
  }
}