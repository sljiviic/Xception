import classes from './SocialSection.module.css'
import SectionBox from '../SectionBox/SectionBox'
import clsx from 'clsx'

import { SOCIAL_MEDIA_LINKS } from './constants'

const SocialSection = ({
  title = 'STAY CONNECTED',
  size = 'medium',
  className
}) => {
  const wrapperClass = clsx(
    classes.wrapper,
    className
  )

  const socialsClass = clsx(
    classes.socials,
    classes[size]
  )

  return (
    <SectionBox
      title={title}
      className={wrapperClass}
    >
      <div className={socialsClass}>
        {SOCIAL_MEDIA_LINKS.map(link => (
          <a
            key={link.name}
            href={link.url}
            aria-label={link.ariaLabel}
            target='_blank'
          >
            <img src={link.icon} alt={link.name} />
          </a>
        ))}
      </div>
    </SectionBox>
  )
}

export default SocialSection