import { useEffect, useState } from "react";
import { Header } from "./header";
import { SearchBar } from "./SearchBar";
import "./styles/Role.css";
import { User } from "./User";
import api from "../api/axios";

type RoleProp = {
  admin: string | null;
};

type UserResponse = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export const Role = ({ admin }: RoleProp) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<UserResponse[]>("/admin/users");
        setUsers(res.data);
        console.log("users:", res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="fixed">
        <Header admin={admin} />
        <div className="searchbar__container">
          <SearchBar usage="User" />
        </div>
      </div>

      <div className="ticket__container">
        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && users.length === 0 && <p>No users found.</p>}
        {!loading &&
          !error &&
          users.map((user) => (
            <User
              key={user.id}
              id={user.id}
              username={user.username}
              email={user.email}
              role={user.role}
            />
          ))}
      </div>
    </div>
  );
};
