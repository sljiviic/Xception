import { useEffect } from 'react'
import { useLeaderboards } from '../../hooks/useLeaderboards'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import Error from '@/components/ui/Error/Error'
import avatarIcon from '../../assets/avatar.svg'
import classes from './LeaderboardTopThree.module.css'
import clsx from 'clsx'

const LeaderboardTopThree = () => {
  const { leaderboard, isLoading, fetchLeaderboard } = useLeaderboards('current')

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  if (!(leaderboard instanceof Array) || !leaderboard.length) return <Error error='No leaderboard data available' type='empty' />
  if (isLoading) return <LoadingSpinner
    text='Loading top three rankings...'
    size='medium'
  />

  const [firstPlace, secondPlace, thirdPlace] = leaderboard.slice(0, 3)

  const renderPodiumItem = (user, position, isFirstPlace = false, delay = 0) => (
    <div className={clsx(
      classes.podiumItem,
      'fadeIn',
      {
        [classes.firstPlace]: isFirstPlace,
        [classes.secondPlace]: position === 2,
        [classes.thirdPlace]: position === 3
      }
    )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={clsx(classes.rank, { [classes.special]: isFirstPlace })}>
        {position}
      </div>
      <img
        src={avatarIcon}
        alt={`${user?.username || 'User'}'s profile`}
        className={classes.avatar}
      />
      <div className={classes.username}>
        {user?.username || '---'}
      </div>
      <div className={classes.wager}>
        {user?.wager ? `${user.wager}$` : '---'}
      </div>
    </div>
  )

  return (
    <div className={classes.wrapper}>
      {renderPodiumItem(secondPlace, 2, false, 0.6)}
      {renderPodiumItem(firstPlace, 1, true, 0.3)}
      {renderPodiumItem(thirdPlace, 3, false, 0.9)}
    </div>
  )
}

export default LeaderboardTopThree