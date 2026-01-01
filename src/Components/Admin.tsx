import { ChangeTicket } from "./ChangeTicket"
import { Header } from "./header"
import { SearchBar } from "./SearchBar"
import "./styles/Admin.css"

export const Admin = () => {
  return (
    <div>
        <Header admin={true}/>
        <div className="searchbar__container">
          <SearchBar usage="Tickets"/>
        </div>
        <div className="ticket__container">
            <ChangeTicket desc="Cigarettes are going to get expensive from February 1 as the government on Wednesday notified revised duties on cigarettes and other tobacco products. The revised tax on cigarettes will be based on the length of the stick and as per reports the prices are expected to go up by 20-30 per cent once these hikes are effective."/>
            <ChangeTicket desc="The revised tax on cigarettes will be based on the length"/>
        </div>
    </div>
  )
}
