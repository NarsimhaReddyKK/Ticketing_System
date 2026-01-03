import { useState } from "react";
import "./styles/login.css"
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

type LoginPropType = {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

export const Signup = ({username, setUsername, email, setEmail}: LoginPropType) => {
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string|undefined>()
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Attempt: ", {username, email, password})
    try{
      const res = await api.post("/auth/register", {username, email, password});
      console.log(res.data, "Please login to continue..");
      alert(res.data.message+", Please login to proceed..");
      navigate("/login");
    }catch(err:any){
      if(err.response?.status===400){
        setError("Email Already Exist")
      }else{
        setError("Something went wrong. Try again.")
      }
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Sign up</h2>
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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" className="login-b">Sign up</button>
        </form>
        {error&&<p className="err">{error}</p>}
        <p className="login__p"><Link to="/login" className="login__link">Already have an account? <span className="login__span">Login</span></Link></p>
      </div>
    </div>
  )
}