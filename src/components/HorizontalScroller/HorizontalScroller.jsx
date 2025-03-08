import { useRef, useEffect } from "react"
import './HorizontalScroller.css'

import image from '../../assets/image.svg'

const content = [
  { img: image, alt: "A drop you don't want to miss", url: "#" },
  { img: image, alt: "A drop you don't want to miss", url: "#" },
  { img: image, alt: "A drop you don't want to miss", url: "#" },
  { img: image, alt: "A drop you don't want to miss", url: "#" },
  { img: image, alt: "A drop you don't want to miss", url: "#" },
  { img: image, alt: "A drop you don't want to miss", url: "#" },
  { img: image, alt: "A drop you don't want to miss", url: "#" },
]

const HorizontalScroller = () => {
  const scrollerRef = useRef(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const handleWheelScroll = (e) => {
      e.preventDefault()
      scroller.scrollLeft += e.deltaY
    }

    scroller.addEventListener("wheel", handleWheelScroll)

    return () => scroller.removeEventListener("wheel", handleWheelScroll)
  }, [])

  return (
    <div className="horizontal-scroller" ref={scrollerRef}>
      {content.map((element, index) =>
        <a key={index} href={element.url}>
          <img
            src={element.img}
            alt={element.alt}
            className="scale1"
          />
        </a>
      )}
    </div>
  )
}

export default HorizontalScroller