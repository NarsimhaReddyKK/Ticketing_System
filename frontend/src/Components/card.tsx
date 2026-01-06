import "./styles/card.css"
type cardProps = {
    count: number,
    name: string
}

export const Card = ({count, name}: cardProps) => {
  return (
    <div className="cardsection">
        <p className="card__h1">{name}: {count}</p>
    </div>
  )
}
