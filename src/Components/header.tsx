import api from "../api/axios";
import "./styles/header.css"
import { Link, useNavigate } from "react-router-dom";

type HeaderProp={
  admin:string|null
}

export const Header = ({admin}:HeaderProp) => {
  const navigate = useNavigate();
  const logout = async()=>{
    try{
      const res = await api.post("/auth/logout");
      navigate("/login");
      console.log(res.data);
    }catch(err){
      console.log("Failed to login: ", err);
    }
  }

  return (
    <div className="header_container">
        <ul className="header">
            <li className="header__list"><Link className="header__link" to="/">Home</Link></li>
            {admin==="admin"&&<li className="header__list"><Link className="header__link" to="/admin">Admin</Link></li>}
            <li className="header__list"><Link className="header__link" to="/form">Form</Link></li>
            <li className="header__list"><Link className="header__link" to="/tickets">Tickets</Link></li>
            {admin==="admin"&&<li className="header__list"><Link className="header__link" to="/role">Role</Link></li>} 
            <li className="header__list log" onClick={logout}><span className="logout">Logout</span>📴</li>
        </ul>
    </div>
  )
}
