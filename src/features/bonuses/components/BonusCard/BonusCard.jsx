import { useState } from 'react'
import { useBonusUser } from '../../hooks/useBonusUser'
import { useProtectedClick } from '@/features/auth'
import Button from '@/components/ui/Button/Button'
import classes from './BonusCard.module.css'
import clsx from 'clsx'

const BonusCard = ({ bonus, isClaimed, variant }) => {
  const [isCopied, setIsCopied] = useState(false)
  const { claimBonus } = useBonusUser()
  const handleProtectedClick = useProtectedClick()

  const handleClaim = async () => {
    await claimBonus(bonus)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bonus?.code)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
      })
  }

  return (
    <article className={clsx(
      classes.container,
      classes[variant],
    )}>
      <div
        className={classes.imageContainer}
        style={bonus?.image
          ? { backgroundImage: `url(${bonus?.image})` }
          : {}
        }
      >
        {!bonus?.image &&
          <>
            <div className={classes.circle} aria-hidden='true'></div>
            <div className={classes.backgroundPattern} aria-hidden='true'></div>
            <div className={classes.backgroundColor} aria-hidden='true'></div>
          </>
        }

        <div
          className={classes.codeContainer}
          onClick={copyToClipboard}
          role='button'
          aria-label='Copy bonus code'
          tabIndex={0}
        >
          <div className={classes.copyPrompt}>
            {isCopied ? 'Copied!' : 'Click to copy code'}
          </div>
          {!bonus?.image &&
            <div className={classes.codeDisplay}>
              promo code
              <span className={classes.codeValue}>{bonus?.code}</span>
            </div>
          }
        </div>
      </div>

      <div className={classes.details}>
        <div className={classes.info}>
          <h3 className={classes.title}>{bonus?.name}</h3>
          <p className={classes.description}>{bonus?.description}</p>
        </div>

        <div className={classes.actions}>
          <Button
            as='button'
            type='button'
            onClick={handleProtectedClick(handleClaim)}
            disabled={isClaimed}
            size={variant === 'primary' ? 'medium' : 'small'}
            className={classes.claimButton}
            aria-label={isClaimed ? 'Bonus claimed' : 'Claim bonus'}
          >
            {isClaimed ? 'CLAIMED' : 'CLAIM BONUS'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default BonusCard