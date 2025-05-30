import { useCallback } from 'react'
import { toast } from 'sonner'
import { useGiveawayUserStore } from '../stores/useGiveawayUserStore'
import { useMandatoryTasksCompleted } from '@/features/tasks'

export const useGiveawayParticipation = () => {
  const joinDaily = useGiveawayUserStore(state => state.joinDaily)
  const joinMonthly = useGiveawayUserStore(state => state.joinMonthly)
  const joinSpecial = useGiveawayUserStore(state => state.joinSpecial)
  const addTickets = useGiveawayUserStore(state => state.addTickets)

  const { areMandatoryCompleted } = useMandatoryTasksCompleted()

  const participate = useCallback(async (giveaway) => {
    try {
      if (!areMandatoryCompleted) {
        toast.error('Mandatory tasks not completed')
        return
      }
      if (giveaway.type === 'DAILY') {
        await joinDaily()
        toast.success("You're in! Successfully joined today's giveaway.")
        return
      } else if (giveaway.type === 'MONTHLY') {
        await joinMonthly()
        toast.success("You've joined the Special Giveaway! Good luck!")
        return
      } else if (giveaway.type === 'SPECIAL') {
        await joinSpecial()
        toast.success("You're all set! Monthly giveaway entry confirmed.")
        return
      } else {
        throw new Error('No giveaway type was found')
      }
    } catch (error) {
      console.error(error)
      toast.error('Oops! Something went wrong. Please try again.')
    }
  }, [areMandatoryCompleted, joinDaily, joinMonthly, joinSpecial])

  const addMoreTickets = useCallback(async (giveaway, tickets) => {
    try {
      await addTickets(giveaway, tickets)
      toast.success(`Your ticket${tickets > 1 ? 's' : ''} has been added to the giveaway! Good luck!`)
    } catch (error) {
      console.error('Adding tickets to a giveaway failed:', error)
      toast.error('Oops! Something went wrong. Please try again.')
    }
  }, [addTickets])

  return {
    participate,
    addMoreTickets
  }
}