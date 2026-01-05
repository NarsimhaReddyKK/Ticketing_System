import { useEffect, useMemo, useState } from "react";
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

  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get<TicketType[]>("/tickets/");
        let data = res.data;

        if (filter === "Open") data = data.filter(t => t.status === "OPEN");
        if (filter === "InProgress") data = data.filter(t => t.status === "IN_PROGRESS");
        if (filter === "Closed") data = data.filter(t => t.status === "RESOLVED");

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

    fetchTickets();
    setIsSearching(false); 
  }, [filter]);

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
    return isSearching ? searchedTickets : tickets;
  }, [isSearching, searchedTickets, tickets]);

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    setIsSearching(true);
  };

  const handleSelect = (ticket: TicketType) => {
    setSearchInput(ticket.title);
    setIsSearching(true);
  };

  const handleFilterChange = (value: FilterType) => {
    setFilter(value);
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
              setIsSearching(false);
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
            onChange={(e) =>
              handleFilterChange(e.target.value as FilterType)
            }
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
        {!loading && !error && visibleTickets.length === 0 && <p>No tickets found</p>}

        {!loading &&
          !error &&
          visibleTickets.map(ticket => (
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
