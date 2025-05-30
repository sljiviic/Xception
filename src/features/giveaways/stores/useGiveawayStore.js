import { create } from 'zustand'
import { giveawayApi } from '../api/giveawayApi'

export const useGiveawayStore = create((set, get) => ({
  giveaways: [],
  activeGiveaways: [],
  inactiveGiveaways: [],
  specialProgress: { collected: 0, needed: 50000 },

  // Loading states
  isFetchingGiveaways: false,
  isFetchingActive: false,
  isFetchingInactive: false,
  isFetchingSpecialProgress: false,

  fetchAll: async (query = '') => {
    if (get().isFetchingGiveaways) return

    set({ isFetchingGiveaways: true })
    try {
      const giveaways = await giveawayApi.getAll(query)
      set({
        giveaways,
        isFetchingGiveaways: false
      })
    } catch (error) {
      set({ isFetchingGiveaways: false })
      throw error
    }
  },

  createGiveaway: async (giveawayData) => {
    const newGiveaway = await giveawayApi.create(giveawayData)
    set(state => ({
      giveaways: [...state.giveaways, newGiveaway]
    }))
    return newGiveaway
  },

  updateGiveaway: async (id, giveawayData) => {
    const updatedGiveaway = await giveawayApi.update(id, giveawayData)
    set(state => ({
      giveaways: state.giveaways.map(gw =>
        gw.id === id ? updatedGiveaway : gw
      )
    }))
    return updatedGiveaway
  },

  deleteGiveaway: async (id) => {
    await giveawayApi.delete(id)
    set(state => ({
      giveaways: state.giveaways.filter(gw => gw.id !== id)
    }))
  },

  fetchActive: async () => {
    if (get().isFetchingActive) return

    set({ isFetchingActive: true })
    try {
      const activeGiveaways = await giveawayApi.getActive()
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
      const inactiveGiveaways = await giveawayApi.getInactive()
      set({
        inactiveGiveaways,
        isFetchingInactive: false
      })
    } catch (error) {
      set({ isFetchingInactive: false })
      throw error
    }
  },

  fetchSpecialProgress: async () => {
    if (get().isFetchingSpecialProgress) return

    set({ isFetchingSpecialProgress: true })
    try {
      const specialProgress = await giveawayApi.getSpecialProgress()
      set({
        specialProgress,
        isFetchingSpecialProgress: false
      })
    } catch (error) {
      set({ isFetchingSpecialProgress: false })
      throw error
    }
  }
}))