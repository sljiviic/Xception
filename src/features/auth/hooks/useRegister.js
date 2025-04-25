import { useAuthStore } from '../stores/useAuthStore'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const register = useAuthStore((state) => state.register)
  const navigate = useNavigate()

  const handleRegister = useCallback(
    async (userData) => {
      try {
        await register(userData)
        navigate('/', { replace: true })
      } catch (error) {
        console.error(error)
      }
    },
    [register, navigate]
  )

  return {
    register: handleRegister,
  }
}