import { create } from 'zustand'
import { taskUserApi } from '../api/taskUserApi'

export const useTaskUserStore = create((set, get) => ({
  userTasks: [], //This is ment be an array of objects (userTasks)
  completedTasks: new Set(), //Set of IDs
  isLoading: false,
  error: null,

  fetchUserTasks: async (query = '') => {
    if (typeof query !== 'string') {
      set({ error: new Error('Invalid query parameter') })
      return
    }

    set({ isLoading: true, error: null })
    try {
      const data = await taskUserApi.getAll(query)
      const completed = new Set(
        data
          .filter(tu => tu.status === 'COMPLETED')
          .map(tu => tu.id)
      )
      set({
        userTasks: data,
        completedTasks: completed
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to fetch user tasks')
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  getUserTaskById: async (taskUserId) => {
    set({ isLoading: true, error: null })
    try {
      const data = await taskUserApi.getById(taskUserId)
      return data
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to fetch the user task')
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  createUserTask: async (taskUserData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await taskUserApi.create(taskUserData)
      set(state => ({
        userTasks: [...state.userTasks, data]
      }))

      return data
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to start the user task')
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  updateUserTask: async (taskUserId, taskUserData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await taskUserApi.update(taskUserId, taskUserData)

      set(state => {
        const completed = new Set(state.completedTasks)
        if (data.status === 'COMPLETED') {
          completed.add(taskUserId)
        } else {
          completed.delete(taskUserId)
        }
        return {
          userTasks: state.userTasks.map(tu => tu.id === taskUserId ? data : tu),
          completedTasks: completed
        }
      })

      return data
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Task completion failed')
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  deleteUserTask: async (taskUserId) => {
    set({ isLoading: true, error: null })
    try {
      await taskUserApi.delete(taskUserId)
      set(state => {
        const completed = new Set(state.completedTasks)
        completed.delete(taskUserId)
        return {
          userTasks: state.userTasks.filter(tu => tu.id !== taskUserId),
          completedTasks: completed
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('User task deletion failed')
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  getIsTaskCompleted: (taskUserId) => {
    return get().completedTasks.has(taskUserId)
  }
}))