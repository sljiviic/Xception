import axios from 'axios'

const bonusAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/bonus',
  withCredentials: true,
})

export const bonusApi = {
  getAll: async (query = '') => {
    const response = await bonusAxios.get(query)
    return response.data
  },

  getById: async (id) => {
    const response = await bonusAxios.get(`/${id}`)
    return response.data
  },

  create: async (bonusData) => {
    const response = await bonusAxios.post('/', bonusData)
    return response.data
  },

  update: async (id, bonusData) => {
    const response = await bonusAxios.put(`/${id}`, bonusData)
    return response.data
  },

  delete: async (id) => {
    await bonusAxios.delete(`/${id}`)
  }
}