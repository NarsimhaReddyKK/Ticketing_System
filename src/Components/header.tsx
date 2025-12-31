import "./styles/header.css"
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header_container">
        <ul className="header">
            <li className="header__list"><Link className="header__link" to="/">Home</Link></li>
            <li className="header__list"><Link className="header__link" to="/">Admin</Link></li>
            <li className="header__list"><Link className="header__link" to="/form">Form</Link></li>
            <li className="header__list"><Link className="header__link" to="/">Tickets</Link></li>
        </ul>
    </div>
  )
}
