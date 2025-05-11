import { TaskItem } from "../../features/tasks/components/TaskItem/TaskItem"
import { useMemo } from "react"
const GiveawaysPage = () => {
  const task = useMemo(() => {
    return {
      id: 12,
      type: 'daily',
      title: 'Follow on Twitch',
      baseReward: 6
    }
  }, [])

  return (
    <div>
      <TaskItem
        task={task}
      />
    </div>
  )
}

export default GiveawaysPage