import axios from 'axios'

const bonusUserAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/bonususer',
  withCredentials: true,
})

export const bonusUserApi = {
  getAll: async (query = '') => {
    const response = await bonusUserAxios.get(query)
    return response.data
  },

  getById: async (id) => {
    const response = await bonusUserAxios.get(`/${id}`)
    return response.data
  },

  create: async (bonusId) => {
    const response = await bonusUserAxios.post('/', { bonusId })
    return response.data
  },

  update: async (id, bonusUserData) => {
    const response = await bonusUserAxios.put(`/${id}`, bonusUserData)
    return response.data
  },

  delete: async (id) => {
    await bonusUserAxios.delete(`/${id}`)
  }
}