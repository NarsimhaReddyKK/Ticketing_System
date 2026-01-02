import "./styles/header.css"
import { Link } from "react-router-dom";

type HeaderProp={
  admin:string
}

export const Header = ({admin}:HeaderProp) => {
  return (
    <div className="header_container">
        <ul className="header">
            <li className="header__list"><Link className="header__link" to="/">Home</Link></li>
            {admin==="admin"&&<li className="header__list"><Link className="header__link" to="/admin">Admin</Link></li>}
            <li className="header__list"><Link className="header__link" to="/form">Form</Link></li>
            <li className="header__list"><Link className="header__link" to="/tickets">Tickets</Link></li>
            {admin==="admin"&&<li className="header__list"><Link className="header__link" to="/role">Role</Link></li>} 
            <li className="header__list log"><Link className="header__link" to="/login"><span className="logout">Logout</span>📴</Link></li>
        </ul>
    </div>
  )
}
