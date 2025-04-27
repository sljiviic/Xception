import { useTicketStore } from '../stores/useTicketStore'
import { useCallback, /*useEffect*/ } from 'react'

export const useTickets = () => {
  const {
    regularTickets,
    specialTickets,
    conversionRate,
    isLoading,
    error,
    fetchBalances,
    convertToSpecial,
    awardTickets
  } = useTicketStore()

  // Fetch balances on initial load
  // useEffect(() => {
  //   try {
  //     fetchBalances()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [fetchBalances])

  const handleConvert = useCallback(async (specialTicketAmount) => {
    try {
      await convertToSpecial(specialTicketAmount)
    } catch (error) {
      console.error('Conversion error:', error)
    }
  }, [convertToSpecial])

  const handleAward = useCallback(async (amount) => {
    try {
      await awardTickets(amount)
    } catch (error) {
      console.error('Award error:', error)
    }
  }, [awardTickets])

  return {
    // state
    regularTickets,
    specialTickets,
    conversionRate,
    isLoading,
    error,

    // actions
    convertToSpecial: handleConvert,
    awardTickets: handleAward,
    refreshBalances: fetchBalances
  }
}