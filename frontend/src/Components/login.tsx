import "./styles/login.css"
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useState } from "react";

type LoginPropType = {
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setAdmin: React.Dispatch<React.SetStateAction<string|null>>
}

export const Login = ({email, setEmail, setAdmin}: LoginPropType) => {
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string|undefined>()
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });

    try{
      const res = await api.post("/auth/login", {
        email,
        password
      })

      const {role} = res.data;
      localStorage.setItem("role", role);
      setAdmin(role);
      navigate("/");
    }catch(err:any){
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-b" type="submit">Login</button>
        </form>
        {error&&<p className="err">{error}</p>}
        <p className="login__p"><Link to="/signup" className="login__link">Don't have an account? <span className="login__span">Sign up</span></Link></p>
      </div>
    </div>
  )
}
