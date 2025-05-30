import { useMemo } from 'react'
import { useTaskUserStore } from '../stores/useTaskUserStore'
import { useTaskTimerStore } from '../stores/useTaskTimerStore'
import { useUserLevel } from '@/features/user'

export const useTaskStatus = (task) => {
  const userTasks = useTaskUserStore(state => state.userTasks)
  const getIsExpired = useTaskTimerStore(state => state.getIsExpired)
  const getTimeLeft = useTaskTimerStore(state => state.getTimeLeft)
  const { calculateRewardBonus } = useUserLevel()

  return useMemo(() => {
    const validTaskTypes = ['mandatory', 'daily']

    if (!task?.type || !validTaskTypes.includes(task.type)) {
      return {
        type: 'error',
        content: 'Invalid task type',
        isCompleted: false,
        reward: null
      }
    }

    // Calculate reward
    const reward = task.type === 'daily'
      ? calculateRewardBonus(task.baseReward)
      : task.baseReward
    if (!reward) {
      return {
        type: 'error',
        content: 'Reward calculation failed',
        isCompleted: false,
        reward: null
      }
    }

    // Mandatory tasks
    if (task.type === 'mandatory') {
      const userTask = userTasks.find(ut => ut.taskId === task.id)
      const isCompleted = userTask?.status === 'COMPLETED'

      return {
        type: isCompleted ? 'check' : 'reward',
        content: isCompleted ? null : reward,
        isCompleted,
        reward
      }
    }

    // Daily tasks
    if (task.type === 'daily') {
      const isExpired = getIsExpired(task.id)
      const timeLeft = getTimeLeft(task.id)
      const isCompleted = !isExpired

      return {
        type: isExpired ? 'reward' : 'countdown',
        content: isExpired ? reward : timeLeft,
        isCompleted,
        reward,
      }
    }

    return {
      type: 'error',
      content: 'Unknown task state',
      isCompleted: false,
      reward: null
    }
  }, [task, userTasks, getIsExpired, getTimeLeft, calculateRewardBonus])
}