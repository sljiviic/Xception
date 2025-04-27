import { useState } from 'react'
import classes from './TicketBalance.module.css'
import { useTickets } from '../../hooks/useTickets'
import TicketConversionModal from '../TicketConversionModal/TicketConversionModal'
import ticketIconMain from '../../assets/ticket-main.svg'
import plusIcon from '../../assets/plus.svg'
import ticketIconAccent from '../../assets/ticket-accent.svg'

const TicketBalance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { regularTickets, specialTickets } = useTickets()

  return (
    <>
      <ul className={classes.balancesWrapper}>
        {/* regular tickets */}
        <li>
          <div className={classes.ticketItem}>
            <span className={classes.ticketAmount}>
              {regularTickets.toLocaleString()}
            </span>
            <img
              src={ticketIconMain}
              alt='Regular tickets'
              className={classes.ticketIcon}
            />
          </div>
        </li>

        {/* special tickets that open TicketConversionModal */}
        <li>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsModalOpen(true)
            }}
            className={classes.ticketItemButton}
          >
            <div className={classes.ticketItem}>
              <span className={classes.ticketAmount}>
                {specialTickets.toLocaleString()}
              </span>
              <img
                src={ticketIconAccent}
                alt='Special tickets'
                className={classes.ticketIcon}
              />
              <img
                src={plusIcon}
                alt='Convert to special tickets'
                className={classes.plusIcon}
              />
            </div>
          </button>
        </li>
      </ul>

      {/* conversion modal */}
      <TicketConversionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default TicketBalance