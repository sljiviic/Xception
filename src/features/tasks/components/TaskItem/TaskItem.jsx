// import { useState } from 'react'
import classes from './TaskItem.module.css'

const TaskItem = ({
  title,
  // type,
  // tickets,
  // completedAt,
  // onClick
}) => {
  // const [now]

  return (
    <li className={classes.taskItem}>
      <span className={classes.label}>{title}</span>
      <span></span>
    </li>
  )
}

export default TaskItem