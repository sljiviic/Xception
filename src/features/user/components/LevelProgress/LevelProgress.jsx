import { useMemo } from 'react'
import { useUserLevel } from '../../hooks/useUserLevel'
import ticketIcon from '../../assets/tickets.svg'
import classes from './LevelProgress.module.css'
import clsx from 'clsx'

const LEVEL_DATA = [
  { level: 1, tickets: 10, reward: '+1 ticket per task' },
  { level: 2, tickets: 50, reward: '+2 tickets per task' },
  { level: 3, tickets: 100, reward: '+3 tickets per task' },
  { level: 4, tickets: 500, reward: '+4 tickets per task' },
  { level: 5, tickets: 1000, reward: '+5 tickets per task' },
  { level: 6, tickets: 3000, reward: '2x multiplier' },
  { level: 7, tickets: 5000, reward: '3x multiplier' },
  { level: 8, tickets: 10000, reward: '5x multiplier' },
  { level: 9, tickets: 50000, reward: '10x MULTIPLIER!' }
]

const LevelProgress = () => {
  // userLevel should return a number
  // LevelData should return an object such as { totalTickets: number }
  const { level: userLevel, LevelData } = useUserLevel()
  const reversedLevels = useMemo(() => [...LEVEL_DATA].reverse(), [])

  const userTickets = LevelData?.totalTickets || 0

  // Calculate current level and progress
  const currentLevelIndex = userLevel - 1
  const currentLevel = LEVEL_DATA[currentLevelIndex] || LEVEL_DATA[0]
  const nextLevel = LEVEL_DATA[currentLevelIndex + 1] || null

  const progressPercentage = nextLevel
    ? Math.min(100, ((userTickets - currentLevel.tickets) / (nextLevel.tickets - currentLevel.tickets)) * 100)
    : 100

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.title}>Level Progress</h2>
        <p className={classes.description}>Unlock bonuses by collecting tickets</p>
      </div>

      <div className={classes.progressContainer}>
        {reversedLevels.map((level) => {
          const isCompleted = userTickets >= level.tickets
          const isInPogress = currentLevel.level === level.level

          return (
            <div key={level.level} className={classes.levelItemWrapper}>
              <div className={classes.levelItem}>
                {/* Required tickets */}
                <div className={classes.requiredTickets}>
                  <img src={ticketIcon} alt='' className={classes.ticketIcon} />
                  <span className={classes.ticketAmount}>{level.tickets.toLocaleString()}</span>
                </div>

                {/* Level circle */}
                <div className={clsx(
                  classes.levelCircle,
                  { [classes.completed]: isCompleted }
                )}>
                  {/* Progress bar */}
                  {level.level !== 9 &&
                    <div className={classes.progressTrack}>
                      {(isCompleted || isInPogress) &&
                        <div
                          className={classes.progressBar}
                          style={{ height: `${isInPogress ? progressPercentage : 100}%` }}
                        />
                      }
                    </div>}

                </div>

                {/* Reward Text */}
                <span className={classes.rewardText}>
                  {level.reward}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LevelProgress