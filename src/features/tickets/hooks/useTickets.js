import { useCallback } from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '@/features/auth'
import { useUser } from '@/features/user'

export const useTickets = () => {
  // USER
  const user = useAuthStore(state => state.user)

  const regularTickets = user?.tickets
  const specialTickets = user?.specialTickets
  const conversionRate = 500

  const { updateUser, isUpdatingUser } = useUser()

  const convertToSpecial = useCallback(async (specialTicketAmount) => {
    try {
      await updateUser({
        tickets: (user?.tickets || 0) - specialTicketAmount * conversionRate,
        specialTickets: (user?.specialTickets || 0) + specialTicketAmount,
      })
      toast.success(`Success! You've converted ${specialTicketAmount * conversionRate} tickets into ${specialTicketAmount} Special Ticket${specialTicketAmount > 1 ? 's' : ''}.`)
    } catch (error) {
      console.error('Ticket conversion error:', error)
      toast.error('Something went wrong. Please try again later.')
    }
  }, [conversionRate, updateUser, user?.tickets, user?.specialTickets])

  return {
    regularTickets,
    specialTickets,
    conversionRate,
    convertToSpecial,
    isUpdatingUser
  }
}