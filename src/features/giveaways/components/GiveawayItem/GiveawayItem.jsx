import { useState } from 'react'
import { useProtectedClick } from '@/features/auth'
import GiveawayModal from '../GiveawayModal/GiveawayModal'
import classes from './GiveawayItem.module.css'
import clsx from 'clsx'

const GiveawayItem = ({ giveaway, isRedirect = false, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleProtectedClick = useProtectedClick()

  if (!giveaway) return null
  const disabled = !giveaway.isActive

  return (
    <>
      <button
        className={clsx(className, classes.giveawayItem, { [classes.disabled]: disabled })}
        onClick={handleProtectedClick((e) => {
          e?.stopPropagation()
          isRedirect ? window.open(giveaway?.redirectUrl, '_blank') : setIsModalOpen(true)
        })}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        {disabled && <div className={classes.expireBadge}>PAST</div>}
        <img
          src={giveaway.imageUrl}
          alt={giveaway.title}
          className={classes.image}
        />
      </button>
      {!isRedirect && <GiveawayModal
        giveaway={giveaway}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />}
    </>
  )
}

export default GiveawayItem