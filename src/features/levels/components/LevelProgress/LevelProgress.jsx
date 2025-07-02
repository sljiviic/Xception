import { useEffect, useState } from 'react'
import { useLevel } from '../../hooks/useLevel'
import { useAuthStore } from '@/features/auth/'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import ticketIcon from '../../assets/tickets.svg'
import classes from './LevelProgress.module.css'
import clsx from 'clsx'

const LevelProgress = () => {
  const user = useAuthStore(state => state.user)
  const { levels, fetchLevels, fetchById, isFetchingLevels } = useLevel()
  const [currentLevel, setCurrentLevel] = useState(null)
  const [nextLevel, setNextLevel] = useState(null)
  const [progressPercentage, setProgressPercentage] = useState(0)

  const levelId = user?.levelId || 0
  const userTickets = user?.tickets || 0

  useEffect(() => {
    fetchLevels()

    const fetchLevel = async () => {
      const current = await fetchById(levelId)
      const next = await fetchById(levelId + 1)
      if (current) {
        setCurrentLevel(current)
        setNextLevel(next)
      }
    }
    fetchLevel()
  }, [fetchLevels, fetchById, levelId])

  useEffect(() => {
    if (currentLevel && currentLevel.requiredTickets !== undefined) {
      const raw = ((userTickets - currentLevel.requiredTickets) / (nextLevel.requiredTickets - currentLevel.requiredTickets)) * 100
      const percentage = Math.max(0, Math.min(100, raw))

      setProgressPercentage(percentage)
    }
  }, [currentLevel, nextLevel, userTickets])

  if (isFetchingLevels || !currentLevel) return <LoadingSpinner text='Loading...' size='medium' />

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2 className={classes.title}>Level Progress</h2>
        <p className={classes.description}>Unlock bonuses by collecting tickets</p>
      </div>

      <div className={classes.progressContainer}>
        {levels?.items?.map((level) => {
          const isCompleted = userTickets >= level.requiredTickets
          const isInProgress = currentLevel.id === level.id

          return (
            <div key={level.id} className={classes.levelItemWrapper}>
              <div className={classes.levelItem}>
                {/* Required tickets */}
                <div className={classes.requiredTickets}>
                  <img src={ticketIcon} alt='' className={classes.ticketIcon} />
                  <span className={classes.ticketAmount}>{level.requiredTickets.toLocaleString()}</span>
                </div>

                {/* Level circle */}
                <div className={clsx(
                  classes.levelCircle,
                  { [classes.completed]: isCompleted }
                )}>
                  {/* Progress bar */}
                  {level.id !== 8 &&
                    <div className={classes.progressTrack}>
                      {(isCompleted || isInProgress) &&
                        <div
                          className={classes.progressBar}
                          style={{ height: `${isInProgress ? progressPercentage : 100}%` }}
                        />
                      }
                    </div>}

                </div>

                {/* Reward Text */}
                <span className={classes.rewardText}>
                  {level.description}
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