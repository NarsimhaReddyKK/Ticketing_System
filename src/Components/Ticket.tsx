import "./styles/Ticket.css"

type TicketProp ={
    id:number,
    title:string,
    state: string,
    desc: string,
    timestamp: string
}

export const Ticket = ({id, title, state, desc, timestamp}:TicketProp) => {
  return (
    <div className="ticket">
        <div className="ticket__details">
          <div className="ticket__header">
            <h2 className="ticket__id">#{id} </h2>
            <span className="ticket__timestamp">{timestamp}</span>
          </div>
            <h1 className="ticket__title"><span className="ticket__title-span">{title}</span></h1>
            <h2 className="ticket__id">{desc}</h2>
        </div>
        <h2 className="ticket__status">
            Status: <span className="ticket__state">{state}</span>
        </h2>
    </div>
  )
}
