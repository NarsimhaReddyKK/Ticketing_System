import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./styles/graph.css";
import { useEffect, useState } from "react";

type TicketType = {
  id: number;
  title: string;
  status: string;
  description: string;
  updated_at: string;
};

type GraphProp = {
  tickets: TicketType[];
  open: TicketType[];
  inprogress: TicketType[];
  resolved: TicketType[];
};

type DataPoint = {
  name: string; // date
  value: number; // count
};

export const Graph = ({
  tickets,
  open,
  inprogress,
  resolved,
}: GraphProp) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    let filteredTickets: TicketType[] = [];

    switch (filter) {
      case "Open":
        filteredTickets = open;
        break;
      case "InProgress":
        filteredTickets = inprogress;
        break;
      case "Closed":
        filteredTickets = resolved;
        break;
      default:
        filteredTickets = tickets;
    }

    const countMap: Record<string, number> = {};

    filteredTickets.forEach((ticket) => {
      const date = new Date(ticket.updated_at)
        .toISOString()
        .split("T")[0];

      countMap[date] = (countMap[date] || 0) + 1;
    });

    const formattedData: DataPoint[] = Object.entries(countMap)
      .map(([date, count]) => ({
        name: date,
        value: count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    setData(formattedData);
  }, [filter, tickets, open, inprogress, resolved]);

  return (
    <div className="graph">
      <h1 className="graph__h1">
        Ticket Updates Over Time
        <select
          className="graph__select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="InProgress">InProgress</option>
          <option value="Closed">Closed</option>
        </select>
      </h1>

      <ResponsiveContainer width="80%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            axisLine={{ stroke: "black", strokeWidth: 2 }}
            tickLine={{ stroke: "black" }}
            label={{
              value: "Date",
              position: "insideBottom",
              offset: -5,
              fontWeight: "bold",
            }}
          />

          <YAxis
            allowDecimals={false}
            axisLine={{ stroke: "black", strokeWidth: 2 }}
            tickLine={{ stroke: "black" }}
            label={{
              value: "Tickets Created",
              angle: -90,
              position: "insideLeft",
              fontWeight: "bold",
              dy: 80,
            }}
          />

          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
