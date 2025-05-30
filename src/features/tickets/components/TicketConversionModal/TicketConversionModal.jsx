import { useEffect } from 'react'
import { useTicketConversion } from '../../hooks/useTicketConversion'
import clsx from 'clsx'
import Modal from '@/components/ui/Modal/Modal'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import classes from './TicketConversionModal.module.css'
import ticketIcon from '../../assets/ticketspecial.svg'
import twitchIcon from '../../assets/twitch.svg'
import ticketMain from '../../assets/ticket-main.svg'

const TicketConversionModal = ({ isOpen, onClose }) => {
  const {
    amount,
    inputError,
    cost,
    isLoading,
    handleConvert,
    handleAmountChange,
    resetConversion
  } = useTicketConversion()

  useEffect(() => {
    if (!isOpen) resetConversion()
  }, [isOpen, resetConversion])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Get Special Tickets'
      footer={
        <a
          href='https://www.twitch.tv/xxceptionn_'
          target='_blank'
          className={classes.footerButton}
        >
          <div className={classes.footerIconWrapper}>
            <img src={twitchIcon} alt='Twitch icon' />
          </div>
          <p className={classes.footerButtonText}>
            Subscribe to get 10 <span><img src={ticketIcon} alt='Special ticket' /></span> daily!
          </p>
        </a>
      }
    >
      <form onSubmit={handleConvert} className={classes.form}>
        <div className={classes.formInputWrapper}>
          <Input
            type='text'
            inputMode='numeric'
            name='ticket-amount'
            label='Amount:'
            labelSize='medium'
            required={true}
            className={classes.inputSmall}
            value={amount}
            onChange={({ target }) => handleAmountChange(target.value)}
          />
          <img src={ticketIcon} alt='Special ticket' className={classes.ticketIcon} />
        </div>

        <Button
          type='submit'
          variant='secondary'
          size='medium'
          disabled={isLoading || !amount || inputError}
          className={classes.button}
        >
          {isLoading ? (
            <>
              <span style={{ marginRight: '8px' }}>
                <i className='fa fa-circle-o-notch fa-spin'></i>
              </span>
              Processing
            </>
          ) : (
            <>
              Buy for {cost.toLocaleString()}
              <img
                src={ticketMain}
                alt='Regular ticket'
                className={clsx(classes.ticketIcon, classes.ticketRegular)}
              />
            </>
          )}
        </Button>

        <div className={clsx(
          classes.errorText,
          { [classes.visible]: inputError }
        )}>
          {inputError}
        </div>
      </form>
    </Modal>
  )
}

export default TicketConversionModal