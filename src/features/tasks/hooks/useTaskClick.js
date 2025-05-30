import { useCallback, useRef, useEffect, useState } from 'react'
import { useTaskUserStore } from '../stores/useTaskUserStore'
import { useTaskCompletion } from './useTaskCompletion'
import { useTaskTimerStore } from '../stores/useTaskTimerStore'

export const useTaskClick = (task) => {
  const createUserTask = useTaskUserStore(state => state.createUserTask)
  const getIsExpired = useTaskTimerStore(state => state.getIsExpired)
  const completeUserTask = useTaskCompletion()
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
      const taskUser = await createUserTask({
        taskId: task.id,
        status: 'PENDING'
      })

      // Schedule completion
      const timer = setTimeout(async () => {
        await completeUserTask(taskUser)
        setIsLoading(false)
      }, 60000)

      pendingCompletionRef.current = { taskUser, timer }
    } catch (error) {
      console.error('Task click failed:', error)
    } finally {
      setIsLoading(false)
    }

  },
    [completeUserTask, createUserTask, getIsExpired, task, isLoading]
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