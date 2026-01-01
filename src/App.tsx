import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Ticket_Form } from './Components/Ticket_Form'
import { Home } from './Components/Home'
import { Login } from './Components/login'
import { useState } from "react";
import { Nadmin } from './Components/Nadmin'
import { Tickets } from './Components/Tickets'

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home admin={admin}/>}/>
        <Route path='/form' element={<Ticket_Form/>}/>
        <Route path='/tickets' element={<Tickets/>}/>
        {admin&&<Route path='/admin' element={<Home admin={admin}/>}/>}
        {!admin&&<Route path='/admin' element={<Nadmin/>}/>}
        <Route path='/login' element={<Login email={email} password={password} setEmail={setEmail} setPassword={setPassword}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
