import { useMemo } from 'react';
import { useTaskUserStore } from "../stores/useTaskUserStore";
import { useTaskTimerStore } from "../stores/useTaskTimerStore";
import { useTaskRewards } from "./useTaskRewards";
import checkIcon from "../assets/checkIcon.svg";


/*
  Returns rendering logic for the right side of a task item:
  - { type: 'reward', content: number }
  - { type: 'check', content: icon }
  - { type: 'countdown', content: timeLeft }
  - { type: 'error', content: error}
*/

export const useTaskRightSide = (task) => {
  const userTasks = useTaskUserStore(state => state.userTasks);
  const getIsExpired = useTaskTimerStore(state => state.getIsExpired);
  const getTimeLeft = useTaskTimerStore(state => state.getTimeLeft);
  const calculateTaskReward = useTaskRewards();

  return useMemo(() => {
    const validTaskTypes = ['mandatory', 'daily'];

    // Error cases
    if (!task?.type || !validTaskTypes.includes(task.type)) {
      return { type: "error", content: "Invalid task type" };
    }

    const reward = calculateTaskReward(task);
    if (!reward) {
      return { type: "error", content: "Reward calculation failed" };
    }

    // Mandatory tasks
    if (task.type === "mandatory") {
      const userTask = userTasks.find(ut => ut.taskId === task.id);
      return userTask?.status === "COMPLETED"
        ? { type: "check", content: checkIcon }
        : { type: "reward", content: reward };
    }

    // Daily tasks
    if (task.type === "daily") {
      return getIsExpired(task.id)
        ? { type: "reward", content: reward }
        : { type: "countdown", content: getTimeLeft(task.id) };
    }

    // Fallback (should never reach here due to validation)
    return { type: "error", content: "Unknown task state" };
  }, [task, userTasks, getIsExpired, getTimeLeft, calculateTaskReward]);
};