import { useState } from "react"
import classes from './ChangePasswordModal.module.css'
import Modal from "@/components/ui/Modal/Modal"
import Input from "@/components/ui/Input/Input"
import Button from "@/components/ui/Button/Button"

const ChangePasswordModal = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handlePasswordChange = e => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      return setError('New passwords do not match')
    }

    console.log({ oldPassword, newPassword })
    setError('')
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title='Change Password'
      error={error}
    >
      <form onSubmit={handlePasswordChange} className={classes.form}>
        <Input
          label='Old Password'
          name='old-password'
          type='password'
          value={oldPassword}
          onChange={({ target }) => setOldPassword(target.value)}
          required={true}
          className='width-full'
        />
        <Input
          label='New Password'
          name='new-password'
          type='password'
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
          required={true}
          className='width-full'
        />
        <Input
          label='Confirm New Password'
          name='confirm-new-password'
          type='password'
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          required={true}
          className='width-full'
        />
        <Button
          type="submit"
          variant="primary"
          size="medium"
          className='margin-top'
        >
          Confirm
        </Button>
      </form>
    </Modal>
  )
}

export default ChangePasswordModal