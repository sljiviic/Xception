import { useEffect } from 'react'
import { useLeaderboards } from '../../hooks/useLeaderboards'
import LeaderboardRow from '../LeaderboardRow/LeaderboardRow'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import Error from '@/components/ui/Error/Error'
import classes from './LeaderboardList.module.css'

const LeaderboardList = ({ period }) => {
  const { leaderboard, userPosition, isLoading, fetchLeaderboard } = useLeaderboards(period)

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  if (!(leaderboard instanceof Array) || !leaderboard.length) return <Error error='No leaderboard data available' type='empty' />
  if (isLoading) return <LoadingSpinner
    text='Loading rankings...'
    size='medium'
  />

  return (
    <div className={classes.leaderboard}>

      {/* Leaderboard header */}
      <div className={classes.header}>
        <div className={classes.leftSide}>
          <div className={classes.period}>{period === 'current' ? 'Current leaderboard' : 'Last month'}</div>
        </div>
        <div className={classes.rightSide}>
          <div className={classes.wager}>Wager</div>
          <div className={classes.reward}>Reward</div>
        </div>
      </div>

      {/* Leaderboard content */}
      <div className={classes.content}>
        {leaderboard.length > 0 ? (
          <>
            {/* Top users */}
            {leaderboard.map(user => (
              <LeaderboardRow
                key={user?.username}
                user={user}
                isCurrentUser={userPosition?.username === user.username}
              />
            ))}
          </>
        ) : (
          <div className={classes.notAvailable}>
            No leaderboard data available
          </div>
        )}
      </div>
    </div>
  )
}

export default LeaderboardList