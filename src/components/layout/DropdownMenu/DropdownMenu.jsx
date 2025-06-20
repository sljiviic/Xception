import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import clsx from 'clsx'
import classes from './DropdownMenu.module.css'
import { TicketBalance } from '@/features/tickets'
import { useAuthStore } from '@/features/auth'

const DropdownMenu = ({ isOpen, onClose }) => {
  const dropdownMenuRef = useRef(null)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  useClickOutside(dropdownMenuRef, () => {
    if (isOpen) onClose()
  }, isOpen)

  const DropdownMenuClass = clsx(
    classes.dropdownMenu,
    { [classes.open]: isOpen }
  )

  return (
    <ul ref={dropdownMenuRef} className={DropdownMenuClass}>
      <li><Link to='/giveaways' onClick={onClose}>GIVEAWAYS</Link></li>
      <li><Link to='/bonuses' onClick={onClose}>BONUSES</Link></li>
      <li><Link to='leaderboard' onClick={onClose}>LEADERBOARD</Link></li>
      {isAuthenticated && (
        <>
          <li className={classes.divider}><div></div></li>
          <div className={classes.TicketBalance}>
            <TicketBalance />
          </div>
        </>
      )}
    </ul>
  )
}

export default DropdownMenu