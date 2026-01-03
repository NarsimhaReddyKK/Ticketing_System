import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Ticket_Form } from './Components/Ticket_Form'
import { Home } from './Components/Home'
import { Login } from './Components/login'
import { useState } from "react";
import { Nadmin } from './Components/Nadmin'
import { Tickets } from './Components/Tickets'
import { Signup } from './Components/signup'
import { Admin } from './Components/Admin'
import { Role } from './Components/Role'

type TicketType = {
  id: number;
  title: string;
  status: string;
  description: string;
  updated_at: string;
};

function App() {

  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [open, setOpen] = useState<TicketType[]>([]);
  const [inprogress, setInprogress] = useState<TicketType[]>([]);
  const [resolved, setResolved] = useState<TicketType[]>([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home open={open} setOpen={setOpen} inprogress={inprogress} setInprogress={setInprogress} resolved={resolved} setResolved={setResolved} loading={loading} setLoading={setLoading} error={error} setError={setError} tickets={tickets} setTickets={setTickets} admin={admin}/>}/>
        <Route path='/form' element={<Ticket_Form admin={admin}/>}/>
        <Route path='/tickets' element={<Tickets setLoading={setLoading} setInprogress={setInprogress} setOpen={setOpen} setResolved={setResolved} setTickets={setTickets} loading={loading} error={error} tickets={tickets} admin={admin}/>}/>
        <Route path='/tickets/open' element={<Tickets setLoading={setLoading} setInprogress={setInprogress} setOpen={setOpen} setResolved={setResolved} setTickets={setTickets} loading={loading} error={error} tickets={open} admin={admin}/>}/>
        <Route path='/tickets/inprogress' element={<Tickets setLoading={setLoading} setInprogress={setInprogress} setOpen={setOpen} setResolved={setResolved} setTickets={setTickets} loading={loading} error={error} tickets={inprogress} admin={admin}/>}/>
        <Route path='/tickets/closed' element={<Tickets setLoading={setLoading} setInprogress={setInprogress} setOpen={setOpen} setResolved={setResolved} setTickets={setTickets} loading={loading} error={error} tickets={resolved} admin={admin}/>}/>
        {admin==="admin"&&<Route path='/admin' element={<Admin admin={admin}/>}/>}
        {admin==="admin"&&<Route path='/role' element={<Role admin={admin}/>}/>}
        {admin!=="admin"&&<Route path='/role' element={<Nadmin/>}/>}
        {admin!=="admin"&&<Route path='/admin' element={<Nadmin/>}/>}
        <Route path='/login' element={<Login email={email} setEmail={setEmail} setAdmin={setAdmin}/>}/>
        <Route path='/signup' element={<Signup username={username} setUsername={setUsername} email={email} setEmail={setEmail}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
