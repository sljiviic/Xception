// import { useUserStore } from '@/features/user'

/*
Custom hook for calculating task rewards based on user level

Features:
- Handles additive bonuses for levels 1-5 (+1 to +5 tickets)
- Handles multiplicative bonuses for levels 6-9 (2x to 10x)
*/
export const useTaskRewards = () => {
  // const { userLevel } = useUserStore()
  const userLevel = 3

  // Calculates the actual reward after applying level bonuses
  const calculateTaskReward = (task) => {
    const baseReward = task.baseReward

    if (!userLevel || !baseReward) {
      return
    }

    if (task.type !== 'daily') {
      return {
        total: baseReward,
        base: baseReward,
        bonus: 0
      }
    }

    // Additive phase (Levels 1-5)
    if (userLevel <= 5) {
      const bonus = userLevel
      return {
        total: baseReward + bonus,
        base: baseReward,
        bonus,
      }
    }

    // Multiplicative phase (Levels 6-9)
    const multiplier = [null, null, null, null, null, null, 2, 3, 5, 10][userLevel]
    const total = baseReward * multiplier
    return {
      total,
      base: baseReward,
      bonus: total - baseReward,
    }
  }

  return calculateTaskReward
}