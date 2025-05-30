import { create } from 'zustand'
import { giveawayUserApi } from '../api/giveawayUserApi'

export const useGiveawayUserStore = create((set, get) => ({
  entries: [],
  activeJoined: [],
  wonGiveaways: [],

  // Loading states
  isFetchingEntries: false,
  isFetchingActiveJoined: false,
  isFetchingWon: false,


  fetchEntries: async () => {
    if (get().isFetchingEntries) return

    set({ isFetchingEntries: true })
    try {
      const entries = await giveawayUserApi.getEntries()
      set({
        entries,
        isFetchingEntries: false
      })
    } catch (error) {
      set({ isFetchingEntries: false })
      throw error
    }
  },

  fetchActiveJoined: async () => {
    if (get().isFetchingActiveJoined) return

    set({ isFetchingActiveJoined: true })
    try {
      const activeJoined = await giveawayUserApi.getActiveJoined()
      set({
        activeJoined,
        isFetchingActiveJoined: false
      })
    } catch (error) {
      set({ isFetchingActiveJoined: false })
      throw error
    }
  },

  fetchWon: async () => {
    if (get().isFetchingWon) return

    set({ isFetchingWon: true })
    try {
      const wonGiveaways = await giveawayUserApi.getWon()
      set({
        wonGiveaways,
        isFetchingWon: false
      })
    } catch (error) {
      set({ isFetchingWon: false })
      throw error
    }
  },

  joinDaily: async () => {
    const entry = await giveawayUserApi.joinDaily()
    set(state => ({
      entries: [...state.entries, entry]
    }))
    return entry
  },

  joinMonthly: async (tickets) => {
    const entry = await giveawayUserApi.joinMonthly(tickets)
    set(state => ({
      entries: [...state.entries, entry]
    }))
    return entry
  },

  joinSpecial: async (specialTickets) => {
    const entry = await giveawayUserApi.joinSpecial(specialTickets)
    set(state => ({
      entries: [...state.entries, entry]
    }))
    return entry
  },

  addTickets: async (giveaway, tickets) => {
    const updatedEntry = await giveawayUserApi.addTickets(giveaway.id, tickets)
    set(state => ({
      entries: state.entries.map(entry =>
        entry.giveawayId === giveaway.id ? { ...entry, ...updatedEntry } : entry
      )
    }))
    return updatedEntry
  }
}))