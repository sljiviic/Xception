import axios from 'axios'

const userLevelAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/userlevel',
  withCredentials: true,
})

export const userLevelApi = {
  // Get the current user level
  getLevel: async () => {
    const response = await userLevelAxios.get('/')
    return response.data
  },

  // Get all levels
  getAllLevels: async (query = '') => {
    const response = await userLevelAxios.get(`?${query}`)
    return response.data
  }
}