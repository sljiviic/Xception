import { useState } from 'react'
import classes from './GetSpecialTicketsModal.module.css'
import Modal from '@/components/ui/Modal/Modal'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import ticketIcon from '@/assets/icons/ticketspecial.svg'
import twitchIcon from '@/assets/icons/twitch.svg'

const GetSpecialTicketsModal = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [tickets, setTickets] = useState('1')
  const [error, setError] = useState('Not enough tickets')

  const ticketsPrice = Number(tickets) * 100

  const validate = () => {
    const count = Number(tickets)
    if (Number.isNaN(count)) return 'Invalid number'
    if (count < 1) return 'You must buy at least 1 ticket'
    if (count > 100) return 'You can buy up to 100 tickets at once'
    return ''
  }

  const buyTickets = e => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) return setError(validationError)
    console.log({ tickets })
    setError('')
    setTickets('1')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title='Get Special Tickets'
      footer={
        <button className={classes.button}>
          <div className={classes.footerIconWrapper}>
            <img src={twitchIcon} alt='Twitch icon' />
          </div>
          <p className={classes.buttonText}>
            Subscribe to get 10 <span><img src={ticketIcon} alt='' /></span> daily!
          </p>
        </button>
      }
    >
      <form onSubmit={buyTickets} className={classes.form}>
        <div className={classes.formInputWrapper}>
          <Input
            label='Amount:'
            labelSize='medium'
            name='ticket-amount'
            type='number'
            value={tickets}
            min={1}
            max={100}
            onChange={({ target }) => {
              const value = target.value
              if (value.length <= 3) setTickets(value)
            }}
            required={true}
            className={classes.inputSmall}
            wrapperClassName='margin-0'
          />
          <img src={ticketIcon} alt='' className={classes.ticketIcon} />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="medium"
        >
          Buy for {ticketsPrice}
        </Button>
        {error && <p className={classes.errorText}>{error}</p>}
      </form>
    </Modal>
  )
}

export default GetSpecialTicketsModal