import { Header } from "./header";
import { SearchBar } from "./SearchBar";
import { Ticket } from "./Ticket";
import "./styles/Tickets.css";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
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
  setOpen: React.Dispatch<React.SetStateAction<TicketType[]>>;
  setInprogress: React.Dispatch<React.SetStateAction<TicketType[]>>;
  setResolved: React.Dispatch<React.SetStateAction<TicketType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  error: string;
  admin: string | null;

  tickets: TicketType[];
  open: TicketType[];
  inprogress: TicketType[];
  resolved: TicketType[];
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
  open,
  inprogress,
  resolved,
}: TicketProp) => {
  const location = useLocation();

  const [filter, setFilter] = useState<"All" | "Open" | "InProgress" | "Closed">("All");
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    if (location.pathname.endsWith("/open")) setFilter("Open");
    else if (location.pathname.endsWith("/inprogress")) setFilter("InProgress");
    else if (location.pathname.endsWith("/closed")) setFilter("Closed");
    else setFilter("All");
  }, [location.pathname]);

  const searchResults = useMemo(() => {
    if (!searchInput.trim()) return [];

    return tickets
      .filter(t =>
        t.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        t.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        t.id.toString().includes(searchInput)
      )
      .slice(0, 6);
  }, [searchInput, tickets]);

  const searchedTickets = useMemo(() => {
    if (!isSearching) return tickets;

    return tickets.filter(t =>
      t.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      t.description.toLowerCase().includes(searchInput.toLowerCase()) ||
      t.id.toString().includes(searchInput)
    );
  }, [isSearching, searchInput, tickets]);

  const visibleTickets = useMemo(() => {
    const source = isSearching ? searchedTickets : filter === "Open"
      ? open
      : filter === "InProgress"
      ? inprogress
      : filter === "Closed"
      ? resolved
      : tickets;

    return [...source].sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }, [isSearching, searchedTickets, filter, tickets, open, inprogress, resolved]);

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    setIsSearching(true);
  };

  const handleSelect = (ticket: TicketType) => {
    setSearchInput(ticket.title);
    setIsSearching(true);
  };

  return (
    <div>
      <div className="fixed">
        <Header admin={admin} />

        <div className="searchbar__container">
          <p className="count">Count: {visibleTickets.length}</p>
          <SearchBar<TicketType>
            value={searchInput}
            onChange={(v) => {
              setSearchInput(v);
              if (!v.trim()) setIsSearching(false);
            }}
            onSearch={handleSearch}
            results={searchResults}
            onSelect={handleSelect}
            getLabel={(t) => `#${t.id} — ${t.title}`}
            placeholder="Search by title, description or ID"
          />

          <select
            className="graph__select"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as "All" | "Open" | "InProgress" | "Closed");
              setIsSearching(false);
            }}
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
        {!loading && visibleTickets.length === 0 && <p>No tickets found</p>}

        {!loading &&
          visibleTickets.map(ticket => (
            <Ticket
              key={ticket.id}
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
