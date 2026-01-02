import { useEffect, useRef, useState } from "react";
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
  const [currentStatus, setCurrentStatus] = useState(status);
  const isFirstRender = useRef(true);

  // 🔄 sync if parent updates status
  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  // 🔥 update backend when status changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const updateStatus = async () => {
      try {
        await api.patch(`/admin/ticket/${id}?status=${currentStatus}`);
      } catch (err) {
        console.error("Failed to update ticket", err);
        alert("Failed to update ticket status");
        setCurrentStatus(status); // rollback
      }
    };

    updateStatus();
  }, [currentStatus, id, status]);

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
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
      </select>
    </div>
  );
};
