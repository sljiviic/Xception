import { useEffect } from 'react'
import { useLeaderboards } from '../../hooks/useLeaderboards'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import Error from '@/components/ui/Error/Error'
import classes from './LeaderboardUserRow.module.css'

const LeaderboardUserRow = () => {
  const { userPosition, isLoading, fetchLeaderboard } = useLeaderboards('current')

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  if (!(userPosition instanceof Object) || !userPosition.username) return <Error error='No leaderboard data available' type='empty' />
  if (isLoading) return <LoadingSpinner
    text='Loading your placing...'
    size='medium'
  />

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>Your position</div>

      <div className={classes.leaderboardRow}>
        <div className={classes.leftSide}>
          {/* Rank */}
          <div className={classes.rank}>
            {userPosition?.rank}.
          </div>

          {/* Username */}
          <div className={classes.username}>
            {userPosition?.username || '---'}
          </div>
        </div>

        <div className={classes.rightSide}>
          {/* Wager */}
          <div className={classes.wager}>
            {userPosition.wager ? `${userPosition.wager}$` : '---'}
          </div>

          {/* Reward */}
          <div className={classes.reward}>
            {`Reward: ${userPosition?.reward}$`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardUserRow