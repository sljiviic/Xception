import operationAxios from '@/lib/api/instances/operationAxios'

export const taskApi = {
  getAll: async (params = {}) => {
    const response = await operationAxios.get('/', {
      params,
      paramsSerializer: {
        indexes: null
      }
    })
    return response.data
  },

  getById: async (id) => {
    const response = await operationAxios.get(`/${id}`)
    return response.data
  },

  save: async (taskData) => {
    const response = await operationAxios.post('/', taskData)
    return response.data
  },

  delete: async (id) => {
    await operationAxios.delete(`/${id}`)
  }
}