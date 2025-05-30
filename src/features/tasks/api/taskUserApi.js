import axios from 'axios'

const taskUserAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/taskuser',
  withCredentials: true,
})

export const taskUserApi = {
  getAll: async (query = '') => {
    const response = await taskUserAxios.get(query)
    return response.data
  },

  getById: async (id) => {
    const response = await taskUserAxios.get(`/${id}`)
    return response.data
  },

  create: async (taskUserData) => {
    const response = await taskUserAxios.post('/', taskUserData)
    return response.data
  },

  update: async (id, taskUserData) => {
    const response = await taskUserAxios.put(`/${id}`, taskUserData)
    return response.data
  },

  delete: async (id) => {
    const response = await taskUserAxios.delete(`/${id}`)
    return response.data
  }
}