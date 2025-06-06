import { useEffect } from 'react'
import { useBonus } from '../../hooks/useBonus'
import BonusCard from '../BonusCard/BonusCard'
import Error from '@/components/ui/Error/Error'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'


const BonusList = ({ limit, variant, className }) => {
  const {
    bonuses,
    isFetchingBonuses,
    isFetchingUserBonuses,
    fetchBonuses,
    fetchUserBonuses,
    hasClaimedBonus
  } = useBonus()

  useEffect(() => {
    fetchBonuses({ pageSize: limit })
    fetchUserBonuses({ pageSize: limit })
  }, [fetchBonuses, fetchUserBonuses, limit])

  if (!(bonuses instanceof Array) || !bonuses.length) return <Error error='No bonuses available at the moment' type='empty' />
  if (isFetchingBonuses || isFetchingUserBonuses) return <LoadingSpinner text='Loading Bonuses...' size='medium' />

  return (
    <div className={className}>
      {bonuses.items.map(bonus => (
        <BonusCard
          key={bonus?.id}
          bonus={bonus}
          isClaimed={hasClaimedBonus(bonus?.id)}
          variant={variant}
        />
      ))}
    </div>
  )
}

export default BonusList