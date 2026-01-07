import { useEffect, useState } from "react";
import api from "../api/axios";

export const Health = () => {
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/tickets/health")
      .then(() => setStatus("API is Healthy ✅"))
      .catch(() => {
        setStatus("API Down ❌");
        setError("Backend is not reachable");
      });
  }, []);

  return (
    <div>
      <h2>API Health Check</h2>
      <p>{status}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
