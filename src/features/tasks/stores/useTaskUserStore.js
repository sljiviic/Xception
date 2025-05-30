import { create } from 'zustand'
import { taskUserApi } from '../api/taskUserApi'

export const useTaskUserStore = create((set, get) => ({
  userTasks: [],
  completedTasks: new Set(),
  isFetchingUserTasks: false,


  fetchUserTasks: async (query = '') => {
    if (get().isFetchingUserTasks) return

    set({ isFetchingUserTasks: true })
    try {
      const userTasks = await taskUserApi.getAll(query)
      const completed = new Set(
        userTasks
          .filter(tu => tu.status === 'COMPLETED')
          .map(tu => tu.id)
      )
      set({
        userTasks,
        completedTasks: completed,
        isFetchingUserTasks: false
      })
    } catch (error) {
      set({ isFetchingUserTasks: false })
      throw error
    }
  },

  createUserTask: async (taskUserData) => {
    const newUserTask = await taskUserApi.create(taskUserData)
    set(state => ({
      userTasks: [...state.userTasks, newUserTask]
    }))
    return newUserTask
  },

  updateUserTask: async (taskUserId, taskUserData) => {
    const updatedUserTask = await taskUserApi.update(taskUserId, taskUserData)

    set(state => {
      const completed = new Set(state.completedTasks)
      if (updatedUserTask.status === 'COMPLETED') {
        completed.add(taskUserId)
      } else {
        completed.delete(taskUserId)
      }
      return {
        userTasks: state.userTasks.map(tu => tu.id === taskUserId ? updatedUserTask : tu),
        completedTasks: completed
      }
    })
    return updatedUserTask
  },

  deleteUserTask: async (taskUserId) => {
    await taskUserApi.delete(taskUserId)
    set(state => {
      const completed = new Set(state.completedTasks)
      completed.delete(taskUserId)
      return {
        userTasks: state.userTasks.filter(tu => tu.id !== taskUserId),
        completedTasks: completed
      }
    })
  },

  getIsTaskCompleted: (taskUserId) => {
    return get().completedTasks.has(taskUserId)
  }
}))