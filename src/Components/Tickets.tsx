import { useEffect, useState } from "react";
import { Header } from "./header";
import { SearchBar } from "./SearchBar";
import { Ticket } from "./Ticket";
import api from "../api/axios";
import "./styles/Tickets.css";

type TicketProp = {
  admin: string;
};

type TicketType = {
  id: number;
  title: string;
  status: string;
  description: string;
  updated_at: string;
};

export const Tickets = ({ admin }: TicketProp) => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/tickets/");
        setTickets(res.data);
        // console.log(typeof res.data[0].updated_at);
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
  }, []); 

  return (
    <div>
      <Header admin={admin} />

      <div className="searchbar__container">
        <SearchBar usage="Tickets" />
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
