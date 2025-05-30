import { useCallback } from 'react'
import { useGiveawayStore } from '../stores/useGiveawayStore'
import { useGiveawayUserStore } from '../stores/useGiveawayUserStore'
import { useMandatoryTasksCompleted } from '@/features/tasks'

export const useGiveaways = () => {
  // Store states
  const giveaways = useGiveawayStore(state => state.giveaways)
  const activeGiveaways = useGiveawayStore(state => state.activeGiveaways)
  const inactiveGiveaways = useGiveawayStore(state => state.inactiveGiveaways)
  const specialProgress = useGiveawayStore(state => state.specialProgress)
  const entries = useGiveawayUserStore(state => state.entries)
  const activeJoined = useGiveawayUserStore(state => state.activeJoined)
  const wonGiveaways = useGiveawayUserStore(state => state.wonGiveaways)

  // Store actions
  const fetchAll = useGiveawayStore(state => state.fetchAll)
  const fetchActive = useGiveawayStore(state => state.fetchActive)
  const fetchInactive = useGiveawayStore(state => state.fetchInactive)
  const fetchSpecialProgress = useGiveawayStore(state => state.fetchSpecialProgress)
  const fetchEntries = useGiveawayUserStore(state => state.fetchEntries)
  const fetchActiveJoined = useGiveawayUserStore(state => state.fetchActiveJoined)
  const fetchWon = useGiveawayUserStore(state => state.fetchWon)

  // Store loading states
  const isFetchingGiveaways = useGiveawayStore(state => state.isFetchingGiveaways)
  const isFetchingActive = useGiveawayStore(state => state.isFetchingActive)
  const isFetchingInactive = useGiveawayStore(state => state.isFetchingInactive)
  const isFetchingSpecialProgress = useGiveawayStore(state => state.isFetchingSpecialProgress)
  const isFetchingEntries = useGiveawayStore(state => state.isFetchingEntries)
  const isFetchingActiveJoined = useGiveawayStore(state => state.isFetchingActiveJoined)
  const isFetchingWon = useGiveawayStore(state => state.isFetchingWon)

  const { isAllCompleted: areMandatoryCompleted } = useMandatoryTasksCompleted()

  const handleFetchAll = useCallback(async () => {
    try {
      await fetchAll()
    } catch (error) {
      console.error('Fetching all giveaways failed:', error)
    }
  }, [fetchAll])

  const handleFetchActive = useCallback(async () => {
    try {
      await fetchActive()
    } catch (error) {
      console.error('Fetching active giveaways failed:', error)
    }
  }, [fetchActive])

  const handleFetchInactive = useCallback(async () => {
    try {
      await fetchInactive()
    } catch (error) {
      console.error('Fetching inactive giveaways failed:', error)
    }
  }, [fetchInactive])

  const handleFetchSpecialProgress = useCallback(async () => {
    try {
      await fetchSpecialProgress()
    } catch (error) {
      console.error("Fetching special giveaway's progress failed:", error)
    }
  }, [fetchSpecialProgress])

  const handleFetchEntries = useCallback(async () => {
    try {
      await fetchEntries()
    } catch (error) {
      console.error("Fetching giveaway's entries failed:", error)
    }
  }, [fetchEntries])

  const handleFetchActiveJoined = useCallback(async () => {
    try {
      await fetchActiveJoined()
    } catch (error) {
      console.error('Fetching active joined giveaways failed:', error)
    }
  }, [fetchActiveJoined])

  const handleFetchWon = useCallback(async () => {
    try {
      await fetchWon()
    } catch (error) {
      console.error('Fetching won giveaways failed:', error)
    }
  }, [fetchWon])

  const getEntry = (giveawayId) =>
    entries.find(entry => entry.giveawayId === giveawayId)

  const hasJoined = (giveawayId) =>
    activeJoined.some(joined => joined.giveawayId === giveawayId)

  return {
    giveaways,
    activeGiveaways,
    inactiveGiveaways,
    specialProgress,
    entries,
    activeJoined,
    wonGiveaways,
    areMandatoryCompleted,
    fetchAll: handleFetchAll,
    fetchActive: handleFetchActive,
    fetchInactive: handleFetchInactive,
    fetchSpecialProgress: handleFetchSpecialProgress,
    fetchEntries: handleFetchEntries,
    fetchActiveJoined: handleFetchActiveJoined,
    fetchWon: handleFetchWon,
    getEntry,
    hasJoined,
    // Loading states
    isFetchingGiveaways,
    isFetchingActive,
    isFetchingInactive,
    isFetchingSpecialProgress,
    isFetchingEntries,
    isFetchingActiveJoined,
    isFetchingWon
  }
}