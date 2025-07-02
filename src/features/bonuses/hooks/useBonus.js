import { useCallback } from 'react'
import { useBonusStore } from '../stores/useBonusStore'

export const useBonus = () => {
  // Store states
  const bonuses = useBonusStore(state => state.bonuses)

  // Store actions
  const fetchBonuses = useBonusStore(state => state.fetchBonuses)
  const fetchById = useBonusStore(state => state.fetchById)
  const saveBonus = useBonusStore(state => state.saveBonus)
  const deleteBonus = useBonusStore(state => state.deleteBonus)

  // Store loading states
  const isFetchingBonuses = useBonusStore(state => state.isFetchingBonuses)

  const handleFetchBonuses = useCallback(async (params) => {
    try {
      await fetchBonuses(params)
    } catch (error) {
      console.error('Fetching bonuses failed:', error)
    }
  }, [fetchBonuses])

  const handleFetchById = useCallback(async (id) => {
    try {
      return await fetchById(id)
    } catch (error) {
      console.error('Fetching bonus by ID failed:', error)
    }
  }, [fetchById])

  const handleSaveBonus = useCallback(async (bonusData) => {
    try {
      return await saveBonus(bonusData)
    } catch (error) {
      console.error('Creating / Saving bonus failed:', error)
    }
  }, [saveBonus])

  const handleDeleteBonus = useCallback(async (id) => {
    try {
      await deleteBonus(id)
    } catch (error) {
      console.error('Deleting bonus failed:', error)
    }
  }, [deleteBonus])

  return {
    bonuses,
    fetchBonuses: handleFetchBonuses,
    fetchById: handleFetchById,
    saveBonus: handleSaveBonus,
    deleteBonus: handleDeleteBonus,
    isFetchingBonuses,
  }
}