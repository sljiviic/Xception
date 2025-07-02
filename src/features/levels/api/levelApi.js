import levelAxios from '@/lib/api/instances/levelAxios'

export const levelApi = {
  getLevels: async (params = {}) => {
    const response = await levelAxios.get('/', {
      params,
      paramsSerializer: {
        indexes: null
      }
    })
    return response.data
  },

  getById: async (id) => {
    const response = await levelAxios.get(`/${id}`)
    return response.data
  },

  save: async (levelData) => {
    const response = await levelAxios.post('/', levelData)
    return response.data
  },

  delete: async (id) => {
    await levelAxios.delete(`/${id}`)
  },
}