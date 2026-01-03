import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import "./styles/ChangeTicket.css";

type ChangeTicketProp = {
  id: number;
  title: string;
  desc: string;
  status: string;
  time: string;
};

export const ChangeTicket = ({
  id,
  title,
  desc,
  status,
  time
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
        <div className="ticket__header">
            <h2 className="ticket__id">#{id} </h2>
            <span className="ticket__timestamp">{time}</span>
          </div>
        <h1 className="ticket__title"><span className="ticket__title-span">{title}</span></h1>
        <h2 className="ticket__id">{desc}</h2>
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
