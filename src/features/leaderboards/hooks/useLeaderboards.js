import { useCallback } from 'react'
import { useLeaderboardStore } from '../stores/useLeaderboardStore'

export const useLeaderboards = () => {
  const leaderboard = useLeaderboardStore(state => state.leaderboard)
  const userPosition = useLeaderboardStore(state => state.userPosition)
  const isLoading = useLeaderboardStore(state => state.isLoading)
  const fetchLeaderboard = useLeaderboardStore(state => state.fetchLeaderboard)

  const handleFetchLeaderboard = useCallback(async (period) => {
    try {
      await fetchLeaderboard(period)
    } catch (error) {
      console.error('Fetching leaderboard failed:', error)
    }
  }, [fetchLeaderboard])

  return {
    leaderboard,
    userPosition,
    isLoading,
    fetchLeaderboard: handleFetchLeaderboard
  }
}