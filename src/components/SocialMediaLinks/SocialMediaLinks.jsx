import './SocialMediaLinks.css'

import twitch from '../../assets/6.svg'
import instagram from '../../assets/2.svg'
import youtube from '../../assets/5.svg'
import tiktok from '../../assets/3.svg'
import x from '../../assets/4.svg'
import discord from '../../assets/1.svg'

const socialLinks = [
  { img: twitch, url: "#", alt: "Twitch icon" },
  { img: instagram, url: "#", alt: "Instagram icon" },
  { img: youtube, url: "#", alt: "Youtube icon" },
  { img: tiktok, url: "#", alt: "Tiktok icon" },
  { img: x, url: "#", alt: "X icon" },
  { img: discord, url: "#", alt: "Discord icon" }
]

const SocialMediaLinks = ({ className = '' }) => {
  return (
    <div className={`social-links ${className}`}>
      {socialLinks.map((item, index) => (
        <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
          <img
            src={item.img}
            alt={item.alt}
            width="96px"
            height="92px"
            className='scale2'
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;