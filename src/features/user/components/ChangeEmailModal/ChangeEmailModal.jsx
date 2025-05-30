import { useEffect, useState } from 'react'
import classes from './ChangeEmailModal.module.css'
import { useUserProfile } from '../../hooks/useUserProfile'
import Modal from '@/components/ui/Modal/Modal'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'

const ChangeEmailModal = ({ isOpen, onClose }) => {
  const [newEmail, setNewEmail] = useState('')
  const [notification, setNofication] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setNewEmail('')
      setNofication('')
    }
  }, [isOpen])

  const { user, changeEmail, isChangingEmail } = useUserProfile()

  const handleEmailChange = async (e) => {
    e?.preventDefault()
    await changeEmail(newEmail)
    setNofication(user.email ? `Message was sent to ${user.email}` : '')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Change Email'
      footer={
        <p className={classes.notification}>{notification}</p>
      }
    >
      <form onSubmit={handleEmailChange} className={classes.form}>
        <Input
          label='New Email'
          name='new-email'
          type='email'
          value={newEmail}
          onChange={({ target }) => {
            setNewEmail(target.value)
            if (notification) setNofication('')
          }}
          required={true}
          className={classes.input}
        />
        <Button
          type='submit'
          variant='primary'
          size='medium'
          className={classes.button}
          disabled={!!notification || isChangingEmail}
        >
          {isChangingEmail ? (
            <i className='fa fa-circle-o-notch fa-spin'></i>
          ) : (
            'Confirm'
          )}
        </Button>
      </form>
    </Modal>
  )
}

export default ChangeEmailModal