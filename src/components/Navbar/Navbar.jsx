import './Navbar.css'

import logo from '../../assets/xwhite.svg'
import iconCoins from '../../assets/coins 1.svg'
import iconTransit from '../../assets/transit 1.svg'
import iconTicket from '../../assets/ticketspecial 1.svg'
import iconPlus from '../../assets/addition 1.svg'
import iconPeople from '../../assets/people 1.svg'

const Navbar = ({ isOpen, toggleDropdown }) => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">
          <img
            src={logo}
            alt="Xception's logo"
            width="151px"
            height="48px"
            className='scale1'
          />
        </div>

        <ul className="navbar__links">
          <li><a href="#">HOME</a></li>
          <li><a href="#">GIVEAWAYS</a></li>
          <li><a href="#">BONUSES</a></li>
          <li><a href="#">LEADERBOARD</a></li>
        </ul>

        <div className="navbar__right-side">
          <ul className="navbar__resources">
            <li><a href="#"><span>100</span><img src={iconCoins} alt="Coins icon" /></a></li>
            <li><a href="#"><span>72</span><img src={iconTransit} alt="Transit icon" /></a></li>
            <li><a href="#"><span>100</span><img src={iconTicket} alt="Ticket icon" /><img src={iconPlus} alt="Plus icon" /></a></li>
          </ul>
          <a href="#">
            <img
              src={iconPeople}
              className='navbar__profile-ico scale1'
              alt="People icon"
              width="24.81px"
              height="24.81px"
            />
          </a>
          <i className={`${isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} navbar__toggle-btn`} onClick={toggleDropdown}></i>
        </div>
      </nav>

      <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        <li><a href="#">HOME</a></li>
        <li><a href="#">GIVEAWAYS</a></li>
        <li><a href="#">BONUSES</a></li>
        <li><a href="#">LEADERBOARD</a></li>
        <hr className="divider" />
        <li className='dropdown-menu_resources'>
          <a href="#"><span>100</span><img src={iconCoins} alt="Coins icon" /></a>
          <a href="#"><span>72</span><img src={iconTransit} alt="Transit icon" /></a>
          <a href="#"><span>100</span><img src={iconTicket} alt="Ticket icon" /><img src={iconPlus} alt="Plus icon" /></a>
        </li>
      </ul>
    </>
  )
}

export default Navbar