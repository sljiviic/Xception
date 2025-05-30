import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTaskUserStore } from '../stores/useTaskUserStore'
import { useTaskTimerStore } from '../stores/useTaskTimerStore'
import { useUserLevel } from '@/features/user'
import { useTickets } from '@/features/tickets'
import { taskApi } from '../api/taskApi'

export const useTaskCompletion = () => {
  const updateUserTask = useTaskUserStore(state => state.updateUserTask)
  const startTimer = useTaskTimerStore(state => state.startTimer)
  const { calculateRewardBonus } = useUserLevel()
  const { awardTickets } = useTickets()

  const completeUserTask = useCallback(async (taskUser) => {
    try {
      if (!taskUser?.id) {
        throw new Error('Invalid task user data')
      }

      const completedAt = new Date()
      const updatedUserTask = await updateUserTask(taskUser.id, {
        status: 'COMPLETED',
        completedAt
      })

      const task = await taskApi.getById(updatedUserTask.taskId)
      if (!task) {
        throw new Error('Associated task not found')
      }

      // Award mandatory
      await awardTickets(task.baseReward)

      // Award daily and start the timer
      if (task.type === 'daily') {
        const reward = calculateRewardBonus(task.baseReward)
        if (!reward?.total) {
          throw new Error('Invalid reward calculation')
        }

        await awardTickets(reward.total)
        startTimer(task.id, completedAt)
        toast.success('Task complete. Keep it up!')
      }
    } catch (error) {
      console.error('Task completion failed:', error)
      toast.error("Oops! Couldn't mark the task as complete.")
    }
  },
    [updateUserTask, calculateRewardBonus, awardTickets, startTimer]
  )

  return completeUserTask
}