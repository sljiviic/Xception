import { useState } from 'react'
import clsx from 'clsx'
import classes from './TaskItem.module.css'
import { useTaskStatus } from '../../hooks/useTaskStatus'
import { useProtectedClick } from '@/features/auth'
import { useTaskClick } from '../../hooks/useTaskClick'

const TaskItem = ({ task, className = '', ...props }) => {
  const [isHovering, setIsHovering] = useState(false)
  const {
    type,
    content,
    isCompleted,
    reward
  } = useTaskStatus(task)
  const { handleTaskClick, isLoading } = useTaskClick(task)
  const handleProtectedClick = useProtectedClick()

  // Determines what to show on the right side
  const renderRightSideContent = () => {
    if (isLoading) {
      return <div className={classes.loadingSpinner} />
    }
    switch (type) {
      case 'reward':
        return (
          <>
            <span className={classes.rewardText}>
              +{reward.base}
              {reward.bonus > 0 && (
                <span className={classes.bonusText}> (+{reward.bonus})</span>
              )}
            </span>
            <div className={classes.slider}></div>
          </>
        )
      case 'check':
        return (
          <div className={classes.slider}>
            <i
              className={clsx(
                'fa-solid',
                'fa-check',
                classes.checkIcon,
                { [classes.show]: !isHovering || task.type === 'mandatory' }
              )}
            ></i>
          </div>
        )
      case 'countdown':
        return (
          <div className={classes.slider}>
            <span className={clsx(classes.countdown, {
              [classes.show]: isHovering
            })}>
              {content}
            </span>
            <i
              className={clsx(
                'fa-solid',
                'fa-check',
                classes.checkIcon,
                { [classes.show]: !isHovering }
              )}
            ></i>
          </div>
        )
      case 'error':
      default:
        return (
          <>
            <span className={classes.errorText}>{content}</span>
            <div className={classes.slider}></div>
          </>
        )
    }
  }

  return (
    <a
      href='#'
      onClick={handleProtectedClick(handleTaskClick)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={clsx(
        classes.taskItem,
        classes[task.type],
        {
          [classes.completed]: isCompleted,
          [classes.loading]: isLoading
        },
        className
      )}
      aria-busy={isLoading}
      aria-disabled={isLoading || isCompleted}
      {...props}
    >
      <div className={classes.leftSide}>
        <span className={classes.title}>{task.title}</span>
      </div>

      <div className={classes.rightSide}>
        {renderRightSideContent()}
      </div>
    </a>
  )
}

export default TaskItem