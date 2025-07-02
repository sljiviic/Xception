import { useCallback, useRef, useEffect, useState } from 'react'
import { useTaskCompletion } from './useTaskCompletion'
import { useTaskTimerStore } from '../stores/useTaskTimerStore'
import { useTasksUser } from './useTasksUser'

export const useTaskClick = (task) => {
  const getIsExpired = useTaskTimerStore(state => state.getIsExpired)

  const { completeTask } = useTasksUser()
  const completeTaskUser = useTaskCompletion()
  const pendingCompletionRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTaskClick = useCallback(async (e) => {
    e.preventDefault()
    if (isLoading) return

    try {
      if (!task?.id) {
        throw new Error('Invalid task data')
      }

      // Return if the daily task's cooldown is still active
      const isExpired = getIsExpired(task.id)
      if (!isExpired) return

      // Create pending task
      setIsLoading(true)
      const taskUser = await completeTask({
        taskId: task.id,
        start: new Date()
      })

      // Schedule completion (20 sec delay)
      const timer = setTimeout(async () => {
        await completeTaskUser(taskUser)
        setIsLoading(false)
      }, 20000)

      pendingCompletionRef.current = { taskUser, timer }
    } catch (error) {
      console.error('Task click failed:', error)
    } finally {
      setIsLoading(false)
    }

  },
    [completeTaskUser, completeTask, getIsExpired, task, isLoading]
  )

  // Cleanup pending completion on unmount
  useEffect(() => {
    return () => {
      if (pendingCompletionRef.current?.timer) {
        clearTimeout(pendingCompletionRef.current.timer)
      }
    }
  }, [pendingCompletionRef])

  return { handleTaskClick, isLoading }
}