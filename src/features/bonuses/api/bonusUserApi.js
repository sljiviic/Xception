import bonusUserAxios from '@/lib/api/instances/bonusUserAxios'

export const bonusUserApi = {
  getAll: async (userId, params = {}) => {
    const response = await bonusUserAxios.get('', {
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
    const response = await bonusUserAxios.get(`/${id}`)
    return response.data
  },

  claim: async (userId, bonusId) => {
    const response = await bonusUserAxios.post('/', { userId, bonusId })
    return response.data
  },

  delete: async (id) => {
    await bonusUserAxios.delete(`/${id}`)
  }
}