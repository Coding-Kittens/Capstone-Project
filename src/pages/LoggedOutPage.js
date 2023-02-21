import { Link } from "react-router-dom";
import settingImg from "../sprites/settings.png";
import welcomeBookImg from "../sprites/book4.png";
import bookShelfImg from "../sprites/Librarybutton1.png";
import "../css/LoggedOutPage.css";



//shows the logged out page
const LoggedOutPage = () => {


  return (
    <>
      <img id="bookShelfImg" src={bookShelfImg} alt="bookshelf" />

      <div className="LoggedOutPage">
        <h1>Welcome</h1>

        <img id="welcomeBookImg" src={welcomeBookImg} alt="book" />
        <p>
          Unlike most book writing sites that just have a text block to write
          in, this one lets you write in a book format, so it actualy looks like
          your writing a book.
        </p>
        <p>
          Keep track of places, characters, and notes for your stories and add
          bookmarks. You can also read others books or share yours!
        </p>
      </div>

      <img id="settingImg" src={settingImg} alt="paper" />
      <Link id="signup_btn" end="true" to={"/signUp"}>
        Sign UP!
      </Link>
    </>
  );
};
export default LoggedOutPage;
