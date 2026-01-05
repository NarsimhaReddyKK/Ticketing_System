import { useEffect, useMemo, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<UserResponse[]>("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const searchResults = useMemo(() => {
    if (!searchInput.trim()) return [];

    return users
      .filter(
        (u) =>
          u.username.toLowerCase().includes(searchInput.toLowerCase()) ||
          u.email.toLowerCase().includes(searchInput.toLowerCase()) ||
          u.id.toString().includes(searchInput)
      )
      .slice(0, 6);
  }, [searchInput, users]);

  const searchedUsers = useMemo(() => {
    if (!isSearching) return users;

    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(searchInput.toLowerCase()) ||
        u.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        u.id.toString().includes(searchInput)
    );
  }, [isSearching, searchInput, users]);

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    setIsSearching(true);
  };

  const handleSelect = (user: UserResponse) => {
    console.log("Selected user:", user);
    setSearchInput(user.username); 
    setIsSearching(true); 
  };

  return (
    <div>
      <div className="fixed">
        <Header admin={admin} />

        <div className="searchbar__container">
          <SearchBar<UserResponse>
            value={searchInput}
            onChange={(v) => {
              setSearchInput(v);
              if (!v.trim()) setIsSearching(false);
            }}
            onSearch={handleSearch}
            results={searchResults}
            onSelect={handleSelect}
            getLabel={(u) => `#${u.id} — ${u.username} (${u.email})`}
            placeholder="Search by username, email or ID"
          />
        </div>
      </div>

      <div className="ticket__container">
        {loading && <p>Loading users...</p>}
        {!loading && error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && searchedUsers.length === 0 && (
          <p>No users found.</p>
        )}

        {!loading &&
          !error &&
          searchedUsers.map((user) => (
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
