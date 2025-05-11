import { useMemo } from "react"
import { useTasks } from "./useTasks"

export const useMandatoryTasksCompleted = () => {
  const { mandatory, isLoading } = useTasks();

  const isAllCompleted = useMemo(() => {
    // Handle loading or undefined state
    if (isLoading || !mandatory) return false;

    // Handle empty mandatory tasks case
    if (mandatory.length === 0) return false;

    // Check completion status
    return mandatory.every(task => task.status === 'COMPLETED')
  }, [mandatory, isLoading])
  
  return isAllCompleted
}