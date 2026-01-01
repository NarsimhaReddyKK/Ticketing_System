import { Card } from "./card"
import { Header } from "./header"
import "./styles/home.css"

type HomeProps ={
  admin:boolean
}

export const Home = ({admin}:HomeProps) => {
  return (
    <div>
        <Header admin={admin}/>
        <div className="card__container">
            <Card count={0} name="Open"></Card>
            <Card count={0} name="InProgress"></Card>
            <Card count={0} name="Closed"></Card>
            <Card count={0} name="Total"></Card>
        </div>
    </div>
  )
}
