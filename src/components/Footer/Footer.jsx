import './Footer.css'
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks'

import logo from '../../assets/xwhite.svg'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__top">

        <a href="#" className="footer__top__col logo">
          <img
            src={logo}
            alt="Logo"
            width="151px"
            height="48px"
            className='scale1'
          />
        </a>



        <div className="footer__top__col nav">
          <div className="footer__top__sub-col">
            <h3>Pages</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Giveaways</a></li>
              <li><a href="#">Leaderboard</a></li>
              <li><a href="#">Bonuses</a></li>
            </ul>
          </div>
          <div className="footer__top__sub-col">
            <h3>Papers</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">T&C</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer__top__sub-col">
            <h3>Contact</h3>
            <ul>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Email</a></li>
            </ul>
          </div>
        </div>



        <div className="footer__top__col socials">
          <h3>STAY CONNECTED</h3>
          <SocialMediaLinks className="social-links--small" />
        </div>
      </div>



      <div className="footer__bottom">
        <p>Betting is for 18+ individuals only. Gamble responsibly. Ensure you understand the risks involved and seek help if needed. Participation is at your own risk. Terms and conditions apply.</p>
        <p className='footer__bottom-copyright'>© 2025 xception - all rights reserved</p>
      </div>
    </div>
  )
}

export default Footer