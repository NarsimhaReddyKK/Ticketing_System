import "./styles/Ticket.css"

type TicketProp ={
    state: string
}

export const Ticket = ({state}:TicketProp) => {
  return (
    <div className="ticket">
        <div className="ticket__details">
            <h1 className="ticket__title">Title: </h1>
            <h2 className="ticket__id">Id: </h2>
        </div>
        <h2 className="ticket__status">
            Status: <span className="ticket__state">{state}</span>
        </h2>
    </div>
  )
}
