import { Header } from "./header";
import { SearchBar } from "./SearchBar";
import { Ticket } from "./Ticket";
import "./styles/Tickets.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

type TicketType = {
  id: number;
  title: string;
  status: string;
  description: string;
  updated_at: string;
};

type TicketProp = {
  setTickets: React.Dispatch<React.SetStateAction<TicketType[]>>;
  loading: boolean;
  error: string;
  admin: string | null;
  tickets: TicketType[];
  setOpen: React.Dispatch<React.SetStateAction<TicketType[]>>;
  setInprogress: React.Dispatch<React.SetStateAction<TicketType[]>>;
  setResolved: React.Dispatch<React.SetStateAction<TicketType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Tickets = ({
  setLoading,
  setTickets,
  setOpen,
  setInprogress,
  setResolved,
  loading,
  error,
  admin,
  tickets,
}: TicketProp) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState("All");

  useEffect(() => {

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await api.get<TicketType[]>("/tickets/");
        const data = res.data;

        setTickets(data);
        setOpen(data.filter(t => t.status === "OPEN"));
        setInprogress(data.filter(t => t.status === "IN_PROGRESS"));
        setResolved(data.filter(t => t.status === "RESOLVED"));
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/tickets/open":
        setFilter("Open");
        break;
      case "/tickets/inprogress":
        setFilter("InProgress");
        break;
      case "/tickets/closed":
        setFilter("Closed");
        break;
      default:
        setFilter("All");
    }
  }, [location.pathname]);

  const handleFilterChange = (value: string) => {
    setFilter(value);

    switch (value) {
      case "Open":
        navigate("/tickets/open");
        break;
      case "InProgress":
        navigate("/tickets/inprogress");
        break;
      case "Closed":
        navigate("/tickets/closed");
        break;
      default:
        navigate("/tickets");
    }
  };

  return (
    <div>
      <div className="fixed">
        <Header admin={admin} />

        <div className="searchbar__container">
          <SearchBar usage="Tickets" />

          <select
            className="graph__select"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
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

        {error && <p className="error">{error}</p>}

        {!loading && !error && tickets.length === 0 && (
          <p>No tickets found</p>
        )}

        {!loading &&
          !error &&
          tickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              state={ticket.status}
              desc={ticket.description}
              timestamp={new Date(ticket.updated_at).toLocaleDateString(
                "en-GB",
                {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            />
          ))}
      </div>
    </div>
  );
};
