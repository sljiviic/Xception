import { create } from "zustand"
import { levelApi } from "../api/levelApi"

export const useLevelStore = create((set, get) => ({
  levels: { items: [], count: 0 },
  isFetchingLevels: false,

  fetchLevels: async (params) => {
    if (get().isFetchingLevels) return

    set({ isFetchingLevels: true })
    try {
      const levels = await levelApi.getLevels(params)
      set({
        levels,
        isFetchingLevels: false
      })
    } catch (error) {
      set({ isFetchingLevels: false })
      throw error
    }
  },

  fetchById: async (id) => {
    set({ isFetchingLevels: true })
    try {
      const level = await levelApi.getById(id)
      set({ isFetchingLevels: false })
      return level
    } catch (error) {
      set({ isFetchingLevels: false })
      throw error
    }
  },

  saveLevel: async (levelData) => {
    const savedLevel = await levelApi.save(levelData)
    set(state => {
      const exists = state.levels.items.some(l => l.id === savedLevel.id)

      return {
        levels: {
          items: exists
            ? state.levels.items.map(l => l.id === savedLevel.id ? savedLevel : l)
            : [...state.levels.items, savedLevel],
          count: exists ? state.levels.count : state.levels.count + 1
        }
      }
    })
    return savedLevel
  },

  deleteLevel: async (id) => {
    await levelApi.delete(id)
    set(state => ({
      levels: {
        items: state.levels.items.filter(l => l.id !== id),
        count: Math.max(0, state.levels.count - 1)
      }
    }))
  }
}))