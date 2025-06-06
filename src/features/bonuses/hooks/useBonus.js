import { useCallback } from 'react'
import { useBonusStore } from '../stores/useBonusStore'

export const useBonus = () => {
  const bonuses = useBonusStore(state => state.bonuses)
  const userBonuses = useBonusStore(state => state.userBonuses)
  const isFetchingBonuses = useBonusStore(state => state.isFetchingBonuses)
  const isFetchingUserBonuses = useBonusStore(state => state.isFetchingUserBonuses)
  const fetchBonuses = useBonusStore(state => state.fetchBonuses)
  const fetchUserBonuses = useBonusStore(state => state.fetchUserBonuses)
  const claimBonus = useBonusStore(state => state.claimBonus)
  // const updateBonus = useBonusStore(state => state.updateBonus)

  const handleFetchBonuses = useCallback(async () => {
    try {
      await fetchBonuses()
    } catch (error) {
      console.error('Fetching bonuses failed:', error)
    }
  }, [fetchBonuses])

  const handleFetchUserBonuses = useCallback(async () => {
    try {
      await fetchUserBonuses()
    } catch (error) {
      console.error('Fetching user bonuses failed:', error)
    }
  }, [fetchUserBonuses])

  const hasClaimedBonus = useCallback((bonusId) => {
    return userBonuses.items.some(ub => ub.bonusId === bonusId)
  }, [userBonuses])

  // Handle bonus claiming with URL redirection
  const handleClaimBonus = useCallback(async (bonus) => {
    try {
      const claimedBonus = await claimBonus(bonus.id)

      // Redirect to bonus URL if available
      if (bonus.url) {
        window.open(bonus.url, '_blank')
      }

      return claimedBonus
    } catch (error) {
      console.error('Failed to claim bonus:', error)
    }
  }, [claimBonus])

  return {
    bonuses,
    userBonuses,
    isFetchingBonuses,
    isFetchingUserBonuses,
    fetchBonuses: handleFetchBonuses,
    fetchUserBonuses: handleFetchUserBonuses,
    hasClaimedBonus,
    claimBonus: handleClaimBonus,
    // updateBonus,
  }
}