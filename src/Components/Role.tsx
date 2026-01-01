import { Header } from "./header"
import { SearchBar } from "./SearchBar"
import "./styles/Role.css"
import { User } from "./User"

export const Role = () => {
  return (
    <div>
        <Header admin={true}/>
        <div className="searchbar__container">
          <SearchBar usage="User"/>
        </div>
        <div className="ticket__container">
            <User/>
        </div>
    </div>
  )
}
