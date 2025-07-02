import { useState } from 'react'
import { useProtectedClick } from '@/features/auth'
import { getGiveawayFloatText } from '../../utils/getGiveawayFloatText'
import { getGiveawayRarityColor } from '../../utils/getGiveawayRarityColor'
import GiveawayModal from '../GiveawayModal/GiveawayModal'
import classes from './GiveawayItem.module.css'
import clsx from 'clsx'
import dragonLore from '../../assets/dragonLore.png'

const GiveawayItem = ({ giveaway, isRedirect = false, className, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleProtectedClick = useProtectedClick()
  const itemFloatText = getGiveawayFloatText(giveaway?.float)
  const itemRarityColor = getGiveawayRarityColor(giveaway?.rarity)

  if (!giveaway) return null
  const disabled = !giveaway?.active

  return (
    <>
      <button
        className={clsx(className, classes.giveawayItem, { [classes.disabled]: disabled })}
        onClick={handleProtectedClick((e) => {
          e?.stopPropagation()
          isRedirect ? window.open(giveaway?.url, '_blank') : setIsModalOpen(true)
        })}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        {...props}
      >
        {disabled && <div className={classes.expireBadge}>PAST</div>}
        <div className={classes.itemContent}>
          <div className={classes.rarityIndicator} style={{ color: itemRarityColor }}></div>
          <div className={classes.itemBody}>
            <div className={classes.itemHeader}>
              <div className={classes.name}>{giveaway?.name}</div>
              <div className={classes.floatText}>{itemFloatText}</div>
            </div>
            {/* <img className={classes.image} src={giveaway.image} alt={giveaway.name} /> */}
            <img className={classes.image} src={dragonLore} alt={giveaway?.name} />
            <div className={classes.itemFooter}>
              <div className={classes.date}>01/23/25</div>
              <div className={classes.price}>{giveaway?.price}<span className={classes.priceSymbol}>$</span></div>
            </div>
          </div>
        </div>
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