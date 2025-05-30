import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTicketStore } from '../stores/useTicketStore'

export const useTickets = () => {
  // Store states
  const regularTickets = useTicketStore(state => state.regularTickets)
  const specialTickets = useTicketStore(state => state.specialTickets)
  const conversionRate = useTicketStore(state => state.conversionRate)

  // Store actions
  const fetchBalances = useTicketStore(state => state.fetchBalances)
  const convertToSpecial = useTicketStore(state => state.convertToSpecial)
  const awardTickets = useTicketStore(state => state.awardTickets)
  const spendTickets = useTicketStore(state => state.spendTickets)

  // Store loading states
  const isFetchingBalances = useTicketStore(state => state.isFetchingBalances)
  const isConvertingToSpecial = useTicketStore(state => state.isConvertingToSpecial)
  const isAwardingTickets = useTicketStore(state => state.isAwardingTickets)
  const isSpendingTickets = useTicketStore(state => state.isSpendingTickets)

  const handleFetchBalances = useCallback(async () => {
    try {
      await fetchBalances()
    } catch (error) {
      console.error('Fetching balances failed:', error)
    }
  }, [fetchBalances])

  const handleConvertToSpecial = useCallback(async (specialTicketAmount) => {
    try {
      await convertToSpecial(specialTicketAmount)
      toast.success(`Success! You've converted ${specialTicketAmount * conversionRate} tickets into ${specialTicketAmount} Special Ticket${specialTicketAmount > 1 ? 's' : ''}.`)
    } catch (error) {
      console.error('Ticket conversion error:', error)
      toast.error('Something went wrong. Please try again later.')
    }
  }, [convertToSpecial, conversionRate])

  const handleAwardTickets = useCallback(async (amount) => {
    try {
      await awardTickets(amount)
      toast.success(`You've earned ${amount} Tickets! Keep it up!`)
    } catch (error) {
      console.error('Ticket award error:', error)
      toast.error('Ticket reward failed. Make sure you are logged in and try again.')
    }
  }, [awardTickets])

  const handleSpendTickets = useCallback(async (type, amount) => {
    try {
      await spendTickets(type, amount)
      toast.success(`You spent ${amount} ${type} ticket${amount > 1 ? 's' : ''}!`)
    } catch (error) {
      console.error('Ticket spending error:', error)
      toast.error('Oops! Something went wrong. Please try again.')
    }
  }, [spendTickets])

  return {
    regularTickets,
    specialTickets,
    conversionRate,
    fetchBalances: handleFetchBalances,
    convertToSpecial: handleConvertToSpecial,
    awardTickets: handleAwardTickets,
    spendTickets: handleSpendTickets,
    isFetchingBalances,
    isConvertingToSpecial,
    isAwardingTickets,
    isSpendingTickets
  }
}