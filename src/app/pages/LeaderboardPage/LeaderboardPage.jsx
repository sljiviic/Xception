import { LeaderboardList, LeaderboardTopThree, LeaderboardUserRow } from '@/features/leaderboards'
import IntroSection from '@/components/sections/IntroSection/IntroSection'
import classes from './LeaderboardPage.module.css'

const LeaderboardPage = () => {


  return (
    <div className='pageOpeningAnimation'>
      <IntroSection
        title='TOP 10 MONTHLY CASHBACK'
        subtitle={'Claim bonuses, deposit funds using code "XCEPTION" and\nget 100% affiliate earnings as monthly cashback'}
      />
      <LeaderboardTopThree />
      <LeaderboardUserRow />
      <div className={classes.leaderboardListWrapper}>
        <LeaderboardList period='past' />
        <LeaderboardList period='current' />
      </div>
    </div>
  )
}

export default LeaderboardPage