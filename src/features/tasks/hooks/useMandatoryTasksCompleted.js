import { useMemo } from 'react'
import { useTasks } from './useTasks'

export const useMandatoryTasksCompleted = () => {
  const { mandatoryTasks, isFetchingTasks } = useTasks()

  const isAllCompleted = useMemo(() => {
    if (isFetchingTasks || !mandatoryTasks) return false
    if (!mandatoryTasks.length) return false

    return mandatoryTasks.every(task => task.status === 'COMPLETED')
  }, [mandatoryTasks, isFetchingTasks])

  return isAllCompleted
}