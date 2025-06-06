import { create } from 'zustand'
import { bonusApi } from '../api/bonusApi'
import { bonusUserApi } from '../api/bonusUserApi'

export const useBonusStore = create((set, get) => ({
  bonuses: [],
  userBonuses: [],
  isFetchingBonuses: false,
  isFetchingUserBonuses: false,

  fetchBonuses: async ({
    start,
    end,
    page = 1,
    pageSize = 10,
    orderBy,
    order
  }) => {
    if (get().isFetchingBonuses) return

    set({ isFetchingBonuses: true })
    try {
      const bonuses = await bonusApi.getAll(
        start,
        end,
        page,
        pageSize,
        orderBy,
        order
      )
      set({
        bonuses,
        isFetchingBonuses: false
      })
    } catch (error) {
      set({ isFetchingBonuses: false })
      throw error
    }
  },

  fetchUserBonuses: async ({
    start,
    end,
    page = 1,
    pageSize = 10,
    orderBy,
    order
  }) => {
    if (get().isFetchingUserBonuses) return

    set({ isFetchingUserBonuses: true })
    try {
      const userBonuses = await bonusUserApi.getAll(
        start,
        end,
        page,
        pageSize,
        orderBy,
        order
      )
      set({
        userBonuses,
        isFetchingUserBonuses: false
      })
    } catch (error) {
      set({ isFetchingUserBonuses: false })
      throw error
    }
  },

  // Claim or Save bonus
  claimBonus: async (bonusId) => {
    const claimedBonus = await bonusUserApi.create(bonusId)
    set(state => ({
      userBonuses: [...state.userBonuses, claimedBonus]
    }))
    return claimedBonus
  },

  // updateBonus: async (bonusUserId, bonusUserData) => {
  //   const updatedBonus = await bonusUserApi.update(bonusUserId, bonusUserData)
  //   set(state => ({
  //     userBonuses: state.userBonuses.map(bonus =>
  //       bonus.id === bonusUserId ? updatedBonus : bonus
  //     )
  //   }))
  //   return updatedBonus
  // }
}))