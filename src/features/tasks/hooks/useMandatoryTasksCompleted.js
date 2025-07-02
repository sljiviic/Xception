import { useEffect, useMemo } from 'react'
import { useTasks } from './useTasks'
import { useTasksUser } from './useTasksUser'

export const useMandatoryTasksCompleted = () => {
  const { fetchTasks, mandatoryTasks, isFetchingTasks } = useTasks()
  const { tasksUser, fetchTasksUser, isFetchingTasksUser } = useTasksUser()

  useEffect(() => {
    fetchTasks()
    fetchTasksUser()
  }, [fetchTasks, fetchTasksUser])

  const areMandatoryCompleted = useMemo(() => {
    if (isFetchingTasks || isFetchingTasksUser || !mandatoryTasks.length) return false

    return mandatoryTasks.every(mt => tasksUser.some(tu => tu.taskId === mt.id && tu.end))
  }, [mandatoryTasks, isFetchingTasks, tasksUser, isFetchingTasksUser])

  return areMandatoryCompleted
}