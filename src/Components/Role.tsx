import { useEffect, useMemo, useState } from "react";
import { Header } from "./header";
import { SearchBar } from "./SearchBar";
import { User } from "./User";
import api from "../api/axios";
import "./styles/Role.css";

type RoleProp = {
  admin: string | null;
};

type UserResponse = {
  id: number;
  username: string;
  email: string;
  role: string;
};

type FilterType = "All" | "user" | "admin";

export const Role = ({ admin }: RoleProp) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [filter, setFilter] = useState<FilterType>("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get<UserResponse[]>("/admin/users");
        let data = res.data;

        if (filter === "user") data = data.filter(u => u.role === "user");
        if (filter === "admin") data = data.filter(u => u.role === "admin");

        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setError("Failed to fetch users. Please try again.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    setIsSearching(false);
  }, [filter]);

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

  const visibleUsers = useMemo(() => {
    return isSearching ? searchedUsers : users;
  }, [isSearching, searchedUsers, users]);

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    setIsSearching(true);
  };

  const handleSelect = (user: UserResponse) => {
    setSearchInput(user.username);
    setIsSearching(true);
  };

  const handleFilterChange = (value: FilterType) => {
    setFilter(value);
  };

  return (
    <div>
      <div className="fixed">
        <Header admin={admin} />

        <div className="searchbar__container">
          <p className="count">Count: {visibleUsers.length}</p>

          <SearchBar<UserResponse>
            value={searchInput}
            onChange={(v) => {
              setSearchInput(v);
              setIsSearching(false);
            }}
            onSearch={handleSearch}
            results={searchResults}
            onSelect={handleSelect}
            getLabel={(u) => `#${u.id} — ${u.username} (${u.email})`}
            placeholder="Search by username, email or ID"
          />

          <select
            className="graph__select"
            value={filter}
            onChange={(e) =>
              handleFilterChange(e.target.value as FilterType)
            }
          >
            <option value="All">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="ticket__container">
        {loading && <p>Loading users...</p>}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && visibleUsers.length === 0 && (
          <p>No users found</p>
        )}

        {!loading &&
          !error &&
          visibleUsers.map((user) => (
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
