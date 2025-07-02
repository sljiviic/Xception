import { create } from 'zustand'
import { taskUserApi } from '../api/taskUserApi'

export const useTaskUserStore = create((set, get) => ({
  tasksUser: { items: [], count: 0 },
  isFetchingTasksUser: false,

  fetchTasksUser: async (userId, params) => {
    if (get().isFetchingTasksUser) return

    set({ isFetchingTasksUser: true })
    try {
      const tasksUser = await taskUserApi.getAll(userId, params)
      set({
        tasksUser,
        isFetchingTasksUser: false
      })
    } catch (error) {
      set({ isFetchingTasksUser: false })
      throw error
    }
  },

  fetchById: async (id) => {
    set({ isFetchingTasksUser: true })
    try {
      const userTask = await taskUserApi.getById(id)
      set({ isFetchingTasksUser: false })
      return userTask
    } catch (error) {
      set({ isFetchingTasksUser: false })
      throw error
    }
  },

  completeTask: async (userId, taskUserData) => {
    const completedTask = await taskUserApi.complete(userId, taskUserData)
    set(state => {
      const exists = state.tasksUser.items.some(tu => tu.id === completedTask.id)

      return {
        tasksUser: {
          items: exists
            ? state.tasksUser.items.map(tu => tu.id === completedTask.id ? completedTask : tu)
            : [...state.tasksUser.items, completedTask],
          count: exists ? state.tasksUser.count : state.tasksUser.count + 1
        }
      }
    })
    return completedTask
  },

  deleteTaskUser: async (id) => {
    await taskUserApi.delete(id)
    set(state => ({
      tasksUser: {
        items: state.tasksUser.items.filter(tu => tu.id !== id),
        count: Math.max(0, state.tasksUser.count - 1)
      }
    }))
  }
}))