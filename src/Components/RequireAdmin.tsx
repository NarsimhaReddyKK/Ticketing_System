import { Navigate } from "react-router-dom";

type RequireAdminProps = {
  role: string | null;
  children: React.ReactNode;
};

const RequireAdmin = ({ role, children }: RequireAdminProps) => {
  if (role === null) return null; 

  if (role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequireAdmin;