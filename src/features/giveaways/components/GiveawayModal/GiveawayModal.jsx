import { useState } from 'react'
import { useGiveaways } from '../../hooks/useGiveaways'
import { useGiveawayParticipation } from '../../hooks/useGiveawayParticipation'
import { useNavigate } from 'react-router-dom'
import Modal from '@/components/ui/Modal/Modal'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import classes from './GiveawayModal.module.css'
import specialTicketIcon from '../../assets/ticket-accent.svg'
import regularTicketIcon from '../../assets/ticket-main.svg'
import clsx from 'clsx'

const GiveawayModal = ({ giveaway, isOpen, onClose }) => {
  const { hasJoined, getEntry, areMandatoryCompleted } = useGiveaways()
  const { participate, addMoreTickets } = useGiveawayParticipation()
  const navigate = useNavigate()

  const [additionalTickets, setAdditionalTickets] = useState('1')
  const [inputError, setInputError] = useState(null)
  const entry = getEntry(giveaway.id)
  const hasUserJoined = hasJoined(giveaway.id)

  const handleAddTickets = async (e) => {
    e?.preventDefault()
    const ticketAmount = Number(additionalTickets)

    if (isNaN(ticketAmount)) {
      setInputError('Please enter a valid amount')
      return
    }

    if (ticketAmount < 1) {
      setInputError('Minimum 1 ticket required')
      return
    }

    try {
      await addMoreTickets(giveaway, ticketAmount)
      setAdditionalTickets(1)
    } catch (error) {
      console.error('Failed to add tickets:', error)
    }
  }

  const handleAmountChange = (value) => {
    if (value === '' || (/^\d+$/.test(value) && value.length <= 5)) {
      setAdditionalTickets(value)
      setInputError(null)
    }
  }

  const modalDisplay = () => {
    return hasUserJoined ? (
      <form onSubmit={handleAddTickets} className={classes.form}>
        <div className={classes.formControls}>
          <Input
            type='text'
            inputMode='numeric'
            name='additional-tickets'
            labelSize='small'
            required={true}
            className={classes.input}
            value={additionalTickets}
            placeholder='0'
            onChange={({ target }) => handleAmountChange(target.value)}
          />
          <Button
            type='submit'
            variant='secondary'
            className={classes.buttonInput}
          >
            Add Tickets
          </Button>
        </div>
        <p className={classes.formText}>More tickets, higher chances of winning</p>
      </form>
    ) : (
      <div className={classes.joinControls}>
        {areMandatoryCompleted ? (
          <>
            <Button
              onClick={participate(giveaway)}
              variant='secondary'
              className={classes.button}
            >
              Join
            </Button>
            <span className={classes.ticketCost}>Cost: 1 Regular Ticket</span>
          </>
        ) : (
          <Button
            onClick={(e) => {
              e?.preventDefault()
              navigate('/giveaways', { state: { scrollToTasks: true } })
            }}
            variant='error'
            className={clsx(classes.button, classes.arrowButton)}
          >
            Go to tasks
            <i className={clsx('fa-solid', 'fa-arrow-right', classes.arrowIcon)}></i>
          </Button>
        )}
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={giveaway.title}
      footer={modalDisplay()}
      error={areMandatoryCompleted ? inputError : 'Must complete mandatory tasks'}
      className={clsx({ [classes.modal]: hasUserJoined })}
    >
      <div className={classes.modalContent}>
        <img className={classes.modalImage} src={giveaway.imageUrl} alt={giveaway.title} />
        {hasUserJoined && (
          <p className={classes.placedTickets}>
            {`Placed tickets: ${entry.ticketCount}`}
            <img
              src={giveaway.type === 'SPECIAL'
                ? specialTicketIcon
                : regularTicketIcon}
              alt='Ticket Icon'
              className={classes.ticketIcon}
            />
          </p>
        )}
      </div>
    </Modal>
  )
}

export default GiveawayModal