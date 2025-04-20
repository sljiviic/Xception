import { useState } from "react"
import classes from './RegisterModal.module.css'
import Modal from "@/components/ui/Modal/Modal"
import Input from "@/components/ui/Input/Input"
import Button from "@/components/ui/Button/Button"
import AuthFooter from "@/components/ui/AuthFooter/AuthFooter"

const RegisterModal = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }

    console.log({ username, email, password, confirmPassword })
    setError('')
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title='Register'
      error={error}
      footer={<AuthFooter />}
    >
      <form onSubmit={handleRegister} className={classes.form}>
        <Input
          label='Username'
          name='username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required={true}
          className='width-full'
        />
        <Input
          label='Email'
          name='email'
          type='email'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required={true}
          className='width-full'
        />
        <Input
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required={true}
          className='width-full'
        />
        <Input
          label='Confirm Password'
          name='confirm-password'
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

export default RegisterModal