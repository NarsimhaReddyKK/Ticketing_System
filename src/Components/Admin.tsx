import { useEffect, useState } from "react";
import { ChangeTicket } from "./ChangeTicket";
import { Header } from "./header";
import { SearchBar } from "./SearchBar";
import api from "../api/axios";
import "./styles/Admin.css";

type AdminProp = {
  admin: string | null;
};

type TicketType = {
  id: number;
  title: string;
  description: string;
  status: string;
  updated_at: string;
};

type FilterType = "All" | "Open" | "InProgress" | "Closed";

export const Admin = ({ admin }: AdminProp) => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [filter, setFilter] = useState<FilterType>("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTickets = async (currentFilter: FilterType) => {
    try {
      setLoading(true);
      setError(""); 

      const res = await api.get<TicketType[]>("/tickets/");
      let data = res.data;

      if (currentFilter === "Open") data = data.filter(t => t.status === "OPEN");
      else if (currentFilter === "InProgress") data = data.filter(t => t.status === "IN_PROGRESS");
      else if (currentFilter === "Closed") data = data.filter(t => t.status === "RESOLVED");

      data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

      setTickets(data);
    } catch (err) {
      console.error("Failed to load tickets", err);
      setError("Failed to load tickets. Please try again.");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(filter);
  }, [filter]);

  return (
    <div>
      <div className="fixed">
        <Header admin={admin} />

        <div className="searchbar__container">
          <SearchBar usage="Tickets" />

          <select
            className="graph__select"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
          >
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="InProgress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="ticket__container">
        {loading && <p>Loading tickets...</p>}

        {!loading && error && <p className="error">{error}</p>}

        {!loading && !error && tickets.length === 0 && <p>No tickets found</p>}

        {!loading &&
          !error &&
          tickets.map((ticket) => (
            <ChangeTicket
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              desc={ticket.description}
              status={ticket.status}
              time={new Date(ticket.updated_at).toLocaleDateString("en-GB", {
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
