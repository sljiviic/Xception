import { create } from 'zustand'
import { giveawayApi } from '../api/giveawayApi'

export const useGiveawayStore = create((set, get) => ({
  giveaways: { items: [], count: 0 },
  activeGiveaways: { items: [], count: 0 },
  inactiveGiveaways: { items: [], count: 0 },

  // Loading states
  isFetchingGiveaways: false,
  isFetchingActive: false,
  isFetchingInactive: false,

  fetchAll: async (params) => {
    if (get().isFetchingGiveaways) return

    set({ isFetchingGiveaways: true })
    try {
      const giveaways = await giveawayApi.getAll(params)
      set({
        giveaways,
        isFetchingGiveaways: false
      })
    } catch (error) {
      set({ isFetchingGiveaways: false })
      throw error
    }
  },

  fetchById: async (id) => {
    set({ isFetchingGiveaways: true })
    try {
      const giveaway = await giveawayApi.getById(id)
      set({ isFetchingGiveaways: false })
      return giveaway
    } catch (error) {
      set({ isFetchingGiveaways: false })
      throw error
    }
  },

  saveGiveaway: async (giveawayData) => {
    const savedGiveaway = await giveawayApi.save(giveawayData)
    set(state => {
      const exists = state.giveaways.items.some(g => g.id === savedGiveaway.id)

      return {
        giveaways: {
          items: exists
            ? state.giveaways.items.map(g => g.id === savedGiveaway.id ? savedGiveaway : g)
            : [...state.giveaways.items, savedGiveaway],
          count: exists ? state.giveaways.count : state.giveaways.count + 1
        }
      }
    })
    return savedGiveaway
  },

  deleteGiveaway: async (id) => {
    await giveawayApi.delete(id)
    set(state => ({
      giveaways: {
        items: state.giveaways.items.filter(g => g.id !== id),
        count: Math.max(0, state.giveaways.count - 1)
      }
    }))
  },

  fetchActive: async (startDate) => {
    if (get().isFetchingActive) return

    set({ isFetchingActive: true })
    try {
      const activeGiveaways = await giveawayApi.getAll({
        active: true,
        start: startDate
      })
      set({
        activeGiveaways,
        isFetchingActive: false
      })
    } catch (error) {
      set({ isFetchingActive: false })
      throw error
    }
  },

  fetchInactive: async () => {
    if (get().isFetchingInactive) return

    set({ isFetchingInactive: true })
    try {
      const inactiveGiveaways = await giveawayApi.getAll({ active: false })
      set({
        inactiveGiveaways,
        isFetchingInactive: false
      })
    } catch (error) {
      set({ isFetchingInactive: false })
      throw error
    }
  }
}))