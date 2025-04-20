import ImageButton from "../../../../components/ui/ImageButton/ImageButton"
import SectionBox from "../../../../components/sections/SectionBox/SectionBox"

const Giveaway = ({
  title,
  image,
  imageAlt,
  isNew,
  onClick,
  disabled,
  className,
  btnClassName }) => {
  return (
    <SectionBox
      title={title}
      className={className}
    >
      <ImageButton
        image={image}
        imageAlt={imageAlt}
        onClick={onClick}
        disabled={disabled}
        className={btnClassName}
        isNew={isNew}
      />
    </SectionBox>
  )
}

export default Giveaway