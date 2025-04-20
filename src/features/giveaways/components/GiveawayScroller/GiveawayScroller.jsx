import { useRef, useEffect } from "react"
import classes from './GiveawayScroller.module.css'
import SectionBox from '@/components/sections/SectionBox/SectionBox'
import ImageButton from "@/components/ui/ImageButton/ImageButton"

const GiveawayScroller = ({
  title,
  subtitle,
  content,
}) => {
  const scrollerRef = useRef(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const handleWheelScroll = e => {
      e.preventDefault()
      scroller.scrollLeft += e.deltaY
    }

    scroller.addEventListener("wheel", handleWheelScroll)

    return () => scroller.removeEventListener("wheel", handleWheelScroll)
  }, [])

  return (
    <SectionBox
      title={title}
      subtitle={subtitle}
    >
      <div className={classes.giveawayScroller} ref={scrollerRef}>
        {content.map((element) =>
          <ImageButton
            key={element.id}
            image={element.img}
            imageAlt={element.alt}
            disabled={element.disabled}
            // onClick={onClick}
          />
        )}
      </div>
    </SectionBox>
  )
}

export default GiveawayScroller