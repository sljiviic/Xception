import classes from './LeaderboardRow.module.css'
import clsx from 'clsx'

const LeaderboardRow = ({ user, isCurrentUser = false }) => {
  return (
    <div className={clsx(classes.leaderboardRow, { [classes.currentUser]: isCurrentUser })}>
      <div className={classes.leftSide}>
        {/* Rank */}
        <div className={classes.rank}>
          {user?.rank}.
        </div>

        {/* Username */}
        <div className={classes.username}>
          {user?.username}
        </div>
      </div>

      <div className={classes.rightSide}>
        {/* Wager */}
        <div className={classes.wager}>
          {user?.wager}$
        </div>

        {/* Reward */}
        <div className={classes.reward}>
          {user?.reward}$
        </div>
      </div>
    </div>
  )
}

export default LeaderboardRow