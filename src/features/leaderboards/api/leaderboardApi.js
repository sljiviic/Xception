import axios from 'axios'

const leaderboardAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/leaderboard',
  withCredentials: true,
})

export const leaderboardApi = {
  getLeaderboard: async (period = 'current') => {
    const response = await leaderboardAxios.get('/', {
      params: { period }
    })
    return response.data
  }
}