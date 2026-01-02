import "./styles/login.css"
import { Link } from "react-router-dom";

type LoginPropType = {
  email: string,
  password: any,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

export const Signup = ({email, password, setEmail, setPassword}: LoginPropType) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", { email, password });
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
        <p className="login__p"><Link to="/login" className="login__link">Already have an account? <span className="login__span">Login</span></Link></p>
      </div>
    </div>
  )
}