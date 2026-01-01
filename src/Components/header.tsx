import "./styles/header.css"
import { Link } from "react-router-dom";

type HeaderProp={
  admin:boolean
}

export const Header = ({admin}:HeaderProp) => {
  return (
    <div className="header_container">
        <ul className="header">
            <li className="header__list"><Link className="header__link" to="/">Home</Link></li>
            {admin&&<li className="header__list"><Link className="header__link" to="/">Admin</Link></li>}
            <li className="header__list"><Link className="header__link" to="/form">Form</Link></li>
            <li className="header__list"><Link className="header__link" to="/">Tickets</Link></li>
            <li className="header__list log"><Link className="header__link" to="/login"><span className="logout">Logout</span>📴</Link></li>
        </ul>
    </div>
  )
}
