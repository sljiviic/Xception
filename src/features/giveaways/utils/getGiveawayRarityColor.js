export const getGiveawayRarityColor = (rarity) => {
  if (typeof rarity !== 'number' || rarity < 0 || rarity > 7) {
    return 'Invalid'
  }

  const conditions = [
    { value: 0, color: '#B0C3D9CC' },
    { value: 1, color: '#5E98D9CC' },
    { value: 2, color: '#4B69FFCC' },
    { value: 3, color: '#8847FFCC' },
    { value: 4, color: '#D32CE6CC' },
    { value: 5, color: '#EB4B4BCC' },
    { value: 6, color: '#E4AE39CC' },
    { value: 7, color: '#FFD700CC' },
  ]

  return conditions.find(condition => rarity === condition.value)?.color || 'N/A'
}