import { useEffect } from 'react'
import { useBonus } from '../../hooks/useBonus'
import { useBonusUser } from '../../hooks/useBonusUser'
import BonusCard from '../BonusCard/BonusCard'
import Error from '@/components/ui/Error/Error'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'


const BonusList = ({ limit, variant, className }) => {
  const {
    bonuses,
    fetchBonuses,
    isFetchingBonuses
  } = useBonus()

  const {
    bonusesUser,
    fetchBonusesUser,
    isFetchingBonusesUser,
    // hasClaimedBonus
  } = useBonusUser()

  useEffect(() => {
    fetchBonuses({ pageSize: limit })
    fetchBonusesUser({ pageSize: limit })
  }, [fetchBonuses, fetchBonusesUser, limit])

  if (isFetchingBonuses || isFetchingBonusesUser) return <LoadingSpinner text='Loading Bonuses...' size='medium' />
  if (!(bonuses.items instanceof Array) || !bonuses.items.length) return <Error error='No bonuses available at the moment' type='empty' />

  return (
    <div className={className}>
      {bonuses.items.map(bonus => (
        <BonusCard
          key={bonus?.id}
          bonus={bonus}
          isClaimed={bonusesUser.items?.some(bu => bu.bonusId === bonus.id)}
          variant={variant}
        />
      ))}
    </div>
  )
}

export default BonusList