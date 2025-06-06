import { useAuthStore } from '@/features/auth'

let refreshPromise = null

export const setupAuthInterceptors = (axiosInstance) => {
  // Attaching the access token to the Authorization header
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().accessToken

      if (accessToken) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  /*
    Catch 403 errors (usually because the access token is expired),
    refresh the token, and then retry the original request seamlessly — without user interaction
  */
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      const { status } = error.response || {}

      if (status === 403 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          // Prevent multiple refresh attempts
          refreshPromise = refreshPromise || useAuthStore.getState().refreshToken()
          const newToken = await refreshPromise
          refreshPromise = null

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          useAuthStore.getState().logout()
          // Handling refresh failure
          return Promise.reject(refreshError)
        }
      }
      // Handling non-401 errors
      return Promise.reject(error)
    }
  )
}