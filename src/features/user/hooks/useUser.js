import { useCallback } from 'react'
import { toast } from 'sonner'
import { useUserStore } from '../stores/useUserStore'
import { useAuthStore } from '@/features/auth'

export const useUser = () => {
  // USER ID
  const userId = useAuthStore.getState().user?.id

  // Store actions
  const fetchUser = useUserStore(state => state.fetchUser)
  const updateUser = useUserStore(state => state.updateUser)
  const changeEmail = useUserStore(state => state.changeEmail)
  const changeUsername = useUserStore(state => state.changeUsername)
  const changePassword = useUserStore(state => state.changePassword)
  const connectSocials = useUserStore(state => state.connectSocials)

  // Store loading states
  const isFetchingUser = useUserStore(state => state.isFetchingUser)
  const isUpdatingUser = useUserStore(state => state.isUpdatingUser)
  const isChangingEmail = useUserStore(state => state.isChangingEmail)
  const isChangingUsername = useUserStore(state => state.isChangingUsername)
  const isChangingPassword = useUserStore(state => state.isChangingPassword)
  const isConnectingSocials = useUserStore(state => state.isConnectingSocials)

  const handleFetchUser = useCallback(async () => {
    try {
      if (userId === undefined || userId === null) return
      await fetchUser(userId)
    } catch (error) {
      console.error("Fetching user failed:", error)
    }
  }, [fetchUser, userId])

  const handleUpdateUser = useCallback(async (userData) => {
    try {
      if (userId === undefined || userId === null) return
      const user = await updateUser(userId, userData)
      useAuthStore.setState({ user })
    } catch (error) {
      console.error("updating user failed:", error)
    }
  }, [updateUser, userId])

  const handleEmailChange = useCallback(async (email) => {
    try {
      await changeEmail(email)
      useAuthStore.setState(state => ({
        user: {
          ...state.user,
          email
        }
      }))
      toast.success('Email updated successfully.')
    } catch (error) {
      console.error('Email change failed:', error)
      toast.error('Failed to update email.')
    }
  }, [changeEmail])

  const handleUsernameChange = useCallback(async (username) => {
    try {
      await changeUsername(username)
      useAuthStore.setState(state => ({
        user: {
          ...state.user,
          username
        }
      }))
      toast.success('Username updated successfully.')
    } catch (error) {
      console.error('Username change failed:', error)
      toast.error('Failed to update username.')
    }
  }, [changeUsername])

  const handlePasswordChange = useCallback(async (currentPassword, newPassword) => {
    try {
      await changePassword(currentPassword, newPassword)
      toast.success('Password changed successfully.')
    } catch (error) {
      console.error('Password change failed:', error)
      toast.error('Failed to change password.')
    }
  }, [changePassword])

  const handleSocialConnections = useCallback(async (socialUsernames) => {
    try {
      await connectSocials(useAuthStore.getState().user.id, socialUsernames)
      useAuthStore.setState(state => ({
        user: {
          ...state.user,
          ...socialUsernames
        }
      }))
      toast.success('Socials were added successfully.')
    } catch (error) {
      console.error('Adding socials failed:', error)
      toast.error('Failed to add your socials. Please try again.')
    }
  }, [connectSocials])

  return {
    fetchUser: handleFetchUser,
    updateUser: handleUpdateUser,
    changeEmail: handleEmailChange,
    changeUsername: handleUsernameChange,
    changePassword: handlePasswordChange,
    connectSocials: handleSocialConnections,
    isFetchingUser,
    isUpdatingUser,
    isChangingEmail,
    isChangingUsername,
    isChangingPassword,
    isConnectingSocials
  }
}