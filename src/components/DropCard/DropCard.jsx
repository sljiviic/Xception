import './DropCard.css'

const DropCard = ({ url, title, image }) => {
  return (
    <a href={url} className="drop-card">
      <h2 className="drop-card__title">{title}</h2>
      <img
        src={image.img}
        alt={image.alt}
        width={image.width || "auto"}
        height={image.height || "auto"}
        className='scale1'
      />
    </a>
  )
}

export default DropCard