import "./styles/ChangeTicket.css"

type ChangeTicketProp ={
    desc:string
}

export const ChangeTicket = ({desc}:ChangeTicketProp) => {
  return (
    <div className="ticket">
        <div className="ticket__details">
            <h2 className="ticket__id">Id: </h2>
            <h1 className="ticket__title">Title: </h1>
            <h2 className="ticket__id">Description: </h2>
            <p className="ticket__p">{desc}</p>
        </div>
        <select className="ticket__select">
            <option value="" className="ticket__select-option">Open</option>
            <option value="" className="ticket__select-option">InProgress</option>
            <option value="" className="ticket__select-option">Closed</option>
        </select>
    </div>
  )
}
