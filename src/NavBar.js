import { NavLink } from "react-router-dom";
import './NavBar.css'
const NavBar =({logOut})=>{

  return <div className="NavBar" >
      <NavLink className="Nav-Home" end to={"/"}> Home </NavLink>
      <NavLink className="Nav-Login" end to={"/login"}> Login</NavLink>
      <NavLink className="Nav-SignUp" end to={"/signUp"}>Sign UP</NavLink>
      <a onClick ={logOut}>Logout</a>
  </div>
}
//Navigate,Link,
// const navigate = useNavigate();
// const { name } = useParams();
  // <NavLink className="Nav-Home" end to={"/dogs"}>
  // const handleClick = (name) => {
  //   navigate(`/dogs/${name}`);
  // };
export default NavBar;
//
// <img id="book_stack_1a"src="/static/sprites/bookstack1pages.png"/>
// <img id="book_stack_1b"src="/static/sprites/bookstack1.png"/>
// <img id="book_stack_2a"src="/static/sprites/bookstack2pages.png"/>
// <img id="book_stack_2b"src="/static/sprites/bookstack2shadow.png"/>
// <img id="book_stack_3a"src="/static/sprites/bookstack3.png"/>
// <img id="book_stack_3b"src="/static/sprites/bookstack3Outline.png"/>
