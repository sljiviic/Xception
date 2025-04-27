import { useRef } from "react";
import classes from './GiveawayScroller.module.css';
import SectionBox from '@/components/sections/SectionBox/SectionBox';
import ImageButton from "@/components/ui/ImageButton/ImageButton";

const GiveawayScroller = ({ title, subtitle, content }) => {
  const scrollerRef = useRef(null);

  return (
    <SectionBox title={title} subtitle={subtitle}>
      <div className={classes.giveawayScroller} ref={scrollerRef}>
        {content.map((element) => (
          <div key={element.id} className={classes.scrollerItem}>
            <ImageButton
              image={element.img}
              imageAlt={element.alt}
              disabled={element.disabled}
            />
          </div>
        ))}
      </div>
    </SectionBox>
  );
};

export default GiveawayScroller;