import "./styles/Ticket.css"

type TicketProp ={
    state: string,
    desc: string
}

export const Ticket = ({state, desc}:TicketProp) => {
  return (
    <div className="ticket">
        <div className="ticket__details">
            <h2 className="ticket__id">Id: </h2>
            <h1 className="ticket__title">Title: </h1>
            <h2 className="ticket__id">Description: </h2>
            <p className="ticket__p">{desc}</p>
        </div>
        <h2 className="ticket__status">
            Status: <span className="ticket__state">{state}</span>
        </h2>
    </div>
  )
}
