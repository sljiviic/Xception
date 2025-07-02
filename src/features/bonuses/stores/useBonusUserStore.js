import { create } from 'zustand'
import { bonusUserApi } from '../api/bonusUserApi'

export const useBonusUserStore = create((set, get) => ({
  bonusesUser: { items: [], count: 0 },
  isFetchingBonusesUser: false,

  fetchBonusesUser: async (userId, params) => {
    if (get().isFetchingBonusesUser) return

    set({ isFetchingBonusesUser: true })
    try {
      const bonusesUser = await bonusUserApi.getAll(userId, params)
      set({
        bonusesUser,
        isFetchingBonusesUser: false
      })
    } catch (error) {
      set({ isFetchingBonusesUser: false })
      throw error
    }
  },

  fetchById: async (id) => {
    set({ isFetchingBonusesUser: true })
    try {
      const bonusUser = await bonusUserApi.getById(id)
      set({ isFetchingBonusesUser: false })
      return bonusUser
    } catch (error) {
      set({ isFetchingBonusesUser: false })
      throw error
    }
  },

  claimBonus: async (userId, bonusId) => {
    const claimedBonus = await bonusUserApi.claim(userId, bonusId)
    set(state => ({
      bonusesUser: {
        items: [...state.bonusesUser.items, claimedBonus],
        count: state.bonusesUser.count + 1
      }
    }))
    return claimedBonus
  },

  deleteBonusUser: async (id) => {
    await bonusUserApi.delete(id)
    set(state => ({
      bonusesUser: {
        items: state.bonusesUser.items.filter(bu => bu.id !== id),
        count: Math.max(0, state.bonusesUser.count - 1)
      }
    }))
  }
}))