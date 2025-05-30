import { BonusList } from '@/features/bonuses'
import IntroSection from '@/components/sections/IntroSection/IntroSection'
import classes from './BonusesPage.module.css'

const BonusesPage = () => {
  return (
    <div className='pageOpeningAnimation'>
      <IntroSection
        title='CLAIM BONUSES AND GET PAID'
        subtitle={'Claim any marked bonus to join the Leaderboard\nTop 10 players get a Monthly Cashback of 100% affiliate earnings'}
      />
      <BonusList
        variant='secondary'
        className={classes.bonusList}
      />
    </div>
  )
}

export default BonusesPage