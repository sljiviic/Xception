import { useState } from "react"
import './App.css'

import Navbar from "./components/Navbar/Navbar"
import BonusCard from "./components/BonusCard/BonusCard"
import DropCard from "./components/DropCard/DropCard"
import HorizontalScroller from "./components/HorizontalScroller/HorizontalScroller"
import SocialMediaLinks from "./components/SocialMediaLinks/SocialMediaLinks"
import Footer from "./components/Footer/Footer"

import heroImg from "./assets/hero.svg"
import gunImage from "./assets/image2.svg"
import specialOffer1 from "./assets/special-offer1.svg"
import specialOffer2 from "./assets/special-offer2.svg"
import Bonus1 from './assets/bcgame.svg'
import SpecialOffer from "./components/SpecialOffer"

const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = e => {
    e.stopPropagation()
    setIsOpen(prev => !prev)
  }
  const closeDropdown = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div onClick={closeDropdown}>
      <header>
        <Navbar
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
        />
      </header>
      <div className="wrapper">
        <div className="hero">
          <img
            src={heroImg}
            alt="A hero image"
            height="468px"
            width="1404px"
          />
        </div>
        <div className="bonus-card-wrapper">
          <BonusCard
            image={Bonus1}
            title="Bonus Numero uno"
            description={['Bonus number uno gets u this and this and this', 'Take it like this and this']}
          />
          <BonusCard
            image={Bonus1}
            title="Bonus Numero uno"
            description={['Bonus number uno gets u this and this and this', 'Take it like this and this']}
          />
        </div>
        <HorizontalScroller />
        <div className="monthly-free-drop-wrapper">
          <DropCard
            url="#"
            title="Monthly free drop (~50$)"
            image={{
              img: gunImage,
              alt: "alt text",
              width: "408px",
              height: "204px"
            }}
          />
          <DropCard
            url="#"
            title="SPECIAL DROP"
            image={{
              img: gunImage,
              alt: "alt text",
              width: "408px",
              height: "204px"
            }}
          />
          <DropCard
            url="#"
            title="Twitch follower drop"
            image={{
              img: gunImage,
              alt: "alt text",
              width: "408px",
              height: "204px"
            }}
          />
        </div>
        <div className="social-media-wrapper">
          <h2>Stay Connected</h2>
          <SocialMediaLinks />
        </div>
        <div className="special-offer-wrapper">
          <SpecialOffer
            image={{
              img: specialOffer1,
              alt: "An image representing a weakly special offer",
              width: "660px",
              height: "220px"
            }}
          />
          <SpecialOffer
            image={{
              img: specialOffer2,
              alt: "An image representing a weakly special offer",
              width: "660px",
              height: "220px"
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App