import { NavLink } from "react-router-dom";
import {useContext} from 'react';
import {ThemeContext} from '../context/context';
import '../css/NavBar.css'
const NavBar =({logOut})=>{
const theme = useContext(ThemeContext);
  return <div className="NavBar"  style={{backgroundColor:theme.color}}>
      <NavLink className="Nav-Home" end to={"/"}> Home </NavLink>
      <NavLink className="Nav-Login" end to={"/login"}> Login</NavLink>
      <NavLink className="Nav-SignUp" end to={"/signUp"}>Sign Up</NavLink>

      <button type="button" onClick ={logOut}>Logout</button>
  </div>
}

export default NavBar;
  //<a onClick ={logOut}>Logout</a>
