import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./styles/graph.css"

type DataPoint = {
  name: string;
  value: number;
};

const data: DataPoint[] = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
];

export const Graph = () => {
  return (
    <div className="graph">
        <h1 className="graph__h1">Tickets Created Over Time</h1>
        <ResponsiveContainer width="80%" height={300}>
        <LineChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="name"   axisLine={{ stroke: "black", strokeWidth: 2 }}
    tickLine={{ stroke: "black" }} label={{
    value: "Date",
    position: "insideBottom",
    offset: -5,
    fontWeight: "bold",
    fontSize: "1.5em"
  }}/>
            <YAxis   axisLine={{ stroke: "black", strokeWidth: 2 }}
    tickLine={{ stroke: "black" }} label={{
    value: "Tickets Created",
    angle: -90,
    position: "insideLeft",
    fontWeight: "bold",
    dy: 80,
    fontSize: "1.5em"
  }}/>
            <Tooltip />
            <Line type="monotone" dataKey="value" />
        </LineChart>
        </ResponsiveContainer>
  </div>
  );
};
