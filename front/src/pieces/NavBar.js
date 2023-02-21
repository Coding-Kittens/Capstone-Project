import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext, UserContext } from "../context/context";
import "../css/NavBar.css";

//shows the NavBar
//links to the home page
//if logged in, links to the user page and loggout
//if not logged in, links to sign-up and login
const NavBar = ({ logOut }) => {
  const theme = useContext(ThemeContext);
  const currentUser = useContext(UserContext);
  return (
    <div className="NavBar" style={{ backgroundColor: theme.color }}>
      <NavLink className="Nav-Home" end to={"/"}>
        {" "}
        Home{" "}
      </NavLink>
      {currentUser ? (
        <>
          <NavLink
            className="Nav-Link"
            end
            to={`/user/${currentUser.username}`}
          >
            {currentUser.username}
          </NavLink>
          <NavLink className="Nav-Link" end to={"/"} onClick={logOut}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className="Nav-Link" end to={"/login"}>
            {" "}
            Login
          </NavLink>
          <NavLink className="Nav-Link" end to={"/signUp"}>
            Sign Up
          </NavLink>
        </>
      )}
    </div>
  );
};

export default NavBar;
