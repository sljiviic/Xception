import { useCallback } from 'react'
import { useGiveawayStore } from '../stores/useGiveawayStore'

export const useGiveaways = () => {
  // Store states
  const giveaways = useGiveawayStore(state => state.giveaways)
  const activeGiveaways = useGiveawayStore(state => state.activeGiveaways)
  const inactiveGiveaways = useGiveawayStore(state => state.inactiveGiveaways)

  // Store actions
  const fetchAll = useGiveawayStore(state => state.fetchAll)
  const fetchById = useGiveawayStore(state => state.fetchById)
  const saveGiveaway = useGiveawayStore(state => state.saveGiveaway)
  const deleteGiveaway = useGiveawayStore(state => state.deleteGiveaway)
  const fetchActive = useGiveawayStore(state => state.fetchActive)
  const fetchInactive = useGiveawayStore(state => state.fetchInactive)

  // Store loading states
  const isFetchingGiveaways = useGiveawayStore(state => state.isFetchingGiveaways)
  const isFetchingActive = useGiveawayStore(state => state.isFetchingActive)
  const isFetchingInactive = useGiveawayStore(state => state.isFetchingInactive)

  const handleFetchAll = useCallback(async (params) => {
    try {
      await fetchAll(params)
    } catch (error) {
      console.error('Fetching all giveaways failed:', error)
    }
  }, [fetchAll])

  const handleFetchById = useCallback(async (id) => {
    try {
      return await fetchById(id)
    } catch (error) {
      console.error('Fetching giveaway by ID failed:', error)
    }
  }, [fetchById])

  const handleSaveGiveaway = useCallback(async (giveawayData) => {
    try {
      return await saveGiveaway(giveawayData)
    } catch (error) {
      console.error('Creating / Saving giveaway failed:', error)
    }
  }, [saveGiveaway])

  const handleDeleteGiveaway = useCallback(async (id) => {
    try {
      await deleteGiveaway(id)
    } catch (error) {
      console.error('Deleting giveaway failed:', error)
    }
  }, [deleteGiveaway])

  const handleFetchActive = useCallback(async (startDate) => {
    try {
      await fetchActive(startDate)
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

  return {
    giveaways,
    activeGiveaways,
    inactiveGiveaways,
    fetchAll: handleFetchAll,
    fetchById: handleFetchById,
    saveGiveaway: handleSaveGiveaway,
    deleteGiveaway: handleDeleteGiveaway,
    fetchActive: handleFetchActive,
    fetchInactive: handleFetchInactive,
    isFetchingGiveaways,
    isFetchingActive,
    isFetchingInactive
  }
}