import { useCallback } from "react"
import { useLevelStore } from "../stores/useLevelStore"

export const useLevel = () => {
  // Store states
  const levels = useLevelStore(state => state.levels)

  // Store actions
  const fetchLevels = useLevelStore(state => state.fetchLevels)
  const fetchById = useLevelStore(state => state.fetchById)
  const saveLevel = useLevelStore(state => state.saveLevel)
  const deleteLevel = useLevelStore(state => state.deleteLevel)

  // Store loading states
  const isFetchingLevels = useLevelStore(state => state.isFetchingLevels)

  const handleFetchLevels = useCallback(async (params) => {
    try {
      await fetchLevels(params)
    } catch (error) {
      console.error('Fetching all levels failed:', error)
    }
  }, [fetchLevels])

  const handleFetchById = useCallback(async (id) => {
    try {
      return await fetchById(id)
    } catch (error) {
      console.error('Fetching level by ID failed:', error)
    }
  }, [fetchById])

  const handleSaveLevel = useCallback(async (levelData) => {
    try {
      return await saveLevel(levelData)
    } catch (error) {
      console.error('Creating / Saving level failed:', error)
    }
  }, [saveLevel])

  const handleDeleteLevel = useCallback(async (id) => {
    try {
      await deleteLevel(id)
    } catch (error) {
      console.error('Deleting level failed:', error)
    }
  }, [deleteLevel])

  return {
    levels,
    fetchLevels: handleFetchLevels,
    fetchById: handleFetchById,
    saveLevel: handleSaveLevel,
    deleteLevel: handleDeleteLevel,
    isFetchingLevels
  }
}