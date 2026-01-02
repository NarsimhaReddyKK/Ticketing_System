import { useEffect, useState } from "react";
import { ChangeTicket } from "./ChangeTicket";
import { Header } from "./header";
import { SearchBar } from "./SearchBar";
import api from "../api/axios";
import "./styles/Admin.css";

type adminProp = {
  admin: string;
};

type TicketType = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export const Admin = ({ admin }: adminProp) => {
  const [tickets, setTickets] = useState<TicketType[]>([]);

  // 🔥 load all tickets on page load
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/tickets/");
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to load tickets", err);
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
        {tickets.map((ticket) => (
          <ChangeTicket
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
            desc={ticket.description}
            status={ticket.status}
          />
        ))}
      </div>
    </div>
  );
};
