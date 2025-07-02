import { useCallback, useMemo } from 'react'
import { useTaskStore } from '../stores/useTaskStore'

export const useTasks = () => {
  // Store states
  const tasks = useTaskStore(state => state.tasks)

  // Store actions
  const fetchTasks = useTaskStore(state => state.fetchTasks)
  const fetchById = useTaskStore(state => state.fetchById)
  const saveTask = useTaskStore(state => state.saveTask)
  const deleteTask = useTaskStore(state => state.deleteTask)

  // Store loading states
  const isFetchingTasks = useTaskStore(state => state.isFetchingTasks)

  const handleFetchTasks = useCallback(async (params) => {
    try {
      await fetchTasks(params)
    } catch (error) {
      console.error('Fetching tasks failed:', error)
    }
  }, [fetchTasks])

  const handleFetchById = useCallback(async (id) => {
    try {
      return await fetchById(id)
    } catch (error) {
      console.error('Fetching task by ID failed:', error)
    }
  }, [fetchById])

  const handleSaveTask = useCallback(async (taskData) => {
    try {
      return await saveTask(taskData)
    } catch (error) {
      console.error('Creating / Saving task failed:', error)
    }
  }, [saveTask])

  const handleDeleteTask = useCallback(async (id) => {
    try {
      await deleteTask(id)
    } catch (error) {
      console.error('Deleting task failed:', error)
    }
  }, [deleteTask])

  const { dailyTasks, mandatoryTasks } = useMemo(() => {
    if (!(tasks.items instanceof Array) || !tasks.items.length) return {
      dailyTasks: [],
      mandatoryTasks: []
    }
    return {
      dailyTasks: tasks.items.filter(t => t.type === 'daily'),
      mandatoryTasks: tasks.items.filter(t => t.type === 'mandatory')
    }
  }, [tasks])

  return {
    tasks,
    fetchTasks: handleFetchTasks,
    fetchById: handleFetchById,
    saveTask: handleSaveTask,
    deleteTask: handleDeleteTask,
    dailyTasks,
    mandatoryTasks,
    isFetchingTasks
  }
}