import axios from 'axios'

const taskAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/task',
  withCredentials: true,
})

export const taskApi = {
  getAll: async (query = '') => {
    const response = await taskAxios.get(query)
    return response.data
  },

  getById: async (id) => {
    const response = await taskAxios.get(`/${id}`)
    return response.data
  },

  create: async (taskData) => {
    const response = await taskAxios.post('/', taskData)
    return response.data
  },

  update: async (id, taskData) => {
    const response = await taskAxios.put(`/${id}`, taskData)
    return response.data
  },

  delete: async (id) => {
    const response = await taskAxios.delete(`/${id}`)
    return response.data
  }
}