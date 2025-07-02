import { useEffect, useState } from 'react'
import { useTasksUser } from './useTasksUser'
import { useTaskTimerStore } from '../stores/useTaskTimerStore'
import { useLevelBonus } from '@/features/levels'
import { useAuthStore } from '@/features/auth/'

export const useTaskStatus = (task) => {
  // USER
  const user = useAuthStore(state => state.user)

  const { tasksUser, fetchTasksUser } = useTasksUser()

  const startTimer = useTaskTimerStore(state => state.startTimer)
  const getTimeLeft = useTaskTimerStore(state => state.getTimeLeft)
  const [timeLeft, setTimeLeft] = useState(null)

  const taskUser = tasksUser.items.find(tu => tu.taskId === task?.id)
  const completedAt = taskUser?.end
  const levelBonus = useLevelBonus(user?.levelId)

  useEffect(() => {
    fetchTasksUser()
  }, [fetchTasksUser])

  useEffect(() => {
    if (task?.type === 'daily' && completedAt) {
      startTimer(task?.id, completedAt)
      setTimeLeft(getTimeLeft(task?.id))
    }
  }, [task?.id, task?.type, completedAt, startTimer, getTimeLeft])

  const validTaskTypes = ['mandatory', 'daily']
  if (!task?.type || !validTaskTypes.includes(task?.type)) {
    return {
      type: 'error',
      content: 'Invalid task type',
      completedAt: null,
      reward: null
    }
  }

  // Mandatory tasks
  if (task?.type === 'mandatory') return ({
    type: completedAt ? 'check' : 'reward',
    content: completedAt ? null : task?.tickets,
    completedAt,
    reward: { base: task?.tickets, bonus: levelBonus }
  })

  // Daily tasks
  if (task?.type === 'daily') return ({
    type: completedAt ? 'reward' : 'countdown',
    content: completedAt ? task?.tickets : timeLeft,
    completedAt,
    reward: { base: task?.tickets, bonus: levelBonus }
  })

  return {
    type: 'error',
    content: 'Unknown task state',
    isCompleted: false,
    reward: null
  }
}