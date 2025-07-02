import giveawayAxios from '@/lib/api/instances/giveawayAxios'

export const giveawayApi = {
  getAll: async (params = {}) => {
    const response = await giveawayAxios.get('', {
      params,
      paramsSerializer: {
        indexes: null
      }
    })
    return response.data
  },

  getById: async (id) => {
    const response = await giveawayAxios.get(`/${id}`)
    return response.data
  },

  save: async (giveawayData) => {
    const response = await giveawayAxios.post('/', giveawayData)
    return response.data
  },

  delete: async (id) => {
    await giveawayAxios.delete(`/${id}`)
  },
}