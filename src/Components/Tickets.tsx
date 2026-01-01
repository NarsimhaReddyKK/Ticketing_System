import { Header } from "./header"
import "./styles/Tickets.css"
import { Ticket } from "./Ticket"

export const Tickets = () => {
  return (
    <div>
        <Header admin={true}/>
        <div className="ticket__container">
          <Ticket state=""/>
          <Ticket state="InProgress"/>
        </div>
    </div>
  )
}
