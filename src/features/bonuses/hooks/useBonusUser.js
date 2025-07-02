import { useCallback } from 'react'
import { useBonusUserStore } from '../stores/useBonusUserStore'
import { useAuthStore } from '@/features/auth'
import { toast } from 'sonner'

export const useBonusUser = () => {
  // USER ID
  const userId = useAuthStore.getState().user?.id

  // Store states
  const bonusesUser = useBonusUserStore(state => state.bonusesUser)

  // Store actions
  const fetchBonusesUser = useBonusUserStore(state => state.fetchBonusesUser)
  const fetchById = useBonusUserStore(state => state.fetchById)
  const claimBonus = useBonusUserStore(state => state.claimBonus)
  const deleteBonusUser = useBonusUserStore(state => state.deleteBonusUser)

  // Store loading states
  const isFetchingBonusesUser = useBonusUserStore(state => state.isFetchingBonusesUser)

  const handleFetchBonusesUser = useCallback(async (params) => {
    try {
      if (userId === undefined || userId === null) return
      await fetchBonusesUser(userId, params)
    } catch (error) {
      console.error('Fetching user bonuses failed:', error)
    }
  }, [fetchBonusesUser, userId])

  const handleFetchById = useCallback(async (id) => {
    try {
      return await fetchById(id)
    } catch (error) {
      console.error('Fetching user bonus by ID failed:', error)
    }
  }, [fetchById])

  // Handle bonus claiming with URL redirection
  const handleClaimBonus = useCallback(async (bonus) => {
    try {
      if (userId === undefined || userId === null) return
      const claimedBonus = await claimBonus(userId, bonus.id)

      // Redirect to bonus URL if available
      if (bonus.url) {
        window.open(bonus.url, '_blank', 'noopener, noreferrer')
      }

      toast.success("You've claimed the bonus.")
      return claimedBonus
    } catch (error) {
      console.error('Failed to claim bonus:', error)
      toast.error('Oops! Something went wrong. Please try again.')
    }
  }, [claimBonus, userId])

  const handleDeleteBonusUser = useCallback(async (id) => {
    try {
      await deleteBonusUser(id)
    } catch (error) {
      console.error('Deleting user bonus failed:', error)
    }
  }, [deleteBonusUser])

  const hasClaimedBonus = useCallback((bonusId) => {
    return bonusesUser.items.some(ub => ub.bonusId === bonusId)
  }, [bonusesUser])

  return {
    bonusesUser,
    fetchBonusesUser: handleFetchBonusesUser,
    fetchById: handleFetchById,
    claimBonus: handleClaimBonus,
    deleteBonusUser: handleDeleteBonusUser,
    hasClaimedBonus,
    isFetchingBonusesUser,
  }
}