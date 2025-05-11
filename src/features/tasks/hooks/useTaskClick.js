import { useCallback, useRef, useEffect } from 'react';
import { useTaskUserStore } from '../stores/useTaskUserStore';
import { useTaskCompletion } from './useTaskCompletion'
import { useTaskTimerStore } from '../stores/useTaskTimerStore';

export const useTaskClick = (task) => {
  const createUserTask = useTaskUserStore(state => state.createUserTask)
  const isLoading = useTaskUserStore(state => state.isLoading)
  const getIsExpired = useTaskTimerStore(state => state.getIsExpired)
  const completeUserTask = useTaskCompletion()
  const pendingCompletionRef = useRef(null)

  const handleTaskClick = useCallback(async (e) => {
    e.preventDefault()
    if (isLoading) return;

    try {
      // Validate task
      if (!task?.id) {
        throw new Error('Invalid task data');
      }

      // Check cooldown
      const isExpired = getIsExpired(task.id);
      if (!isExpired) return

      // Create pending task
      const taskUser = await createUserTask({
        taskId: task.id,
        status: 'PENDING'
      })

      // Schedule completion
      const timer = setTimeout(async () => {
        try {
          await completeUserTask(taskUser);
        } catch (error) {
          console.error('Auto-completion failed:', error);
        }
      }, 60000);

      pendingCompletionRef.current = { taskUser, timer }
    } catch (error) {
      console.error('Task click failed:', error);
    }

  },
    [completeUserTask, createUserTask, getIsExpired, task, isLoading]
  )

  // Cleanup pending completion on unmount
  useEffect(() => {
    return () => {
      if (pendingCompletionRef.current?.timer) {
        clearTimeout(pendingCompletionRef.current.timer);
      }
    };
  }, [pendingCompletionRef]);

  return handleTaskClick
};