export const getGiveawayFloatText = (float) => {
  if (typeof float !== 'number' || float < 0 || float > 1) {
    return 'Invalid'
  }

  const conditions = [
    { max: 0.07, text: 'Factory New' },
    { max: 0.15, text: 'Minimal Wear' },
    { max: 0.38, text: 'Field-Tested' },
    { max: 0.45, text: 'Well-Worn' },
    { max: 1, text: 'Battle-Scarred' }
  ]

  return conditions.find(condition => float <= condition.max)?.text || 'N/A'
}