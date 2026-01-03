import { Header } from "./header"
import { SearchBar } from "./SearchBar"
import "./styles/Role.css"
import { User } from "./User"

type RoleProp ={
  admin:string
}

export const Role = ({admin}:RoleProp) => {
  return (
    <div>
      <div className="fixed">

        <Header admin={admin}/>
        <div className="searchbar__container">
          <SearchBar usage="User"/>
        </div>
      </div>
        <div className="ticket__container">
            <User/>
        </div>
    </div>
  )
}
