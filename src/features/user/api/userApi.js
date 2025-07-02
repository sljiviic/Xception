import userAxios from '@/lib/api/instances/userAxios'

export const userApi = {
  getAll: async (params = {}) => {
    const response = await userAxios.get('/', {
      params,
      paramsSerializer: {
        indexes: null
      }
    })
    return response.data
  },

  getById: async (id) => {
    const response = await userAxios.get(`/${id}`)
    return response.data
  },

  save: async (id, userData) => {
    const response = await userAxios.post('/', { id, ...userData })
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

  delete: async (id) => {
    await userAxios.delete(`/${id}`)
  },
}