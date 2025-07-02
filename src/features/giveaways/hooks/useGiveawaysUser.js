import { useCallback } from 'react'
import { useGiveawayUserStore } from '../stores/useGiveawayUserStore'
import { useMandatoryTasksCompleted } from '@/features/tasks'
import { useAuthStore } from '@/features/auth'
import { toast } from 'sonner'

export const useGiveawaysUser = () => {
  // USER ID
  const userId = useAuthStore.getState().user?.id

  // Store states
  const entries = useGiveawayUserStore(state => state.entries)
  const activeJoined = useGiveawayUserStore(state => state.activeJoined)
  const wonGiveaways = useGiveawayUserStore(state => state.wonGiveaways)

  // Store actions
  const fetchEntries = useGiveawayUserStore(state => state.fetchEntries)
  const fetchById = useGiveawayUserStore(state => state.fetchById)
  const fetchActiveJoined = useGiveawayUserStore(state => state.fetchActiveJoined)
  // const fetchWon = useGiveawayUserStore(state => state.fetchWon)
  const joinGiveaway = useGiveawayUserStore(state => state.joinGiveaway)
  const deleteEntry = useGiveawayUserStore(state => state.deleteEntry)

  // Store loading states
  const isFetchingEntries = useGiveawayUserStore(state => state.isFetchingEntries)
  const isFetchingActiveJoined = useGiveawayUserStore(state => state.isFetchingActiveJoined)
  const isFetchingWon = useGiveawayUserStore(state => state.isFetchingWon)

  const { areMandatoryCompleted } = useMandatoryTasksCompleted()

  const handleFetchEntries = useCallback(async (params) => {
    try {
      if (userId === undefined || userId === null) return
      await fetchEntries(userId, params)
    } catch (error) {
      console.error("Fetching giveaway's entries failed:", error)
    }
  }, [fetchEntries, userId])

  const handleFetchById = useCallback(async (id) => {
    try {
      return await fetchById(id)
    } catch (error) {
      console.error('Fetching user giveaway by ID failed:', error)
    }
  }, [fetchById])

  const handleFetchActiveJoined = useCallback(async () => {
    try {
      if (userId === undefined || userId === null) return
      await fetchActiveJoined(userId)
    } catch (error) {
      console.error('Fetching active joined giveaways failed:', error)
    }
  }, [fetchActiveJoined, userId])

  // const handleFetchWon = useCallback(async () => {
  //   try {
  //     await fetchWon()
  //   } catch (error) {
  //     console.error('Fetching won giveaways failed:', error)
  //   }
  // }, [fetchWon])

  const handleJoinGiveaway = useCallback(async (giveaway) => {
    try {
      if (!areMandatoryCompleted) {
        toast.error('Mandatory tasks not completed')
        return
      }
      if (userId === undefined || userId === null) return
      await joinGiveaway(userId, { giveawayId: giveaway.id })
      toast.success("You're in! You've successfully entered the giveaway.")
    } catch (error) {
      console.error('Joining giveaway failed:', error)
      toast.error('Oops! Something went wrong. Please try again.')
    }
  }, [areMandatoryCompleted, joinGiveaway, userId])

  const handleDeleteEntry = useCallback(async (id) => {
    try {
      await deleteEntry(id)
    } catch (error) {
      console.error('Deleting giveaway entry failed:', error)
    }
  }, [deleteEntry])

  const addMoreTickets = useCallback(async (giveaway, tickets) => {
    try {
      if (giveaway.giveawayType === 0) {
        await joinGiveaway(userId, {
          giveawayId: giveaway.id,
          tickets
        })
      } else {
        await joinGiveaway(userId, {
          giveawayId: giveaway.id,
          specialTickets: tickets
        })
      }
      toast.success(`Your ticket${tickets > 1 ? 's' : ''} has been added to the giveaway!`)
    } catch (error) {
      console.error('Adding tickets to a giveaway failed:', error)
      toast.error('Oops! Something went wrong. Please try again.')
    }
  }, [joinGiveaway, userId])

  const getEntry = useCallback((giveawayId) => {
    return entries?.items?.find(entry => entry.giveawayId === giveawayId)
  }, [entries])

  const hasJoined = useCallback((giveawayId) => {
    return activeJoined?.items?.some(aj => aj.giveawayId === giveawayId)
  }, [activeJoined])

  return {
    entries,
    activeJoined,
    wonGiveaways,
    fetchEntries: handleFetchEntries,
    fetchById: handleFetchById,
    fetchActiveJoined: handleFetchActiveJoined,
    // fetchWon: handleFetchWon,
    joinGiveaway: handleJoinGiveaway,
    deleteEntry: handleDeleteEntry,
    addMoreTickets,
    getEntry,
    hasJoined,
    // Loading states
    isFetchingEntries,
    isFetchingActiveJoined,
    isFetchingWon
  }
}