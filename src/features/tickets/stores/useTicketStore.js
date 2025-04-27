import { create } from 'zustand'
import { ticketsApi } from '../api/ticketsApi'
export const useTicketStore = create((set, get) => ({
  regularTickets: 75,
  specialTickets: 10,
  conversionRate: 500,
  isLoading: false,
  error: null,

  fetchBalances: async () => {
    set({ isLoading: true })
    try {
      const balances = await ticketsApi.getBalances()
      set({
        regularTickets: balances.regular,
        specialTickets: balances.special,
        isLoading: false,
        error: null
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to fetch balances'),
        isLoading: false
      })
      throw error
    }
  },

  convertToSpecial: async (amount) => {
    const cost = amount * 500 // 1 special = 500 regular
    if (get().regularTickets < cost) {
      throw new Error(`You need ${cost} regular tickets for ${amount} special tickets`)
    }

    set({ isLoading: true })
    try {
      await ticketsApi.convertToSpecial(amount)
      set((state) => ({
        regularTickets: state.regularTickets - cost,
        specialTickets: state.specialTickets + amount,
        isLoading: false,
        error: null
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Conversion failed'),
        isLoading: false
      })
      throw error
    }
  },

  awardTickets: async (amount) => {
    set({ isLoading: true })
    try {
      await ticketsApi.awardTickets(amount)
      set((state) => ({
        regularTickets: state.regularTickets + amount,
        isLoading: false,
        error: null
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Award failed'),
        isLoading: false  
      })
      throw error
    }
  },
}))