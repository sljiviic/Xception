import { useCallback } from 'react'
import { useTaskUserStore } from '../stores/useTaskUserStore'
import { useTaskStore } from '../stores/useTaskStore'
import { useTaskTimerStore } from '../stores/useTaskTimerStore'
import { useTaskRewards } from './useTaskRewards'
import { useTickets } from '@/features/tickets'

/*
A custom hook that updates the taskUser state to 'COMPLETED',
calculates the task reward, and adds tickets to the user's balance
*/

export const useTaskCompletion = () => {
  const updateUserTask = useTaskUserStore(state => state.updateUserTask)
  const getTaskById = useTaskStore(state => state.getTaskById)
  const startTimer = useTaskTimerStore(state => state.startTimer)
  const calculateTaskReward = useTaskRewards()
  const { awardTickets } = useTickets() // Method to add tickets to user's balance


  const completeUserTask = useCallback(async (taskUser) => {
    try {
      // Validation
      if (!taskUser?.id) {
        throw new Error('Invalid task user data');
      }

      // Updates
      const completedAt = new Date();
      const updatedUserTask = await updateUserTask(taskUser.id, {
        status: 'COMPLETED',
        completedAt
      })


      const task = await getTaskById(updatedUserTask.taskId)
      if (!task) {
        throw new Error('Associated task not found');
      }

      const reward = calculateTaskReward(task)
      if (!reward?.total) {
        throw new Error('Invalid reward calculation');
      }

      await awardTickets(reward.total)

      // Start timer if daily task
      if (task.type === 'daily') {
        startTimer(task.id, completedAt)
      }
    } catch (error) {
      console.error('Task completion failed:', error)
    }
  },
    [updateUserTask, getTaskById, calculateTaskReward, awardTickets, startTimer]
  )

  return completeUserTask
}