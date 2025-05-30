import { useEffect } from 'react'
import { useTasks } from '../../hooks/useTasks'
import TaskItem from '../TaskItem/TaskItem'
import { useMandatoryTasksCompleted } from '../../hooks/useMandatoryTasksCompleted'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import Error from '@/components/ui/Error/Error'
import classes from './TaskList.module.css'
import clsx from 'clsx'

const TaskList = ({ ref }) => {
  const { tasks, dailyTasks, mandatoryTasks, isFetchingTasks, fetchTasks } = useTasks()
  const { isAllCompleted: areMandatoryCompleted } = useMandatoryTasksCompleted()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  if (isFetchingTasks) return <LoadingSpinner text='Loading tasks...' size='medium' />
  if (!(tasks instanceof Array) || !tasks.length) return <Error error='No tasks available at the moment' type='empty' />

  return (
    <div className={classes.taskListContainer} ref={ref}>
      {/* Mandatory tasks (always shown until completed) */}
      <div
        className={clsx(
          classes.taskGroup,
          classes.mandatoryTasks,
          {
            'fadeOut': areMandatoryCompleted,
            'hidden': areMandatoryCompleted
          }
        )}
      >
        <h2 className={classes.taskGroupTitle}>Mandatory Tasks</h2>
        <p className={classes.taskGroupDescription}>
          Complete these tasks to be able to join giveaways
        </p>
        <div className={classes.tasks}>
          {mandatoryTasks.map(task => (
            <TaskItem key={task.id} task={task} className={classes.scrollerItem} />
          ))}
        </div>
      </div>

      {/* Daily tasks (shown only after mandatory are completed) */}
      {dailyTasks.length > 0 && (
        <div
          className={clsx(
            classes.taskGroup,
            classes.dailyTasks,
            {
              'fadeIn': areMandatoryCompleted,
              'hidden': !areMandatoryCompleted
            }
          )}
        >
          <h2 className={classes.taskGroupTitle}>Daily Challenges</h2>
          <p className={classes.taskGroupDescription}>
            Complete these tasks every day and earn tickets
          </p>
          <div className={classes.tasks}>
            {dailyTasks.map(task => (
              <TaskItem key={task.id} task={task} className={classes.scrollerItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList