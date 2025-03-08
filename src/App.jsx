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
            text={['Bonus number uno gets u this and this and this', 'Take it like this and this']}
          />
          <BonusCard
            image={Bonus1}
            title="Bonus Numero uno"
            text={['Bonus number uno gets u this and this and this', 'Take it like this and this']}
          />
        </div>
        <div className="daily-free-drops-wrapper">
          <DropCard>
            <HorizontalScroller />
          </DropCard>
        </div>
        <div className="monthly-free-drop-wrapper">
          <DropCard>
            <a href="#">
              <img
                src={gunImage}
                alt="Special drop"
                className="scale1"
              />
            </a>
          </DropCard>
          <DropCard>
            <a href="#">
              <img
                src={gunImage}
                alt="Special drop"
                className="scale1"
              />
            </a>
          </DropCard>
          <DropCard>
            <a href="#">
              <img
                src={gunImage}
                alt="Special drop"
                className="scale1"
              />
            </a>
          </DropCard>
        </div>
        <div className="social-media-wrapper">
          <h2>Stay Connected</h2>
          <SocialMediaLinks />
        </div>
        <div className="special-offer">
          <a href="#" className="specail-offer__1">
            <img
              src={specialOffer1}
              alt="An image representing a weakly special offer"
              className="scale1"
            />
          </a>
          <a href="#" className="specail-offer__2">
            <img
              src={specialOffer2}
              alt="An image representing a weakly special offer"
              className="scale1"
            />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App