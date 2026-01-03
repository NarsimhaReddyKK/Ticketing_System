import { useEffect } from "react";
import { Card } from "./card";
import { Graph } from "./Graphs";
import { Header } from "./header";
import "./styles/home.css";
import api from "../api/axios";

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
}: HomeProps) => {
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/tickets/");
        setTickets(res.data);
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

  // 🔄 Loading state
  if (loading) {
    return (
      <div>
        <Header admin={admin} />
        <p className="loading">Loading tickets...</p>
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div>
        <Header admin={admin} />
        <p className="error">{error}</p>
      </div>
    );
  }

  // ✅ Success state
  return (
    <div>
      <Header admin={admin} />

      <div className="card__container">
        <Card
          count={tickets.filter(t => t.status === "OPEN").length}
          name="Open"
        />
        <Card
          count={tickets.filter(t => t.status === "IN_PROGRESS").length}
          name="InProgress"
        />
        <Card
          count={tickets.filter(t => t.status === "RESOLVED").length}
          name="Closed"
        />
        <Card
          count={tickets.length}
          name="Total"
        />
      </div>

      <Graph />
    </div>
  );
};
