import { useMemo, useEffect, useCallback } from 'react'
import { useGiveaways } from '../../hooks/useGiveaways'
import GiveawayItem from '../GiveawayItem/GiveawayItem'
import SectionBox from '@/components/sections/SectionBox/SectionBox'
import Error from '@/components/ui/Error/Error'
import classes from './GiveawayScroller.module.css'

const GiveawayScroller = ({ display = 'daily' }) => {
  const {
    activeGiveaways,
    inactiveGiveaways,
    activeJoined,
    wonGiveaways,
    fetchActive,
    fetchInactive,
    fetchActiveJoined,
    fetchWon
  } = useGiveaways()

  const fetchData = useCallback(async () => {
    try {
      if (display === 'daily') return await fetchActive()
      if (display === 'inactive') return await fetchInactive()
      if (display === 'joined') return await fetchActiveJoined()
      if (display === 'win') return await fetchWon()
    } catch (error) {
      console.error('Error fetching giveaways:', error)
    }
  }, [display, fetchActive, fetchInactive, fetchActiveJoined, fetchWon])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const displayData = useMemo(() => {
    switch (display) {
      case 'daily':
        return {
          data: activeGiveaways instanceof Array ? activeGiveaways?.filter(ag => ag?.type === 'DAILY') : [],
          title: 'Daily free drops (~2$)'
        }
      case 'inactive':
        return {
          data: inactiveGiveaways,
          title: 'Previous drops'
        }
      case 'joined':
        return {
          data: activeJoined,
          title: 'Active drops you have joined'
        }
      case 'win':
        return {
          data: wonGiveaways,
          title: 'Your reward history'
        }
      default:
        return {
          data: [],
          title: ''
        }
    }
  }, [display, activeGiveaways, inactiveGiveaways, activeJoined, wonGiveaways])

  if (!(displayData.data instanceof Array) || !displayData?.data.length) {
    return (
      <Error error='No giveaways available at the moment' type='empty' />
    )
  }

  return (
    <SectionBox
      title={displayData.title}
      className={classes.wrapper}
    >
      <div className={classes.giveawayScroller}>
        {displayData.data.map(giveaway => (
          <div key={giveaway.id} className={classes.scrollerItem}>
            <GiveawayItem giveaway={giveaway} isRedirect={false} className={classes.giveawayItem} />
          </div>
        ))}
      </div>
    </SectionBox>
  )
}

export default GiveawayScroller