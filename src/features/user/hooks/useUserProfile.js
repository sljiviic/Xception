import { useCallback } from 'react'
import { toast } from 'sonner'
import { useUserStore } from '../stores/useUserStore'

export const useUserProfile = () => {
  // Store states
  const user = useUserStore(state => state.user)
  const userLevel = useUserStore(state => state.userLevel)
  const socialConnections = useUserStore(state => state.socialConnections)

  // Store actions
  const fetchUserData = useUserStore(state => state.fetchUserData)
  const changeEmail = useUserStore(state => state.changeEmail)
  const changeUsername = useUserStore(state => state.user)
  const changePassword = useUserStore(state => state.changePassword)
  const connectSocials = useUserStore(state => state.connectSocials)

  // Store loading states
  const isFetchingUserData = useUserStore(state => state.isFetchingUserData)
  const isChangingEmail = useUserStore(state => state.isChangingEmail)
  const isChangingUsername = useUserStore(state => state.isChangingUsername)
  const isChangingPassword = useUserStore(state => state.isChangingPassword)
  const isConnectingSocials = useUserStore(state => state.isConnectingSocials)

  const handleFetchUserData = useCallback(async () => {
    try {
      await fetchUserData()
    } catch (error) {
      console.error('Fetching data failed:', error)
    }
  }, [fetchUserData])

  const handleEmailChange = useCallback(async (email) => {
    try {
      await changeEmail(email)
    } catch (error) {
      console.error('Email change failed:', error)
      toast.error('Failed to update email.')
    }
  }, [changeEmail])

  const handleUsernameChange = useCallback(async (username) => {
    try {
      await changeUsername(username)
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
      await connectSocials(socialUsernames)
      toast.success('Socials were added successfully.')
    } catch (error) {
      console.error('Adding socials failed:', error)
      toast.error('Failed to add your socials. Please try again.')
    }
  }, [connectSocials])

  return {
    user,
    userLevel,
    socialConnections,
    fetchUserData: handleFetchUserData,
    changeEmail: handleEmailChange,
    changeUsername: handleUsernameChange,
    changePassword: handlePasswordChange,
    connectSocials: handleSocialConnections,
    isFetchingUserData,
    isChangingEmail,
    isChangingUsername,
    isChangingPassword,
    isConnectingSocials
  }
}