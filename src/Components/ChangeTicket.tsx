import "./styles/ChangeTicket.css"

export const ChangeTicket = () => {
  return (
    <div className="ticket">
        <div className="ticket__details">
            <h1 className="ticket__title">Title: </h1>
            <h2 className="ticket__id">Id: </h2>
        </div>
        <select className="ticket__select">
            <option value="" className="ticket__select-option">Open</option>
            <option value="" className="ticket__select-option">InProgress</option>
            <option value="" className="ticket__select-option">Closed</option>
        </select>
    </div>
  )
}
