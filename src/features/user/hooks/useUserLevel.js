import { useCallback } from 'react'
import { useUserStore } from '../stores/useUserStore'
import { userLevelApi } from '../api/userLevelApi'

export const useUserLevel = () => {
  const userLevel = useUserStore(state => state.userLevel)
  const currentLevel = userLevel?.level || 0

  const calculateRewardBonus = useCallback((baseReward) => {
    if (!userLevel || !baseReward) return {
      base: baseReward || 0,
      bonus: 0,
      total: baseReward || 0
    }

    if (currentLevel <= 5) {
      return {
        base: baseReward,
        bonus: currentLevel,
        total: baseReward + currentLevel
      }
    }

    const multiplier = [null, null, null, null, null, null, 2, 3, 5, 10][currentLevel]
    return {
      base: baseReward,
      bonus: baseReward * multiplier - baseReward,
      total: baseReward * multiplier
    }
  }, [userLevel, currentLevel])

  const refreshUserLevel = useCallback(async () => {
    try {
      return await userLevelApi.getLevel()
    } catch (error) {
      console.error('Failed to refresh user level:', error)
      throw error
    }
  }, [])

  return {
    level: currentLevel,
    levelData: userLevel,
    qualifiesForLargeGiveaways: currentLevel >= 9,
    calculateRewardBonus,
    refreshUserLevel
  }
}