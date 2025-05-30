import { useCallback, useMemo } from 'react'
import { useTaskStore } from '../stores/useTaskStore'

export const useTasks = () => {
  const fetchTasks = useTaskStore(state => state.fetchTasks)
  const tasks = useTaskStore(state => state.tasks)
  const isFetchingTasks = useTaskStore(state => state.isFetchingTasks)

  const handleFetchTasks = useCallback(async (query) => {
    try {
      await fetchTasks(query)
    } catch (error) {
      console.error('Fetching tasks failed:', error)
    }
  }, [fetchTasks])

  const { dailyTasks, mandatoryTasks } = useMemo(() => {
    if (!(tasks instanceof Array) || !tasks.length) return {
      dailyTasks: [],
      mandatoryTasks: []
    }
    return {
      dailyTasks: tasks.filter(task => task.type === 'daily'),
      mandatoryTasks: tasks.filter(task => task.type === 'mandatory')
    }
  }, [tasks])

  return {
    tasks,
    dailyTasks,
    mandatoryTasks,
    isFetchingTasks,
    fetchTasks: handleFetchTasks
  }
}