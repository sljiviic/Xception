const SpecialOffer = ({ image }) => {
  return (
    <a href="#" className="special-offer">
      <img
        src={image.img}
        alt={image.alt}
        width={image.width || 0}
        height={image.height || 0}
        className="scale1"
      />
    </a>
  )
}

export default SpecialOffer