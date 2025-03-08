import './BonusCard.css'

const BonusCard = ({ image, title, text }) => {
  return (
    <div className="bonus-card">
      <div className="bonus-card__wrapper1">
        <img
          src={image}
          alt="Bonus offer: Get 180% deposit bonus"
          width="300px"
          height="150px"
        />
      </div>
      <div className="bonus-card__wrapper2">
        <h2>{title}</h2>
        <div>
          {text.map((element, index) =>
            <p key={index}>{element}</p>
          )}
        </div>
        <button type='button'>CLAIM BONUS</button>
      </div>
    </div>
  )
}

export default BonusCard