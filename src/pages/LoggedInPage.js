import { Link } from "react-router-dom";
import savedBooksImg from'../sprites/book4.png';
import bookShelfImg from '../sprites/Librarybutton1.png';
import '../css/LoggedInPage.css'
import {useContext} from 'react';
import {ThemeContext} from '../context/context';

const LoggedInPage =({username})=>{
const theme = useContext(ThemeContext);
return <div className="LoggedInPage">
<img id="bookShelfImg"src={bookShelfImg} alt="bookshelf"/>
    <h1>Explore</h1>

<div className="LoggedInPage_1">
  <h2>Table of Contents</h2>
<Link end to={"/search/books"}>Look for Books</Link>
<Link end to={"/search/libraries"}>Look for Libraries</Link>
<Link end to={"/search/users"}>Look for Writers</Link>
<Link end to={"/explore"}>Explore</Link>
<Link end to={"/settings"}>Settings</Link>
</div>
<div className="LoggedInPage_2">
<Link end to={`/user/${username}/libraries`}>My Libraries</Link>
<Link end to={`/user/${username}/books`}>My Books</Link>
<Link end to={"/new/library"}>New Library</Link>
<Link end to={"/new/book"}>New Book</Link>
<Link end to={`/user/${username}`}>{username}</Link>
</div>


<img id="savedBooksImg"src={savedBooksImg} alt="book"/>


</div>

}
export default LoggedInPage;
  //<img id="bookMark"src={bookMark} alt="bookmark"/>
