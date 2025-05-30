import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { GiveawayScroller, GiveawayList } from '@/features/giveaways'
import { TicketConversionModal } from '@/features/tickets'
import { TaskList } from '@/features/tasks'
import { LevelProgress } from '@/features/user'
import IntroSection from '@/components/sections/IntroSection/IntroSection'
import Banner from '../../../components/ui/Banner/Banner'
import classes from './GiveawaysPage.module.css'
import specialDrops from '@/assets/specialDrops.svg'

const GiveawaysPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const tasksRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollToTasks && tasksRef.current) {
      tasksRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [location])

  return (
    <div className='pageOpeningAnimation'>
      <IntroSection
        title='JOIN FREE GIVEAWAYS'
        subtitle={'Get tickets by doing easy tasks\nThe more tickets - the better. Unlock levels and boost your gain'}
      />
      <GiveawayScroller display='daily' />
      <GiveawayList />
      <div className={classes.tasksWrapper}>
        <TaskList ref={tasksRef} />
        <LevelProgress />
      </div>
      <GiveawayScroller display='inactive' />
      <Banner
        as='button'
        onClick={e => {
          e.stopPropagation()
          setIsModalOpen(true)
        }}
        image={specialDrops}
        imageAlt='Buy special tickets'
      />
      <TicketConversionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default GiveawaysPage