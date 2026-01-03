import { useEffect } from "react";
import { Card } from "./card";
import { Graph } from "./Graphs";
import { Header } from "./header";
import "./styles/home.css";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

type TicketType = {
  id: number;
  title: string;
  status: string;
  description: string;
  updated_at: string;
};

type HomeProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  admin: string;
  open: TicketType[];
  setOpen: React.Dispatch<React.SetStateAction<TicketType[]>>;
  inprogress: TicketType[];
  setInprogress: React.Dispatch<React.SetStateAction<TicketType[]>>;
  resolved: TicketType[];
  setResolved: React.Dispatch<React.SetStateAction<TicketType[]>>;
  tickets: TicketType[];
  setTickets: React.Dispatch<React.SetStateAction<TicketType[]>>;
};

export const Home = ({
  loading,
  setLoading,
  error,
  setError,
  admin,
  tickets,
  setTickets,
  open,
  setOpen,
  resolved,
  setResolved,
  inprogress,
  setInprogress
}: HomeProps) => {
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get<TicketType[]>("/tickets/");
        const data = res.data;
        setTickets(data);
        setOpen(data.filter(t => t.status === "OPEN"));
        setResolved(data.filter(t => t.status === "RESOLVED"));
        setInprogress(data.filter(t => t.status === "IN_PROGRESS"));
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("You must be logged in");
        } else {
          setError("Failed to load tickets");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [setLoading, setError, setTickets]);



  if (loading) {
    return (
      <div>
        <Header admin={admin} />
        <p className="loading">Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header admin={admin} />
        <p className="error">{error}</p>
      </div>
    );
  }
  const Open=()=>{navigate("/tickets/open")}
  const InProgress=()=>{navigate("/tickets/inprogress")}
  const Closed=()=>{navigate("/tickets/closed")}
  const Total=()=>{navigate("/tickets")}

  return (
    <div>
      <Header admin={admin} />

      <div className="card__container">
        <div className="open" onClick={Open}>
          <Card
            count={(open).length}
            name="Open"
            />
        </div>
        <div className="inprogress" onClick={InProgress}>
          <Card
            count={(inprogress).length}
            name="InProgress"
          />
        </div>
        <div className="closed" onClick={Closed}>
          <Card
            count={(resolved).length}
            name="Closed"
            />
        </div>
        <div className="total" onClick={Total}>
          <Card
            count={tickets.length}
            name="Total"
            />
        </div>
      </div>

      <Graph />
    </div>
  );
};
