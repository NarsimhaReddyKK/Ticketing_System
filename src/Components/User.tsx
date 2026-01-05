import { useState } from "react";
import api from "../api/axios";

type UserProp = {
  email: string;
  id: number;
  role: string;
  username: string;
};

export const User = ({ email, id, role, username }: UserProp) => {
  const [currentrole, setCurrentrole] = useState<string>(role);

  const handleChange = async (r: string) => {
    if (r === currentrole) return; 
    setCurrentrole(r); 

    try {
      if (r === "user") {
        await api.patch(`/admin/users/${id}/make-user`);
        alert("Role Updated Successfully");
      } else if (r === "admin") {
        await api.patch(`/admin/users/${id}/make-admin`);
        alert("Role Updated Successfully");
      } else {
        throw new Error(`Invalid role: ${r}`);
      }
    } catch (err) {
      console.error("Failed to update user role", err);
      alert("Failed to update user role");

      setCurrentrole(role);
    }
  };

  return (
    <div className="ticket">
      <div className="ticket__details">
        <h2 className="ticket__id">#{id}</h2>
        <h1 className="ticket__title">
          <span className="ticket__title-span">{email}</span>
        </h1>
        <h2 className="ticket__id">Name: {username}</h2>
      </div>

      <select
        value={currentrole} 
        className="ticket__select"
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="user" className="ticket__select-option">
          User
        </option>
        <option value="admin" className="ticket__select-option">
          Admin
        </option>
      </select>
    </div>
  );
};
