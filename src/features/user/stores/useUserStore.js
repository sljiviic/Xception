import { create } from 'zustand'
import { userApi } from '../api/userApi'

export const useUserStore = create((set, get) => ({
  user: null,

  // Loading states
  isFetchingUser: false,
  isUpdatingUser: false,
  isChangingEmail: false,
  isChangingUsername: false,
  isChangingPassword: false,
  isConnectingSocials: false,

  fetchUser: async (id) => {
    if (get().isFetchingUser) return

    set({ isFetchingUser: true })
    try {
      const user = await userApi.getById(id)
      set({ user, isFetchingUser: false })
    } catch (error) {
      set({ isFetchingUser: false })
      throw error
    }
  },

  updateUser: async (id, userData) => {
    if (get().isUpdatingUser) return

    set({ isUpdatingUser: true })
    try {
      const user = await userApi.save(id, userData)
      set({ user, isUpdatingUser: false })
      return user
    } catch (error) {
      set({ isUpdatingUser: false })
      throw error
    }
  },

  changeEmail: async (email) => {
    if (get().isChangingEmail) return

    set({ isChangingEmail: true })
    try {
      const user = await userApi.changeEmail(email)
      set({ user, isChangingEmail: false })
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
      set({ user, isChangingUsername: false })
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
      set({ user, isChangingPassword: false })
    } catch (error) {
      set({ isChangingPassword: false })
      throw error
    }
  },

  connectSocials: async (id, socialUsernames) => {
    if (get().isConnectingSocials) return

    set({ isConnectingSocials: true })
    try {
      const updatedUser = await userApi.save(id, {
        twitch: socialUsernames.twitch || null,
        youtube: socialUsernames.youtube || null,
        instagram: socialUsernames.instagram || null,
        tikTok: socialUsernames.tikTok || null,
        twitter: socialUsernames.twitter || null,
        kick: socialUsernames.kick || null,
      })
      set({ user: updatedUser, isConnectingSocials: false })
    } catch (error) {
      set({ isConnectingSocials: false })
      throw error
    }
  }
}))