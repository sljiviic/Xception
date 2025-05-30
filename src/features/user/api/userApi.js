import axios from 'axios'

const userAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/user',
  withCredentials: true,
})

export const userApi = {
  // Get the current user profile
  getProfile: async () => {
    const response = await userAxios.get('/')
    return response.data
  },

  getUserById: async (userId) => {
    const response = await userAxios.get(`/${userId}`)
    return response.data
  },

  changeEmail: async (email) => {
    const response = await userAxios.put('/email', email)
    return response.data
  },

  changeUsername: async (username) => {
    const response = await userAxios.put('/username', username)
    return response.data
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await userAxios.put('/password', {
      currentPassword,
      newPassword
    })
    return response.data
  },

  deleteAccount: async () => {
    await userAxios.delete('/')
  }
}