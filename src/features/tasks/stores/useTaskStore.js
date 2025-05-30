import { create } from 'zustand'
import { taskApi } from '../api/taskApi'

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isFetchingTasks: false,

  fetchTasks: async (query = '') => {
    if (get().isFetchingTasks) return

    set({ isFetchingTasks: true })
    try {
      const tasks = await taskApi.getAll(query)
      set({
        tasks,
        isFetchingTasks: false
      })
    } catch (error) {
      set({ isFetchingTasks: false })
      throw error
    }
  },

  createTask: async (taskData) => {
    const newTask = await taskApi.create(taskData)
    set(state => ({
      tasks: [...state.tasks, newTask]
    }))
    return newTask
  },

  updateTask: async (taskId, taskData) => {
    const updatedTask = await taskApi.update(taskId, taskData)
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId ? updatedTask : task
      )
    }))
    return updatedTask
  },

  deleteTask: async (taskId) => {
    await taskApi.delete(taskId)
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== taskId)
    }))
  }
}))