import { useState, useEffect } from 'react'
import classes from './ChangePasswordModal.module.css'
import { useUserProfile } from '../../hooks/useUserProfile'
import Modal from '@/components/ui/Modal/Modal'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }, [isOpen])

  const { changePassword, isChangingPassword } = useUserProfile()

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    await changePassword(newPassword)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Change Password'
      error={newPassword !== confirmPassword ? 'New passwords do not match' : ''}
    >
      <form onSubmit={handlePasswordChange} className={classes.form}>
        <Input
          label='Old Password'
          name='old-password'
          type='password'
          value={oldPassword}
          onChange={({ target }) => setOldPassword(target.value)}
          required={true}
          className={classes.input}
          wrapperClassName={classes.inputWrapper}
        />
        <Input
          label='New Password'
          name='new-password'
          type='password'
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
          required={true}
          className={classes.input}
          wrapperClassName={classes.inputWrapper}
        />
        <Input
          label='Confirm New Password'
          name='confirm-new-password'
          type='password'
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          required={true}
          className={classes.input}
          wrapperClassName={classes.inputWrapper}
        />
        <Button
          type='submit'
          variant='primary'
          size='medium'
          className={classes.button}
          disabled={isChangingPassword}
        >
          {isChangingPassword ? (
            <i className='fa fa-circle-o-notch fa-spin'></i>
          ) : (
            'Confirm'
          )}
        </Button>
      </form>
    </Modal>
  )
}

export default ChangePasswordModal