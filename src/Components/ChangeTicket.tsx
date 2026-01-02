import { useEffect, useState } from "react";
import api from "../api/axios";
import "./styles/ChangeTicket.css";

type ChangeTicketProp = {
  id: number;
  title: string;
  desc: string;
  status: string;
};

export const ChangeTicket = ({
  id,
  title,
  desc,
  status,
}: ChangeTicketProp) => {
  const [currentStatus, setCurrentStatus] = useState<string>(status);
  const [prevStatus, setPrevStatus] = useState<string>(status);

  useEffect(() => {
    if (currentStatus === prevStatus) return;

    const updateStatus = async () => {
      try {
        await api.patch(`/admin/ticket/${id}?status=${currentStatus}`);

        setPrevStatus(currentStatus);
      } catch (err) {
        console.error("Failed to update ticket", err);
        setCurrentStatus(prevStatus); 
        alert("Failed to update ticket status");
      }
    };

    updateStatus();
  }, [currentStatus, id, prevStatus]);

  return (
    <div className="ticket">
      <div className="ticket__details">
        <h2 className="ticket__id">Id: {id}</h2>
        <h1 className="ticket__title">Title: {title}</h1>
        <h2 className="ticket__id">Description:</h2>
        <p className="ticket__p">{desc}</p>
      </div>

      <select
        className="ticket__select"
        value={currentStatus}
        onChange={(e) => setCurrentStatus(e.target.value)}
      >
        <option value="OPEN" className="ticket__select-option">
          Open
        </option>
        <option value="IN_PROGRESS" className="ticket__select-option">
          In Progress
        </option>
        <option value="RESOLVED" className="ticket__select-option">
          Resolved
        </option>
      </select>
    </div>
  );
};
