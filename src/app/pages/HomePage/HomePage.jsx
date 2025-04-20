import classes from './HomePage.module.css'
import hero from '@/assets/hero.svg'
import BonusCard from '@/features/bonuses/components/BonusCard/BonusCard'

import bonusImage from '@/assets/bonus-image.svg'
import GiveawayScroller from '@/features/giveaways/components/GiveawayScroller/GiveawayScroller'
import image from '@/assets/test.svg'
import image2 from '@/assets/test2.png'
import Giveaway from '@/features/giveaways/components/Giveaway/Giveaway'
import SocialSection from '@/components/sections/SocialSection/SocialSection'

const HomePage = () => {

  return (
    <>
      <a
        href='https://www.twitch.tv/xxceptionn_'
        target='_blank'
        className={classes.hero}
      >
        <img
          src={hero}
          alt="A hero image"
        />
      </a>
      <div className={classes.bonusCardWrapper}>
        <BonusCard
          variant='primary'
          title='BONUS NUMERO UNO'
          image={bonusImage}
          href='https://bc.game/i-2zen9i81z-n/'
          text={
            <>
              <p>Bonus number uno gets u this and this and this add add add</p>
              <p>Take it like this and this</p>
            </>
          }
        />
        <BonusCard
          variant='primary'
          title='BONUS NUMERO UNO'
          image={bonusImage}
          href='https://500.casino/r/XXCEPTIONN'
          text={
            <>
              <p>Bonus number uno gets u this and this and this add add add</p>
              <p>Take it like this and this</p>
            </>
          }
        />
      </div>
      <div className={classes.GiveawayScrollerWrapper}>
        <GiveawayScroller
          title='Daily free drops (~2$)'
          content={[
            { img: image, alt: "A drop you don't want to miss", id: "1" },
            { img: image, alt: "A drop you don't want to miss", id: "2" },
            { img: image, alt: "A drop you don't want to miss", id: "3" },
            { img: image, alt: "A drop you don't want to miss", id: "4" },
            { img: image, alt: "A drop you don't want to miss", id: "5" },
            { img: image, alt: "A drop you don't want to miss", id: "6" },
            { img: image, alt: "A drop you don't want to miss", id: "7" },
          ]}
        />
      </div>
      <div className={classes.giveawayWrapper}>
        <Giveaway
          title='Monthly free drop (~50$)'
          image={image2}
          imageAlt='heyy'
          className={classes.giveaway1}
        />
        <Giveaway
          title='Monthly free drop (~50$)'
          image={image2}
          imageAlt='heyy'
          className={classes.giveaway2}
        />
        <Giveaway
          title='Monthly free drop (~50$)'
          image={image2}
          imageAlt='heyy'
          className={classes.giveaway3}
          btnClassName={classes.giveaway3Btn}
        />
      </div>
      <div className={classes.socialWrapper}>
        <SocialSection />
      </div>
      <div className={classes.bannersWrapper}>
      <a
        href='https://discord.gg/kCyJta32'
        target='_blank'
        className={classes.banner}
      >
        <img
          src={hero}
          alt="a Promo image"
        />
      </a>
      <a
        href='https://www.twitch.tv/xxceptionn_'
        target='_blank'
        className={classes.banner}
      >
        <img
          src={hero}
          alt="a Promo image"
        />
      </a>
      </div>
    </>
  )
}

export default HomePage