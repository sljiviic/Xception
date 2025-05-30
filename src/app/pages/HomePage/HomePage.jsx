import { BonusList } from '@/features/bonuses'
import { GiveawayScroller, GiveawayList } from '@/features/giveaways'
import SocialSection from '@/components/sections/SocialSection/SocialSection'
import Banner from '@/components/ui/Banner/Banner'
import classes from './HomePage.module.css'
import hero from '@/assets/hero.svg'
import banner1 from '@/assets/banner1.svg'
import banner2 from '@/assets/banner2.svg'

const HomePage = () => {
  return (
    <div className='pageOpeningAnimation'>
      <Banner
        href='https://www.twitch.tv/xxceptionn_'
        target='_blank'
        image={hero}
        imageAlt='A hero image'
      />
      <BonusList
        limit={2}
        variant='primary'
        className={classes.bonusList}
      />
      <GiveawayScroller display='daily' />
      <GiveawayList />
      < div className={classes.socialWrapper} >
        <SocialSection />
      </div >
      <div className={classes.bannerWrapper}>
        <Banner
          href='https://discord.gg/kCyJta32'
          target='_blank'
          image={banner1}
          imageAlt='A link to my Discord server'
          className={classes.banner}
        />
        <Banner
          href='https://www.twitch.tv/xxceptionn_'
          target='_blank'
          image={banner2}
          imageAlt='A link to my Twitch profile'
          className={classes.banner}
        />
      </div >
    </div>
  )
}

export default HomePage