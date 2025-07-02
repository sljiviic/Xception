import { useCallback } from 'react'
import { useTaskUserStore } from '../stores/useTaskUserStore'
import { useAuthStore } from '@/features/auth'

export const useTasksUser = () => {
  // USER ID
  const userId = useAuthStore.getState().user?.id

  // Store states
  const tasksUser = useTaskUserStore(state => state.tasksUser)

  // Store actions
  const fetchTasksUser = useTaskUserStore(state => state.fetchTasksUser)
  const fetchById = useTaskUserStore(state => state.fetchById)
  const completeTask = useTaskUserStore(state => state.completeTask)
  const deleteTaskUser = useTaskUserStore(state => state.deleteTaskUser)

  // Store loading states
  const isFetchingTasksUser = useTaskUserStore(state => state.isFetchingTasksUser)

  const handleFetchTasksUser = useCallback(async (params) => {
    try {
      if (userId === undefined || userId === null) return
      await fetchTasksUser(userId, params)
    } catch (error) {
      console.error('Fetching user tasks failed:', error)
    }
  }, [fetchTasksUser, userId])

  const handleFetchById = useCallback(async (id) => {
    try {
      return await fetchById(id)
    } catch (error) {
      console.error('Fetching user task by ID failed:', error)
    }
  }, [fetchById])

  const handleCompleteTask = useCallback(async (taskUserData) => {
    try {
      if (userId === undefined || userId === null) return
      return await completeTask(userId, taskUserData)
    } catch (error) {
      console.error('Completing task failed:', error)
    }
  }, [completeTask, userId])

  const handleDeleteTaskUser = useCallback(async (id) => {
    try {
      await deleteTaskUser(id)
    } catch (error) {
      console.error('Deleting user task failed:', error)
    }
  }, [deleteTaskUser])

  return {
    tasksUser,
    fetchTasksUser: handleFetchTasksUser,
    fetchById: handleFetchById,
    completeTask: handleCompleteTask,
    deleteTaskUser: handleDeleteTaskUser,
    isFetchingTasksUser
  }
}