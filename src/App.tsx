import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Ticket_Form } from './Components/Ticket_Form'
import { Home } from './Components/Home'
import { Login } from './Components/login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/form' element={<Ticket_Form/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
