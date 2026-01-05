import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Ticket_Form } from "./Components/Ticket_Form";
import { Home } from "./Components/Home";
import { Login } from "./Components/login";
import { useEffect, useState } from "react";
import { Nadmin } from "./Components/Nadmin";
import { Tickets } from "./Components/Tickets";
import { Signup } from "./Components/signup";
import { Admin } from "./Components/Admin";
import { Role } from "./Components/Role";
import RequireAdmin from "./Components/RequireAdmin";

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
  const [admin, setAdmin] = useState<string | null>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setAdmin(role);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              open={open}
              setOpen={setOpen}
              inprogress={inprogress}
              setInprogress={setInprogress}
              resolved={resolved}
              setResolved={setResolved}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              tickets={tickets}
              setTickets={setTickets}
              admin={admin}
            />
          }
        />
        <Route path="/form" element={<Ticket_Form admin={admin} />} />
        <Route
          path="/tickets/*"
          element={
            <Tickets
              tickets={tickets}
              open={open}
              inprogress={inprogress}
              resolved={resolved}
              setTickets={setTickets}
              setOpen={setOpen}
              setInprogress={setInprogress}
              setResolved={setResolved}
              setLoading={setLoading}
              loading={loading}
              error={error}
              admin={admin}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin role={admin}>
              <Admin admin={admin} />
            </RequireAdmin>
          }
        />
        <Route
          path="/role"
          element={
            <RequireAdmin role={admin}>
              <Role admin={admin} />
            </RequireAdmin>
          }
        />
        <Route path="/unauthorized" element={<Nadmin />} />
        <Route
          path="/login"
          element={<Login email={email} setEmail={setEmail} setAdmin={setAdmin} />}
        />
        <Route
          path="/signup"
          element={
            <Signup
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
