import { create } from 'zustand'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import duration from 'dayjs/plugin/duration'

dayjs.extend(isToday)
dayjs.extend(duration)

export const useTaskTimerStore = create((set, get) => ({
  timers: {}, // { [taskId]: { timeLeft, isExpired } }
  intervals: {},

  startTimer: (taskId, completedAt) => {
    const clear = get().clearTimer
    clear(taskId)

    if (!completedAt || !dayjs(completedAt).isToday()) {
      set(state => ({
        timers: { ...state.timers, [taskId]: { timeLeft: null, isExpired: true } }
      }))
      return
    }

    const tick = () => {
      const now = dayjs()
      const midnight = dayjs().endOf('day').add(1, 'second')
      const diff = midnight.diff(now)

      if (diff <= 0) {
        clear(taskId)
        set(state => ({
          timers: { ...state.timers, [taskId]: { timeLeft: null, isExpired: true } }
        }))
      } else {
        const d = dayjs.duration(diff)
        set(state => ({
          timers: {
            ...state.timers,
            [taskId]: {
              timeLeft: {
                hours: d.hours().toString().padStart(2, '0'),
                minutes: d.minutes().toString().padStart(2, '0'),
                seconds: d.seconds().toString().padStart(2, '0')
              },
              isExpired: false
            }
          }
        }))
      }
    }

    tick()
    const interval = setInterval(tick, 1000)
    set(state => ({
      intervals: { ...state.intervals, [taskId]: interval }
    }))
  },

  clearTimer: (taskId) => {
    const interval = get().intervals[taskId]
    if (interval) {
      clearInterval(interval)
    }

    set(state => {
      const newIntervals = { ...state.intervals }
      delete newIntervals[taskId]

      return { intervals: newIntervals }
    })
  },

  getTimeLeft: (taskId) => get().timers[taskId]?.timeLeft,
  getIsExpired: (taskId) => get().timers[taskId]?.isExpired ?? true
}))