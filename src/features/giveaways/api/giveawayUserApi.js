import giveawayUserAxios from '@/lib/api/instances/giveawayUserAxios'

export const giveawayUserApi = {
  getEntries: async (userId, params = {}) => {
    const response = await giveawayUserAxios.get('', {
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
    const response = await giveawayUserAxios.get(`/${id}`)
    return response.data
  },

  join: async (userId, giveawayUserData) => {
    const response = await giveawayUserAxios.post('/', { userId, ...giveawayUserData })
    return response.data
  },

  delete: async (id) => {
    await giveawayUserAxios.delete(`/${id}`)
  },
}