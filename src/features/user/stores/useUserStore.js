import { create } from 'zustand'
import { userApi } from '../api/userApi'
import { userLevelApi } from '../api/userLevelApi'
import { userSocialApi } from '../api/userSocialApi'

export const useUserStore = create((set, get) => ({
  user: null,
  userLevel: null,
  socialConnections: [],

  // Loading states
  isFetchingUserData: false,
  isChangingEmail: false,
  isChangingUsername: false,
  isChangingPassword: false,
  isConnectingSocials: false,

  fetchUserData: async () => {
    if (get().isFetchingUserData) return

    set({ isFetchingUserData: true })
    try {
      const [profile, level, socials] = await Promise.all([
        userApi.getProfile(),
        userLevelApi.getLevel(),
        userSocialApi.getSocials()
      ])

      set({
        user: profile,
        userLevel: level,
        socialConnections: socials,
        isFetchingUserData: false
      })
    } catch (error) {
      set({ isFetchingUserData: false })
      throw error
    }
  },

  changeEmail: async (email) => {
    if (get().isChangingEmail) return

    set({ isChangingEmail: true })
    try {
      const user = await userApi.changeEmail(email)
      set({
        user,
        isChangingEmail: false
      })
    } catch (error) {
      set({ isChangingEmail: false })
      throw error
    }
  },

  changeUsername: async (username) => {
    if (get().isChangingUsername) return

    set({ isChangingUsername: true })
    try {
      const user = await userApi.changeUsername(username)
      set({
        user,
        isChangingUsername: false
      })
    } catch (error) {
      set({ isChangingUsername: false })
      throw error
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    if (get().isChangingPassword) return

    set({ isChangingPassword: true })
    try {
      const user = await userApi.changePassword(currentPassword, newPassword)
      set({
        user,
        isChangingPassword: false
      })
    } catch (error) {
      set({ isChangingPassword: false })
      throw error
    }
  },

  connectSocials: async (socialUsernames) => {
    if (get().isConnectingSocials) return

    set({ isConnectingSocials: true })
    try {
      const socialConnections = await userSocialApi.connectSocials(socialUsernames)
      set({
        socialConnections,
        isConnectingSocials: false
      })
    } catch (error) {
      set({ isConnectingSocials: false })
      throw error
    }
  },

  clearUserData: () => set({
    user: null,
    userLevel: null,
    socialConnections: []
  })
}))