import { create } from 'zustand'
import { taskApi } from '../api/taskApi'

export const useTaskStore = create((set, get) => ({
  tasks: { items: [], count: 0 },
  isFetchingTasks: false,

  fetchTasks: async (params) => {
    if (get().isFetchingTasks) return

    set({ isFetchingTasks: true })
    try {
      const tasks = await taskApi.getAll(params)
      set({
        tasks,
        isFetchingTasks: false
      })
    } catch (error) {
      set({ isFetchingTasks: false })
      throw error
    }
  },

  fetchById: async (id) => {
    set({ isFetchingTasks: true })
    try {
      const task = await taskApi.getById(id)
      set({ isFetchingTasks: false })
      return task
    } catch (error) {
      set({ isFetchingTasks: false })
      throw error
    }
  },

  saveTask: async (taskData) => {
    const savedTask = await taskApi.save(taskData)
    set(state => {
      const exists = state.tasks.items.some(t => t.id === savedTask.id)

      return {
        tasks: {
          items: exists
            ? state.tasks.items.map(t => t.id === savedTask.id ? savedTask : t)
            : [...state.tasks.items, savedTask],
          count: exists ? state.tasks.count : state.tasks.count + 1
        }
      }
    })
    return savedTask
  },

  deleteTask: async (id) => {
    await taskApi.delete(id)
    set(state => ({
      tasks: {
        items: state.tasks.items.filter(t => t.id !== id),
        count: Math.max(0, state.tasks.count - 1)
      }
    }))
  }
}))