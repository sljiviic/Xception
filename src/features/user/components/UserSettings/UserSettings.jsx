import { useState, useRef, useEffect } from 'react'
import classes from './userSettings.module.css'
import { useUserProfile } from '../../hooks/useUserProfile'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useProtectedClick } from '@/features/auth'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import Error from '@/components/ui/Error/Error'
import ChangeEmailModal from '../ChangeEmailModal/ChangeEmailModal'
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal'
import avatar from '../../assets/avatar.svg'

const UserSettings = () => {
  const [localUsername, setLocalUsername] = useState('')
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [socialLinks, setSocialLinks] = useState({ twitch: '', steam: '' })
  const usernameEditRef = useRef(null)
  const handleProtectedClick = useProtectedClick()

  useClickOutside(
    usernameEditRef,
    () => setIsEditingUsername(false),
    isEditingUsername
  )

  const {
    user,
    userLevel,
    socialConnections,
    fetchUserData,
    isFetchingUserData,
    changeUsername,
    connectSocials
  } = useUserProfile()

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  useEffect(() => {
    if (user) setLocalUsername(user.username)
    if (socialConnections) {
      setSocialLinks({
        twitch: socialConnections.twitch || '',
        steam: socialConnections.steam || ''
      })
    }
  }, [user, socialConnections])

  const handleSocialLinkChange = (platform) => (e) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: e.target.value
    }))
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    await changeUsername(localUsername)
    setIsEditingUsername(false)
  }

  const handleSocialsSubmit = async (e) => {
    e.preventDefault()
    await connectSocials(socialLinks)
  }

  if (!(user instanceof Object) || !user?.username) return <Error error='You have to log in' type='empty' />
  if (isFetchingUserData) return <LoadingSpinner text='Loading profile...' size='medium' />

  return (
    <div className={classes.wrapper}>
      {/* Profile Section */}
      <section className={classes.profileSection}>
        <div className={classes.profileInfo}>
          <img
            className={classes.avatar}
            src={avatar}
            alt={`${user?.username || 'User'} avatar`}
          />

          <div className={classes.usernameWrapper}>
            {isEditingUsername ? (
              <form
                onSubmit={handleProfileUpdate}
                className={classes.usernameForm}
                ref={usernameEditRef}
              >
                <Input
                  name='username'
                  value={localUsername}
                  onChange={(e) => setLocalUsername(e.target.value)}
                  maxLength={20}
                  className={classes.usernameInput}
                  autoFocus
                />
                <Button
                  type='submit'
                  variant='primary'
                  size='medium'
                >
                  Save
                </Button>
              </form>
            ) : (
              <button
                className={classes.usernameDisplay}
                onClick={handleProtectedClick((e) => {
                  e?.stopPropagation()
                  setIsEditingUsername(true)
                })}
              >
                {user?.username}
                <svg xmlns='http://www.w3.org/2000/svg' className={classes.editIcon} viewBox='0 0 512 512'><path fill='currentColor' d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z' /></svg>
              </button>
            )}
            <span className={classes.userLevel}>
              Level: {userLevel?.level || 'N/A'}
            </span>
          </div>
        </div>

        <div className={classes.accountActions}>
          <Button
            onClick={handleProtectedClick((e) => {
              e?.stopPropagation()
              setIsEmailModalOpen(true)
            })}
            variant='primary'
            size='medium'
            className={classes.accountActionButton}
          >
            Change Email
          </Button>
          <Button
            onClick={handleProtectedClick((e) => {
              e.stopPropagation()
              setIsPasswordModalOpen(true)
            })}
            variant='primary'
            size='medium'
            className={classes.accountActionButton}
          >
            Change Password
          </Button>
        </div>
      </section>

      {/* Social Links Section */}
      <section>
        <form className={classes.socialForm} onSubmit={handleSocialsSubmit}>
          <Input
            label='Twitch Username'
            labelSize='medium'
            name='twitch'
            value={socialLinks.twitch}
            onChange={handleSocialLinkChange('twitch')}
            className={classes.socialInput}
            wrapperClassName={classes.socialInputWrapper}
          />
          <Input
            label='Steam Username'
            labelSize='medium'
            name='steam'
            value={socialLinks.steam}
            onChange={handleSocialLinkChange('steam')}
            className={classes.socialInput}
            wrapperClassName={classes.socialInputWrapper}
          />
          <Button
            type='submit'
            variant='primary'
            size='medium'
            className={classes.socialSubmit}
          >
            Save Social Links
          </Button>
        </form>
      </section>

      {/* Modals */}
      <ChangeEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  )
}

export default UserSettings