import { create } from 'zustand'
import { taskApi } from '../api/taskApi'

export const useTaskStore = create((set) => ({
  tasks: [], //This is ment be an array of objects (tasks)
  isLoading: false,
  error: null,

  fetchTasks: async (query = '') => {
    if (typeof query !== 'string') {
      set({ error: new Error('Invalid query parameter') })
      return
    }

    set({ isLoading: true, error: null })
    try {
      const data = await taskApi.getAll(query)
      set({ tasks: data })
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to fetch tasks'),
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  getTaskById: async (taskId) => {
    set({ isLoading: true, error: null })
    try {
      const data = await taskApi.getById(taskId)
      return data
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to fetch the task')
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  createTask: async (taskData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await taskApi.create(taskData)
      set(state => ({
        tasks: [...state.tasks, data]
      }))
      return data
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Task creation failed')
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  updateTask: async (taskId, taskData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await taskApi.update(taskId, taskData)
      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === taskId ? data : task
        )
      }))
      return data
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Task update failed'),
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  deleteTask: async (taskId) => {
    set({ isLoading: true, error: null })
    try {
      await taskApi.delete(taskId)
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Task deletion failed')
      })
      throw error
    } finally {
      set({ isLoading: false })
    }
  }
}))