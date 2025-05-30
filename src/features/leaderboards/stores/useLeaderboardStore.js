import { create } from 'zustand'
import { leaderboardApi } from '../api/leaderboardApi'

export const useLeaderboardStore = create((set, get) => ({
  leaderboard: [],
  userPosition: null,
  isLoading: false,

  fetchLeaderboard: async (period = 'current') => {
    if (get().isLoading) return

    set({ isLoading: true })
    try {
      const data = await leaderboardApi.getLeaderboard(period)
      set({
        leaderboard: data.topUsers,
        userPosition: {
          position: data.rank,
          username: data.username,
          wager: data.wager,
          reward: data.reward
        },
        isLoading: false
      })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  }
}))