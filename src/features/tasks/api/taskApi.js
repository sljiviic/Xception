import axios from 'axios'

const taskAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/task',
  withCredentials: true,
})

export const taskApi = {
  // Get all tasks (with an optional query param)
  getAll: async (query = '') => {
    const response = await taskAxios.get(query ? `?${query}` : '/')
    return response.data
  },

  // Get a task by ID
  getById: async (taskId) => {
    const response = await taskAxios.get(`/${taskId}`);
    return response.data
  },

  // Create a new task
  create: async (taskData) => {
    const response = await taskAxios.post('/', taskData);
    return response.data
  },

  // Update an existing task
  update: async (taskId, taskData) => {
    const response = await taskAxios.put(`/${taskId}`, taskData);
    return response.data
  },

  // Delete a task
  delete: async (taskId) => {
    const response = await taskAxios.delete(`/${taskId}`);
    return response.data
  }
}