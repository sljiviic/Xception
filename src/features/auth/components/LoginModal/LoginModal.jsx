import { useState } from "react"
import classes from './LoginModal.module.css'
import Modal from "@/components/ui/Modal/Modal"
import Input from "@/components/ui/Input/Input"
import Button from "@/components/ui/Button/Button"
import AuthFooter from "@/components/ui/AuthFooter/AuthFooter"

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    console.log({ identifier, password })
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title='Login'
      // error={}
      footer={<AuthFooter />}
    >
      <form onSubmit={handleLogin} className={classes.form}>
        <Input
          label='Username/Email'
          name='identifier'
          type='text'
          value={identifier}
          onChange={({ target }) => setIdentifier(target.value)}
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

export default LoginModal