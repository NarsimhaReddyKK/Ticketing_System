import { Header } from "./header";
import { SearchBar } from "./SearchBar";
import { Ticket } from "./Ticket";
import "./styles/Tickets.css";
import { useEffect } from "react";
import api from "../api/axios";

type TicketProp ={
  setTickets: React.Dispatch<React.SetStateAction<TicketType[]>>;
  loading: boolean;
  error: string;
  admin:string|null;
  tickets: TicketType[];
  setOpen: React.Dispatch<React.SetStateAction<TicketType[]>>;
  setInprogress: React.Dispatch<React.SetStateAction<TicketType[]>>;
  setResolved: React.Dispatch<React.SetStateAction<TicketType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


type TicketType = {
  id: number;
  title: string;
  status: string;
  description: string;
  updated_at: string;
};

export const Tickets = ({setLoading, setTickets, setOpen, setInprogress, setResolved, loading, error, admin, tickets}: TicketProp) => {

    useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get<TicketType[]>("/tickets/");
        const data = res.data;
        setTickets(data);
        setOpen(data.filter(t => t.status === "OPEN"));
        setResolved(data.filter(t => t.status === "RESOLVED"));
        setInprogress(data.filter(t => t.status === "IN_PROGRESS"));
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      }finally{
        setLoading(false);
      }
    };

    fetchTickets();
  }, [setTickets]);


  return (
    <div>
      <div className="fixed">
        <Header admin={admin} />

        <div className="searchbar__container">
        <SearchBar usage="Tickets" />
      </div>
      </div>

      <div className="ticket__container">
        {loading && <p>Loading tickets...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && tickets.length === 0 && (
          <p>No tickets found</p>
        )}

        {!loading &&
          !error &&
          tickets.map((ticket) => (
            <Ticket
              id={ticket.id}
              title={ticket.title}
              state={ticket.status}
              desc={ticket.description}
              timestamp={new Date(ticket.updated_at).toLocaleDateString("en-GB", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            />
          ))}
      </div>
    </div>
  );
};
