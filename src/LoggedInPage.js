import { Link } from "react-router-dom";
import savedBooksImg from'./sprites/book4.png';
import bookShelfImg from './sprites/Librarybutton1.png';
import './css/LoggedInPage.css'
const LoggedInPage =({username})=>{

return <>


<img id="bookShelfImg"src={bookShelfImg} alt="bookshelf"/>

<div className="LoggedInPage">

    <h1>Explore</h1>

<div className="LoggedInPage_1">
  <h2>Table of Contents</h2>
<Link end to={"/search/books"}>Search for Books</Link>
<Link end to={"/search/libraries"}>Search for Libraries</Link>
<Link end to={"/explore"}>Whats New</Link>
</div>
<div className="LoggedInPage_2">
<Link end to={`/user/${username}/libraries`}>My Libraries</Link>
<Link end to={"/new/library"}>New Library</Link>
<Link end to={"/new/book"}>New Book</Link>
<Link end to={`/user/${username}`}>{username}</Link>
<Link end to={"/settings"}>Settings</Link>
</div>




<img id="savedBooksImg"src={savedBooksImg} alt="book"/>


</div>

</>
}
export default LoggedInPage;
  //<img id="bookMark"src={bookMark} alt="bookmark"/>
