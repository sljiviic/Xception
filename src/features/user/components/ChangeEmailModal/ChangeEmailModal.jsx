import { useState } from "react"
import classes from './ChangeEmailModal.module.css'
import Modal from "@/components/ui/Modal/Modal"
import Input from "@/components/ui/Input/Input"
import Button from "@/components/ui/Button/Button"

const ChangeEmailModal = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [newEmail, setNewEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleEmailChange = e => {
    e.preventDefault()

    console.log({ newEmail })
    setError('')
    setMessage('Message was sent to your old email')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title='Change Email'
      error={error}
      footer={
        <p className={classes.message}>{message}</p>
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
            if (message) setMessage('')
          }}
          required={true}
          className='width-full'
        />
        <Button
          type="submit"
          variant="primary"
          size="medium"
          className='margin-top'
          disabled={!!message}
        >
          Confirm
        </Button>
      </form>
    </Modal>
  )
}

export default ChangeEmailModal