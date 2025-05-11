import { useEffect, useMemo } from "react"
import { useTaskStore } from "../stores/useTaskStore"

// This hook fetches all tasks and separates daily and mandatory.

export const useTasks = (query = '') => {
  const fetchTasks = useTaskStore(state => state.fetchTasks)
  const tasks = useTaskStore(state => state.tasks)
  const isLoading = useTaskStore(state => state.isLoading)
  const error = useTaskStore(state => state.error)

  useEffect(() => {
    fetchTasks(query)
  }, [fetchTasks, query])

  // Task separation
  const { dailyTasks, mandatoryTasks } = useMemo(() => ({
    dailyTasks: tasks.filter(task => task.type === 'daily'),
    mandatoryTasks: tasks.filter(task => task.type === 'mandatory')
  }), [tasks])

  return {
    tasks,
    daily: dailyTasks,
    mandatory: mandatoryTasks,
    isLoading,
    error
  }
}