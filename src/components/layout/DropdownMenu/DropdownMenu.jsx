import { Link } from 'react-router-dom'
import classes from './DropdownMenu.module.css'
import clsx from 'clsx'

import ticketIconMain from '@/assets/icons/ticket-main.svg'
import ticketIconAccent from '@/assets/icons/ticket-accent.svg'
import plusIcon from '@/assets/icons/plus.svg'

const DropdownMenu = ({ ref, isOpen, onClose }) => {

  const DropdownMenuClass = clsx(
    classes.dropdownMenu,
    { [classes.open]: isOpen }
  )

  return (
    <ul ref={ref} className={DropdownMenuClass}>
      <li><Link to='/giveaways' onClick={onClose}>GIVEAWAYS</Link></li>
      <li><Link to='/bonuses' onClick={onClose}>BONUSES</Link></li>
      <li><Link to='leaderboard' onClick={onClose}>LEADERBOARD</Link></li>
      <li className={classes.divider}><div></div></li>
      <li className={classes.balanceWrapper}>
        <a href="#"><span>72</span><img src={ticketIconMain} alt="Transit icon" /></a>
        <a href="#"><span>100</span><img src={ticketIconAccent} alt="Ticket icon" /><img src={plusIcon} alt="Plus icon" /></a>
      </li>
    </ul>
  )
}

export default DropdownMenu