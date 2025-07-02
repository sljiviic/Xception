import { create } from 'zustand'
import { giveawayUserApi } from '../api/giveawayUserApi'

export const useGiveawayUserStore = create((set, get) => ({
  entries: { items: [], count: 0 },
  activeJoined: { items: [], count: 0 },
  wonGiveaways: { items: [], count: 0 },

  // Loading states
  isFetchingEntries: false,
  isFetchingActiveJoined: false,
  isFetchingWon: false,

  fetchEntries: async (userId, params) => {
    if (get().isFetchingEntries) return

    set({ isFetchingEntries: true })
    try {
      const entries = await giveawayUserApi.getEntries(userId, params)
      set({
        entries,
        isFetchingEntries: false
      })
    } catch (error) {
      set({ isFetchingEntries: false })
      throw error
    }
  },

  fetchById: async (id) => {
    set({ isFetchingEntries: true })
    try {
      const entry = await giveawayUserApi.getById(id)
      set({ isFetchingEntries: false })
      return entry
    } catch (error) {
      set({ isFetchingEntries: false })
      throw error
    }
  },

  fetchActiveJoined: async (userId) => {
    if (get().isFetchingActiveJoined) return

    set({ isFetchingActiveJoined: true })
    try {
      const activeJoined = await giveawayUserApi.getEntries(userId, { used: false })
      set({
        activeJoined,
        isFetchingActiveJoined: false
      })
    } catch (error) {
      set({ isFetchingActiveJoined: false })
      throw error
    }
  },

  // fetchWon: async (userId) => {
  //   if (get().isFetchingWon) return

  //   set({ isFetchingWon: true })
  //   try {
  //     const wonGiveaways = await giveawayUserApi.getWon()
  //     set({
  //       wonGiveaways,
  //       isFetchingWon: false
  //     })
  //   } catch (error) {
  //     set({ isFetchingWon: false })
  //     throw error
  //   }
  // },

  joinGiveaway: async (userId, giveawayUserData) => {
    const entry = await giveawayUserApi.join(userId, giveawayUserData)
    set(state => {
      const exists = state.entries.items.some(e => e.id === entry.id)

      return {
        entries: {
          items: exists
            ? state.entries.items.map(e => e.id === entry.id ? entry : e)
            : [...state.entries.items, entry],
          count: exists ? state.entries.count : state.entries.count + 1
        }
      }
    })
    return entry
  },

  deleteEntry: async (id) => {
    await giveawayUserApi.delete(id)
    set(state => ({
      entries: {
        items: state.entries.items.filter(e => e.id !== id),
        count: Math.max(0, state.entries.count - 1)
      }
    }))
  }
}))