import { create } from 'zustand'
import { ticketsApi } from '../api/ticketsApi'

export const useTicketStore = create((set, get) => ({
  regularTickets: null,
  specialTickets: null,
  conversionRate: 500,

  // Loading states
  isFetchingBalances: false,
  isConvertingToSpecial: false,
  isAwardingTickets: false,
  isSpendingTickets: false,

  fetchBalances: async () => {
    if (get().isFetchingBalances) return

    set({ isFetchingBalances: true })
    try {
      const balances = await ticketsApi.getBalances()
      set({
        regularTickets: balances.regular,
        specialTickets: balances.special,
        isFetchingBalances: false
      })
    } catch (error) {
      set({ isFetchingBalances: false })
      throw error
    }
  },

  convertToSpecial: async (amount) => {
    if (get().isConvertingToSpecial) return

    set({ isConvertingToSpecial: true })
    try {
      await ticketsApi.convertToSpecial(amount)
      set((state) => ({
        regularTickets: (state.regularTickets || 0) - amount * state.conversionRate,
        specialTickets: (state.specialTickets || 0) + amount,
        isConvertingToSpecial: false
      }))
    } catch (error) {
      set({ isConvertingToSpecial: false })
      throw error
    }
  },

  awardTickets: async (amount) => {
    if (get().isAwardingTickets) return

    set({ isAwardingTickets: true })
    try {
      await ticketsApi.awardTickets(amount)
      set((state) => ({
        regularTickets: (state.regularTickets || 0) + amount,
        isAwardingTickets: false
      }))
    } catch (error) {
      set({ isAwardingTickets: false })
      throw error
    }
  },

  spendTickets: async (type, amount) => {
    if (get().isSpendingTickets) return

    set({ isSpendingTickets: true })
    if (type === 'regular') {
      try {
        await ticketsApi.spendTickets(type, amount)
        set(state => ({
          regularTickets: (state.regularTickets || 0) - amount,
          isSpendingTickets: false
        }))
      } catch (error) {
        set({ isSpendingTickets: false })
        throw error
      }
    } else if (type === 'special') {
      try {
        await ticketsApi.spendTickets(type, amount)
        set(state => ({
          specialTickets: (state.specialTickets || 0) - amount,
          isSpendingTickets: false
        }))
      } catch (error) {
        set({ isSpendingTickets: false })
        throw error
      }
    } else {
      throw new Error('Missing or incorrect ticket type (regular/special)')
    }
  }
}))