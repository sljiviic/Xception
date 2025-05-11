import axios from 'axios'

const taskUserAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/taskuser',
  withCredentials: true,
})

export const taskUserApi = {
  // Get all taskUsers (with an optional query param)
  getAll: async (query = '') => {
    const response = await taskUserAxios.get(query ? `?${query}` : '')
    return response.data
  },

  // Get a specific taskUser by ID
  getById: async (taskUserId) => {
    const response = await taskUserAxios.get(`/${taskUserId}`)
    return response.data
  },

  // Create a taskUser (user starts or claims a task)
  create: async (taskUserData) => {
    const response = await taskUserAxios.post('/', taskUserData)
    return response.data
  },

  // Update a taskUser (mark as completed)
  update: async (taskUserId, taskUserData) => {
    const response = await taskUserAxios.put(`/${taskUserId}`, taskUserData)
    return response.data
  },

  // Delete a taskUser
  delete: async (taskUserId) => {
    const response = await taskUserAxios.delete(`/${taskUserId}`)
    return response.data
  }
}