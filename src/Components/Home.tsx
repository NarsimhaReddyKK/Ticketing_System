import { Card } from "./card"
import { Graph } from "./Graphs"
import { Header } from "./header"
import "./styles/home.css"

type HomeProps ={
  admin:string
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
        <Graph/>
    </div>
  )
}
