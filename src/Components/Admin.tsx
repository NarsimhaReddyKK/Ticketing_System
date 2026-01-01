import { ChangeTicket } from "./ChangeTicket"
import { Header } from "./header"
import "./styles/Admin.css"

export const Admin = () => {
  return (
    <div>
        <Header admin={true}/>
        <div className="ticket__container">
            <ChangeTicket/>
        </div>
    </div>
  )
}
