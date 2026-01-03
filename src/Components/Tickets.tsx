import { Header } from "./header";
import { SearchBar } from "./SearchBar";
import { Ticket } from "./Ticket";
import "./styles/Tickets.css";

type TicketProp ={
  loading: boolean;
  error: string;
  admin:string;
  tickets: TicketType[];
}


type TicketType = {
  id: number;
  title: string;
  status: string;
  description: string;
  updated_at: string;
};

export const Tickets = ({loading, error, admin, tickets}: TicketProp) => {

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
