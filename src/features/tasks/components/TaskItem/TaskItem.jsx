import Button from "@/components/ui/Button/Button"
import classes from './TaskItem.module.css'
import clsx from "clsx";
import { useTaskRightSide } from '../../hooks/useTaskRightSide';
import { useTaskClick } from '../../hooks/useTaskClick';

export const TaskItem = ({ task, className = '', ...props }) => {
  const { type, content } = useTaskRightSide(task);
  const handleTaskClick = useTaskClick(task);

  const rightSideContent = (() => {
    switch (type) {
      case 'reward':
        return task.type === 'daily'
          ? <span>{`+${content.base} (+${content.bonus})`}</span>
          : <span>{`+${content.base}`}</span>
      case 'check':
        return <div>{content}</div>;
      case 'countdown':
        return <span>{`${content.hours}:${content.minutes}:${content.seconds}`}</span>;
      default:
        return <span>{content || 'Task unavailable'}</span>;
    }
  })()

  return (
    <Button
      as='a'
      href='#'
      onClick={handleTaskClick}
      variant='primary'
      size='medium'
      className={clsx(
        classes.taskItem,
        classes[task.type],
        className
      )}
      {...props}
    >
      <div className={classes.content}>
        <div className={classes.leftSide}>
          <span className={classes.title}>{task.title}</span>
        </div>
        <div className={classes.rightSide}>
          {rightSideContent}
        </div>
      </div>
    </Button>
  );
};