import "./navBar.css";
import { LogOut } from "../logOut";
import { Link } from "react-router-dom";

export const NavBar = (props) => {
  return (
    <div className="navbar">
      <div className="logo"> BeachLife.</div>
      <div className="menu">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className="nav-bar">
        <ul className="nav-bar-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {props.user && (
            <li className="nav-item">
              <LogOut className="nav-link">Log Out</LogOut>
            </li>
          )}
          {!props.user && (
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          )}
          {!props.user && (
            <li className="nav-item">
              <Link to="/signin" className="nav-link">
                Log In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
