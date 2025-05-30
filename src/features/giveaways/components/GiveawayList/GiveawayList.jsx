import { useEffect, useMemo } from 'react'
import { useGiveaways } from '../../hooks/useGiveaways'
import GiveawayItem from '../GiveawayItem/GiveawayItem'
import SectionBox from '@/components/sections/SectionBox/SectionBox'
import Error from '@/components/ui/Error/Error'
import classes from './GiveawayList.module.css'

const GiveawayList = () => {
  const { activeGiveaways, fetchActive } = useGiveaways()

  useEffect(() => {
    fetchActive()
  }, [fetchActive])

  const monthlyGiveaway = useMemo(() =>
    activeGiveaways instanceof Array
      ? activeGiveaways.find(ag => ag.type === 'MONTHLY')
      : [], [activeGiveaways])
  const specialGiveaway = useMemo(() =>
    activeGiveaways instanceof Array
      ? activeGiveaways.find(ag => ag.type === 'SPECIAL')
      : [], [activeGiveaways])
  const twitchGiveaway = useMemo(() =>
    activeGiveaways instanceof Array
      ? activeGiveaways.find(ag => ag.type === 'TWITCH')
      : [], [activeGiveaways])

  return (
    <div className={classes.giveawayWrapper}>
      {monthlyGiveaway?.length ? (
        <SectionBox
          title='Monthly free drop (~50$)'
          className={classes.giveaway1}
        >
          <GiveawayItem giveaway={monthlyGiveaway} isRedirect={false} className={classes.giveawayItem} />
        </SectionBox>
      ) : (
        <Error error='No giveaways available at the moment' type='empty' />
      )}
      {specialGiveaway?.length ? (
        <SectionBox
          title='SPECIAL DROP'
          className={classes.giveaway2}
        >
          <GiveawayItem giveaway={specialGiveaway} isRedirect={false} className={classes.giveawayItem} />
        </SectionBox>
      ) : (
        <Error className={classes.giveaway2} error='No giveaways available at the moment' type='empty' />
      )}
      {twitchGiveaway?.length ? (
        <SectionBox
          title='Twitch follower drop'
          className={classes.giveaway3}
        >
          <GiveawayItem giveaway={twitchGiveaway} isRedirect={true} className={classes.giveawayItem} />
        </SectionBox>
      ) : (
        <Error error='No giveaways available at the moment' type='empty' />
      )}
    </div>
  )
}

export default GiveawayList