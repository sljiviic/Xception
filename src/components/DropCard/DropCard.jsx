import './DropCard.css'

const DropCard = ({ children }) => {
  return (
    <div className="drop-card">
      <h2 className="drop-card_title">Daily free drops (~2$)</h2>
      {children}
    </div>
  )
}

export default DropCard