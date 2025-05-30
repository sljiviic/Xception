import axios from 'axios'

const giveawayAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/giveaway',
  withCredentials: true,
})

export const giveawayApi = {
  getAll: async (query = '') => {
    const response = await giveawayAxios.get(query)
    return response.data
  },

  getById: async (id) => {
    const response = await giveawayAxios.get(`/${id}`)
    return response.data
  },

  create: async (giveawayData) => {
    const response = await giveawayAxios.post('/', giveawayData)
    return response.data
  },

  update: async (id, giveawayData) => {
    const response = await giveawayAxios.put(`/${id}`, giveawayData)
    return response.data
  },

  delete: async (id) => {
    await giveawayAxios.delete(`/${id}`)
  },

  getActive: async () => {
    const response = await giveawayAxios.get('/active')
    return response.data
  },

  getInactive: async () => {
    const response = await giveawayAxios.get('/inactive')
    return response.data
  },

  // Fetch the amount of gathered tickets for a SPECIAL giveaway
  getSpecialProgress: async () => {
    const response = await giveawayAxios.get('/special-progress')
    return response.data
  }
}