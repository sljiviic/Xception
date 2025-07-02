import { useEffect, useState } from 'react'
import { useLevel } from './useLevel'

export const useLevelBonus = (id) => {
  const { fetchById } = useLevel()
  const [userLevel, setUserLevel] = useState(null)

  useEffect(() => {
    const fetchLevel = async () => {
      const response = await fetchById(id)
      setUserLevel(response)
    }

    fetchLevel()
  }, [fetchById, id])

  const currentLevel = userLevel?.id || 0

  if (!userLevel) return 0
  if (currentLevel <= 4) return userLevel.addTickets
  return userLevel.multiplyTickets
}