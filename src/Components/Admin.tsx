import { Header } from "./header"
import "./styles/Admin.css"
export const Admin = () => {
  return (
    <div>
        <Header admin={true}/>
        <div>Admin</div>
    </div>
  )
}
