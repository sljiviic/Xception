import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTaskStore } from '../stores/useTaskStore'
import { useTaskTimerStore } from '../stores/useTaskTimerStore'
import { useTasksUser } from './useTasksUser'

export const useTaskCompletion = () => {
  const startTimer = useTaskTimerStore(state => state.startTimer)

  const { completeTask } = useTasksUser()

  const completeTaskUser = useCallback(async (taskUser) => {
    try {
      if (!taskUser?.id) {
        throw new Error('Invalid task user data')
      }

      const completedAt = new Date()
      const updatedTaskUser = await completeTask({
        taskId: taskUser.id,
        end: completedAt,
      })

      const task = await useTaskStore.getState().getById(updatedTaskUser.taskId)
      if (!task) {
        throw new Error('Associated task not found')
      }

      // Start the timer if daily
      if (task.type === 'daily') {
        startTimer(task.id, completedAt)
        toast.success('Task complete. Keep it up!')
      }
    } catch (error) {
      console.error('Task completion failed:', error)
      toast.error("Oops! Couldn't mark the task as complete.")
    }
  },
    [completeTask, startTimer]
  )

  return completeTaskUser
}