import operationUserAxios from '@/lib/api/instances/operationUserAxios'

export const taskUserApi = {
  getAll: async (userId, params = {}) => {
    const response = await operationUserAxios.get('', {
      params: {
        userId,
        ...params
      },
      paramsSerializer: {
        indexes: null
      }
    })
    return response.data
  },

  getById: async (id) => {
    const response = await operationUserAxios.get(`/${id}`)
    return response.data
  },

  complete: async (userId, taskUserData) => {
    const response = await operationUserAxios.post('/', { userId, ...taskUserData })
    return response.data
  },

  delete: async (id) => {
    await operationUserAxios.delete(`/${id}`)
  }
}