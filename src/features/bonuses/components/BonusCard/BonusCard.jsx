import { useBonus } from '../../hooks/useBonus'
import { useProtectedClick } from '@/features/auth'
import Card from '@/components/ui/Card/Card'
import Button from '@/components/ui/Button/Button'
import classes from './BonusCard.module.css'

const BonusCard = ({ bonus, isClaimed, variant }) => {
  const { claimBonus } = useBonus()
  const handleProtectedClick = useProtectedClick()

  const handleClaim = async () => {
    await claimBonus(bonus)
  }

  return (
    <Card
      variant={variant}
      title={bonus?.title}
      image={bonus?.image}
      footer={
        <Button
          as='button'
          type='button'
          onClick={handleProtectedClick(handleClaim)}
          disabled={isClaimed}
          size={variant === 'primary' ? 'medium' : 'small'}
          className={classes.claimButton}
        >
          {isClaimed ? 'CLAIMED' : 'CLAIM BONUS'}
        </Button>
      }
    >
      {bonus?.description}
    </Card>
  )
}

export default BonusCard