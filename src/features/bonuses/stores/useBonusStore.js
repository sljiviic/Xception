import { create } from 'zustand'
import { bonusApi } from '../api/bonusApi'

export const useBonusStore = create((set, get) => ({
  bonuses: { items: [], count: 0 },
  isFetchingBonuses: false,

  fetchBonuses: async (params) => {
    if (get().isFetchingBonuses) return

    set({ isFetchingBonuses: true })
    try {
      const bonuses = await bonusApi.getAll(params)
      set({
        bonuses,
        isFetchingBonuses: false
      })
    } catch (error) {
      set({ isFetchingBonuses: false })
      throw error
    }
  },

  fetchById: async (id) => {
    set({ isFetchingBonuses: true })
    try {
      const bonus = await bonusApi.getById(id)
      set({ isFetchingBonuses: false })
      return bonus
    } catch (error) {
      set({ isFetchingBonuses: false })
      throw error
    }
  },

  saveBonus: async (bonusData) => {
    const savedBonus = await bonusApi.save(bonusData)
    set(state => {
      const exists = state.bonuses.items.some(b => b.id === savedBonus.id)

      return {
        bonuses: {
          items: exists
            ? state.bonuses.items.map(b => b.id === savedBonus.id ? savedBonus : b)
            : [...state.bonuses.items, savedBonus],
          count: exists ? state.bonuses.count : state.bonuses.count + 1
        }
      }
    })
    return savedBonus
  },

  deleteBonus: async (id) => {
    await bonusApi.delete(id)
    set(state => ({
      bonuses: {
        items: state.bonuses.items.filter(b => b.id !== id),
        count: Math.max(0, state.bonuses.count - 1)
      }
    }))
  }
}))