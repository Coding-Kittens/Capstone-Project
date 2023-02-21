import { Link } from "react-router-dom";
import savedBooksImg from "../sprites/book4.png";
import bookShelfImg from "../sprites/Librarybutton1.png";
import "../css/LoggedInPage.css";



//shows the logged in home page
//links to search for books,libraries,users, or both books and libraries
//links to the userpage, userlibraries, userbooks, new book, new library, and settings
const LoggedInPage = ({ username }) => {

  return (
    <div className="LoggedInPage">
      <img id="bookShelfImg" src={bookShelfImg} alt="bookshelf" />
      <h1>Explore</h1>

      <div className="LoggedInPage_1">
        <h2>Table of Contents</h2>
        <h3>Search for:</h3>
        <Link end to={"/search/books"}>
          Public Books
        </Link>
        <Link end to={"/search/libraries"}>
          Public Libraries
        </Link>
        <Link end to={"/search/users"}>
          Writers
        </Link>
        <Link end to={"/explore"}>
          Book/Libraries
        </Link>
      </div>
      <div className="LoggedInPage_2">
        <Link end to={`/user/${username}`}>
          {username}
        </Link>
        <Link end to={`/user/${username}/libraries`}>
          My Libraries
        </Link>
        <Link end to={`/user/${username}/books`}>
          My Books
        </Link>
        <Link end to={"/new/library"}>
          New Library
        </Link>
        <Link end to={"/new/book"}>
          New Book
        </Link>
        <Link end to={"/settings"}>
          Settings
        </Link>
      </div>

      <img id="savedBooksImg" src={savedBooksImg} alt="book" />
    </div>
  );
};
export default LoggedInPage;
