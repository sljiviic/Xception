import bonusAxios from '@/lib/api/instances/bonusAxios'

export const bonusApi = {
  getAll: async (params = {}) => {
    const response = await bonusAxios.get('', {
      params,
      paramsSerializer: {
        indexes: null
      }
    })
    return response.data
  },

  getById: async (id) => {
    const response = await bonusAxios.get(`/${id}`)
    return response.data
  },

  save: async (bonusData) => {
    const response = await bonusAxios.post('', bonusData)
    return response.data
  },

  delete: async (id) => {
    await bonusAxios.delete(`/${id}`)
  }
}